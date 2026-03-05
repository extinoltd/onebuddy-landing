import os
import sys
import json
import base64
from pathlib import Path

def run():
    if len(sys.argv) < 3:
        print("Usage: python generate_gemini.py <prompt_json_file> <output_file> [aspect_ratio]")
        sys.exit(1)

    prompt_file = sys.argv[1]
    output_file = sys.argv[2]
    aspect_ratio = sys.argv[3] if len(sys.argv) > 3 else "auto"

    # Find API key from .env (check skill dir, then project root)
    api_key = os.environ.get("GOOGLE_API_KEY") or os.environ.get("GEMINI_API_KEY")

    if not api_key:
        for env_dir in [
            os.path.join(os.path.dirname(__file__), '..'),
            os.path.join(os.path.dirname(__file__), '..', '..', '..', '..'),
        ]:
            env_path = os.path.join(env_dir, '.env')
            if os.path.exists(env_path):
                with open(env_path, 'r') as f:
                    for line in f:
                        line = line.strip()
                        if line.startswith('GOOGLE_API_KEY=') or line.startswith('GEMINI_API_KEY='):
                            api_key = line.split('=', 1)[1].strip('"\'')
                            break
                if api_key:
                    break

    if not api_key:
        print("ERROR: No API key found.")
        print("Set GOOGLE_API_KEY or GEMINI_API_KEY in your .env file or environment.")
        print("Get a key from: https://aistudio.google.com/apikey")
        sys.exit(1)

    # Load the prompt JSON
    with open(prompt_file, 'r', encoding='utf-8') as f:
        prompt_json = json.load(f)

    # Extract api_parameters and image_input before stringifying the rest
    image_input_paths = prompt_json.pop("image_input", None)
    api_parameters = prompt_json.pop("api_parameters", {})

    # Build the prompt string from the remaining JSON
    prompt_string = json.dumps(prompt_json)

    # Resolve aspect ratio and resolution from api_parameters or CLI
    final_aspect_ratio = api_parameters.get("aspect_ratio", aspect_ratio)
    final_resolution = api_parameters.get("resolution", "1K")

    # Import google-genai
    try:
        from google import genai
        from google.genai import types
    except ImportError:
        print("ERROR: google-genai package not installed.")
        print("Fix: pip install google-genai")
        sys.exit(1)

    # Create client
    client = genai.Client(api_key=api_key)

    # Choose model — supports aspect ratio and image generation
    # Options: gemini-2.5-flash-image, gemini-2.0-flash-exp-image-generation, gemini-3.1-flash-image-preview
    model = api_parameters.get("model", "gemini-2.5-flash-image")

    # Build config
    image_config_kwargs = {}
    if final_aspect_ratio and final_aspect_ratio != "auto":
        image_config_kwargs["aspect_ratio"] = final_aspect_ratio

    config = types.GenerateContentConfig(
        response_modalities=["TEXT", "IMAGE"],
    )

    # Add image_config if we have settings
    if image_config_kwargs:
        config = types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"],
            image_config=types.ImageConfig(**image_config_kwargs),
        )

    # Build contents — text prompt, optionally with reference images
    contents = []

    # Add reference images if provided
    if image_input_paths:
        if isinstance(image_input_paths, str):
            image_input_paths = [image_input_paths]
        for img_path in image_input_paths:
            if img_path.startswith("http://") or img_path.startswith("https://"):
                # URL-based image — download first
                import requests
                print(f"Downloading reference image: {img_path}")
                resp = requests.get(img_path, timeout=30)
                resp.raise_for_status()
                img_bytes = resp.content
                mime = resp.headers.get("content-type", "image/jpeg")
                contents.append(types.Part.from_bytes(data=img_bytes, mime_type=mime))
            elif os.path.exists(img_path):
                # Local file
                with open(img_path, "rb") as img_f:
                    img_bytes = img_f.read()
                ext = Path(img_path).suffix.lower()
                mime_map = {".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp"}
                mime = mime_map.get(ext, "image/jpeg")
                contents.append(types.Part.from_bytes(data=img_bytes, mime_type=mime))

    # Add the text prompt
    contents.append(prompt_string)

    print(f"Generating image via Google Gemini API (model: {model})...")
    print(f"Aspect ratio: {final_aspect_ratio}, Resolution: {final_resolution}")

    try:
        response = client.models.generate_content(
            model=model,
            contents=contents,
            config=config,
        )
    except Exception as e:
        print(f"ERROR generating image: {e}")
        sys.exit(1)

    # Extract and save the generated image
    image_saved = False
    for part in response.candidates[0].content.parts:
        if part.text is not None:
            print(f"Model response: {part.text[:200]}")
        elif part.inline_data is not None:
            img_data = part.inline_data.data
            # Determine output format
            out_ext = Path(output_file).suffix.lower()
            if out_ext in (".jpg", ".jpeg"):
                from PIL import Image
                from io import BytesIO
                img = Image.open(BytesIO(img_data))
                img.save(output_file, "JPEG", quality=95)
            elif out_ext == ".webp":
                from PIL import Image
                from io import BytesIO
                img = Image.open(BytesIO(img_data))
                img.save(output_file, "WEBP", quality=95)
            else:
                # Save as PNG (default from API)
                with open(output_file, 'wb') as f:
                    f.write(img_data)
            image_saved = True
            print(f"Successfully saved to {output_file}")
            break

    if not image_saved:
        print("ERROR: No image was returned by the API.")
        if response.candidates and response.candidates[0].content.parts:
            for part in response.candidates[0].content.parts:
                if part.text:
                    print(f"Response text: {part.text}")
        sys.exit(1)


if __name__ == "__main__":
    run()
