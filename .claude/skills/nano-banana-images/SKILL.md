---
name: Nano Banana 2 Image Generation Master
description: A formalized skill for generating hyper-realistic, highly-controlled images using the Nano Banana 2 (Gemini 3.1 Flash) model through parameterized JSON prompting.
---

# Nano Banana 2 Image Generation Master

## Goal
The purpose of this skill is to provide a standardized, highly controlled method for generating images using AI model Nano Banana 2 (or any underlying model connected to the `generate_image` tool). By strictly enforcing a structured JSON parameter schema, this skill neutralizes native model biases (like over-smoothing, dataset-averaging, or "plastic" AI styling) and ensures raw, unretouched, hyper-realistic outputs.

## Prerequisites
- Access to the `generate_image` tool.
- A clear understanding of the user's desired Subject, Lighting, and Camera characteristics.

## Core Schema Structure
When constructing a prompt for the `generate_image` tool, you **MUST** use the following JSON schema as the foundation. Fill in the string values with extreme, microscopic detail.

```json
{
  "task": "string - High-level goal (e.g., 'sports_selfie_collage', 'single_macro_portrait')",
  
  "output": {
    "type": "string - e.g., 'single_image', '4-panel_collage'",
    "layout": "string - e.g., '1x1', '2x2_grid', 'side-by-side'",
    "aspect_ratio": "string - e.g., '3:4', '16:9', '4:5'",
    "resolution": "string - e.g., 'ultra_high', 'medium_low'",
    "camera_style": "string - e.g., 'smartphone_front_camera', 'professional_dslr'"
  },

  "image_quality_simulation": {
    "sharpness": "string - e.g., 'tack_sharp', 'slightly_soft_edges'",
    "noise": "string - e.g., 'unfiltered_sensor_grain', 'visible_film_grain', 'clean_digital'",
    "compression_artifacts": "boolean - true if attempting to simulate uploaded UGC",
    "dynamic_range": "string - e.g., 'limited', 'hdr_capable'",
    "white_balance": "string - e.g., 'slightly_warm', 'cool_fluorescent'",
    "lens_imperfections": [
      "array of strings - e.g., 'subtle chromatic aberration', 'minor lens distortion', 'vignetting'"
    ]
  },

  "subject": {
    "type": "string - e.g., 'human_portrait', 'nature_macro', 'infographic_flatlay'",
    "human_details": {
      "//": "Use this block ONLY for human subjects",
      "identity": "string",
      "appearance": "string - Extremely specific (e.g., visible pores, mild redness)",
      "outfit": "string"
    },
    "object_or_nature_details": {
      "//": "Use this block for non-human subjects",
      "material_or_texture": "string - e.g., 'brushed aluminum', 'dew-covered velvety petals'",
      "wear_and_tear": "string - e.g., 'subtle scratches on the anodized finish', 'browning edges on leaves'",
      "typography": "string - e.g., 'clean sans-serif overlaid text, perfectly legible'"
    }
  },

  "multi_panel_layout": {
    "grid_panels": [
      {
        "panel": "string - e.g., 'top_left', 'full_frame' (if not a grid)",
        "pose": "string - e.g., 'slight upward selfie angle, relaxed smile'",
        "action": "string - e.g., 'holding phone with one hand, casual posture'"
      }
    ]
  },

  "environment": {
    "location": "string - e.g., 'gym or outdoor sports area'",
    "background": "string - What is behind the subject (e.g., 'blurred gym equipment')",
    "lighting": {
      "type": "string - e.g., 'natural or overhead gym lighting', 'harsh direct sunlight'",
      "quality": "string - e.g., 'uneven, realistic, non-studio', 'high-contrast dramatic'"
    }
  },

  "embedded_text_and_overlays": {
    "text": "string (optional)",
    "location": "string (optional)"
  },

  "structural_preservation": {
    "preservation_rules": [
      "array of strings - e.g., 'Exact physical proportions must be preserved'"
    ]
  },

  "controlnet": {
    "pose_control": {
      "model_type": "string - e.g., 'DWPose'",
      "purpose": "string",
      "constraints": ["array of strings"],
      "recommended_weight": "number"
    },
    "depth_control": {
      "model_type": "string - e.g., 'ZoeDepth'",
      "purpose": "string",
      "constraints": ["array of strings"],
      "recommended_weight": "number"
    }
  },

  "explicit_restrictions": {
    "no_professional_retouching": "boolean - typically true for realism",
    "no_studio_lighting": "boolean - typically true for candid shots",
    "no_ai_beauty_filters": "boolean - mandatory true to avoid plastic look",
    "no_high_end_camera_look": "boolean - true if simulating smartphones"
  },

  "negative_prompt": {
    "forbidden_elements": [
      "array of strings - Massive list of 'AI style' blockers required for extreme realism. Example stack: 'anatomy normalization', 'body proportion averaging', 'dataset-average anatomy', 'wide-angle distortion not in reference', 'lens compression not in reference', 'cropping that removes volume', 'depth flattening', 'mirror selfies', 'reflections', 'beautification filters', 'skin smoothing', 'plastic skin', 'airbrushed texture', 'stylized realism', 'editorial fashion proportions', 'more realistic reinterpretation'"
    ]
  }
}
```

## Paradigm 2: The Dense Narrative Format (Optimized for Google Gemini API)
When executing API calls via the Google Gemini API, it is incredibly powerful to condense the logic above into a dense, flat JSON string containing a massive descriptive text block.

```json
{
  "prompt": "string - A dense, ultra-descriptive narrative. Use specific camera math (85mm lens, f/1.8, ISO 200), explicit flaws (visible pores, mild redness, subtle freckles, light acne marks), lighting behavior (direct on-camera flash creating sharp highlights), and direct negative commands (Do not beautify or alter facial features).",
  "negative_prompt": "string - A comma-separated list of explicit realism blockers (no plastic skin, no CGI).",
  "image_input": [
    "array of strings (URLs) - Optional. Input images to transform or use as reference (up to 14). Formatting: URL to jpeg, png, or webp. Max size: 30MB."
  ],
  "api_parameters": {
    "google_search": "boolean - Optional. Use Google Web Search grounding",
    "resolution": "string - Optional. '1K', '2K', or '4K' (default 1K)",
    "output_format": "string - Optional. 'jpg' or 'png' (default jpg)",
    "aspect_ratio": "string - Optional. Overrides CLI aspect_ratio (e.g., '16:9', '4:5', 'auto')"
  },
  "settings": {
    "resolution": "string",
    "style": "string - e.g., 'documentary realism'",
    "lighting": "string - e.g., 'direct on-camera flash'",
    "camera_angle": "string",
    "depth_of_field": "string - e.g., 'shallow depth of field'",
    "quality": "string - e.g., 'high detail, unretouched skin'"
  }
}
```

## Best Practices & Natural Language Hacks

1.  **Camera Mathematics:** Always define exact focal length, aperture, and ISO (e.g., `85mm lens, f/2.0, ISO 200`). This forces the model to mimic optical physics rather than digital rendering.
2.  **Explicit Imperfections:** Words like "realistic" are not enough. Dictate flaws: `mild redness`, `subtle freckles`, `light acne marks`, `unguided grooming`.
3.  **Direct Commands:** Use imperative negative commands *inside* the positive prompt paragraph: `Do not beautify or alter facial features. No makeup styling.`
4.  **Lighting Behavior:** Don't just name the light, name what it does: `direct flash photography, creating sharp highlights on skin and a slightly shadowed background.`
5.  **Non-Human Materials (Products/Nature):** When generating non-humans, replace skin/outfit logic with extreme material physics. Define surface scoring (e.g., "micro-scratches on anodized aluminum"), light scattering (e.g., "subsurface scattering through dew-covered petals"), or graphic layouts (e.g., "flat-lay composition, clean sans-serif typography").
6.  **Mandatory Negative Stack:** You MUST include the extensive negative prompt block (e.g., forbidding "skin smoothing" and "anatomy normalization").
7.  **Avoid Over-Degradation (The Noise Trap):** While simulating camera flaws (like `compression artifacts`) can help realism, pushing extreme `ISO 3200` or `heavy film grain` in complex, contrast-heavy environments (like neon night streets) actually triggers the model's "digital art/illustration" biases. Keep ISO settings below 800 and rely on *physical subject imperfections* (like peach fuzz or asymmetrical pores) rather than heavy camera noise to sell the realism.

## Master Reference Guide
If you require the absolute full schema breakdown, parameter options, or the complex JSON structing for multi-panel grids, refer to the root project document:
`[Master Prompt Reference Guide](file:///c:/Users/nateh/OneDrive/Desktop/Nano%20Banana%202/master_prompt_reference.md)`

## Execution via Google Gemini API (Python Workflow)

When executing Nano Banana 2 prompts, use the dedicated Python pipeline that calls the Google Gemini API directly using the `google-genai` SDK.

**Prerequisites:**
1. Install dependencies: `pip install google-genai Pillow`
2. Your `.env` file (project root or skill directory) must contain `GEMINI_API_KEY="your_key"` (or `GOOGLE_API_KEY`).
   - Get a key from: https://aistudio.google.com/apikey
3. A JSON prompt file matching the **Dense Narrative Format** saved in `/prompts/`.

**Execution:**
Run the generation script which calls the Gemini `generateContent` endpoint, extracts the image from the response, and saves it:

```bash
python ./scripts/generate_gemini.py ./prompts/your_prompt.json ./images/output_image.jpg "4:5"
```
*(The aspect ratio parameter defaults to "auto" if omitted).*

**Supported output formats:** `.jpg`, `.png`, `.webp` (determined by the output file extension).

**Optional `api_parameters` in your prompt JSON:**
- `"model"`: Override the model (default: `"gemini-2.0-flash-exp"`)
- `"aspect_ratio"`: `"1:1"`, `"3:4"`, `"4:5"`, `"9:16"`, `"16:9"`, etc.
- `"resolution"`: `"1K"`, `"2K"`, `"4K"`

**Image editing / reference images:**
Include `"image_input"` in your prompt JSON as a string or array of strings (local file paths or URLs). These are sent as reference images alongside your text prompt for image editing or style transfer.

## How to use this skill
When a user asks you to generate a highly detailed, realistic, or complex image, you must construct the prompt string formatted EXACTLY like the JSON schema above. Pass that entire JSON string as the `Prompt` argument to the `generate_image` tool.
