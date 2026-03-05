---
name: nano-banana-json
description: Translates basic natural language prompts into structured JSON prompts optimized for Nano Banana 2 (Gemini 3.1 Flash) image generation. Invoke with /nano-banana-json or when user asks to "convert", "translate", or "expand" a prompt into JSON format for Nano Banana.
user_invocable: true
---

# Nano Banana 2 JSON Prompt Translator

## Purpose

Take a simple, plain-English image description and expand it into a fully structured JSON prompt that Nano Banana 2 can execute with maximum precision. The output JSON achieves 92% precision for color accuracy, lighting ratios, and composition vs ~68% for raw natural language.

## When This Skill Triggers

- User says `/nano-banana-json` followed by a description
- User asks to "convert my prompt to JSON", "make this a JSON prompt", "expand this for Nano Banana"
- User provides a short image idea and wants it turned into a structured Nano Banana prompt

## Input

A natural language image description. Can be as simple as:
- "a cat on a beach at sunset"
- "product shot of sneakers on concrete"
- "portrait of an old fisherman"

Or more detailed:
- "cinematic wide shot of a samurai standing in a misty bamboo forest at dawn, Kurosawa style"

## Output

A complete JSON prompt file following the Nano Banana 2 schema, ready to be:
1. Pasted directly into Gemini / Google AI Studio
2. Saved to `/prompts/` and executed via `generate_kie.py`
3. Used as a template for batch variations

---

## Translation Rules

### Step 1: Parse the User's Input

Extract these elements from the natural language prompt (any not mentioned get smart defaults):

| Element | Look For | Example |
|---------|----------|---------|
| **Subject** | The main noun(s) — person, animal, object, scene | "old fisherman", "sneakers", "samurai" |
| **Action/Pose** | Verbs or implied positioning | "standing", "sitting", "holding" |
| **Location/Setting** | Where it takes place | "beach", "bamboo forest", "studio" |
| **Time/Lighting** | Time of day, weather, light hints | "sunset", "dawn", "neon", "overcast" |
| **Style/Medium** | Artistic direction | "cinematic", "documentary", "watercolor", "Kurosawa" |
| **Mood** | Emotional tone | "dramatic", "peaceful", "eerie", "warm" |
| **Materials** | Specific textures mentioned | "concrete", "leather", "glass" |
| **Colors** | Any color references | "red dress", "golden light", "monochrome" |
| **Camera hints** | Framing or lens references | "close-up", "wide shot", "macro", "aerial" |
| **Aspect ratio** | Platform or dimension hints | "for Instagram", "landscape", "vertical" |

### Step 2: Apply Smart Defaults

For anything the user did NOT specify, apply these defaults based on subject type:

#### Camera Defaults

| Subject Type | Default Lens | Default Aperture | Default Angle |
|-------------|-------------|-------------------|---------------|
| Portrait (head/shoulders) | 85mm | f/1.4 | Eye level, slight 3/4 |
| Full body person | 50mm | f/2.0 | Eye level |
| Landscape/wide scene | 24mm | f/8 | Eye level or slightly elevated |
| Product/object | 90mm macro | f/4 | Slight overhead 3/4 |
| Architecture/interior | 24mm | f/5.6 | Eye level or low |
| Macro/detail | 100mm macro | f/2.8 | Close, subject-level |
| Street/candid | 35mm | f/2.8 | Eye level |
| Group/crowd | 35mm | f/4 | Slightly elevated |

#### Lighting Defaults (by time of day)

| Time/Condition | Default Lighting Description |
|---------------|------------------------------|
| Dawn/sunrise | Soft pink-golden light from the horizon, long shadows, cool ambient fill |
| Morning | Clean natural daylight from upper-left, soft shadows |
| Midday/noon | Harsh overhead sunlight, strong shadows directly below |
| Golden hour/sunset | Warm amber backlight from low horizon, rim lighting on edges |
| Twilight/blue hour | Cool blue ambient light, warm artificial lights beginning |
| Night/dark | Artificial light sources (specify type), deep shadows |
| Overcast/cloudy | Soft diffused light from all directions, minimal shadows |
| Indoor/studio | Soft natural window light from camera-left (default) |
| Neon/urban night | Multiple colored point lights, reflections on wet surfaces |
| NOT SPECIFIED | "Soft natural daylight from upper-left, subtle shadows" |

#### Color Palette Defaults (by mood/time)

| Context | Default ColorRestriction |
|---------|------------------------|
| Sunset/golden hour | "warm amber, peach, deep coral, muted gold, soft shadow blue" |
| Dawn/sunrise | "soft pink, pale gold, lavender, cool grey-blue" |
| Night/dark | "deep navy, charcoal, cool blue-grey, warm amber accents" |
| Forest/nature | "deep emerald, moss green, warm brown, dappled gold" |
| Urban/street | "concrete grey, warm amber, deep shadow, muted earth tones" |
| Ocean/beach | "ocean teal, sandy beige, warm gold, seafoam white" |
| Studio/product | "clean white, soft grey, single accent color from subject" |
| Dramatic | "high contrast: deep blacks, bright highlights, single accent" |
| Peaceful/serene | "muted pastels, soft cream, gentle blue, warm grey" |
| NOT SPECIFIED | Derive from setting and mood, or use "natural, balanced palette" |

#### Style Defaults

| Hint | Default Style |
|------|--------------|
| No style mentioned | "photorealistic, natural" |
| "cinematic" | "cinematic photography, wide dynamic range, film color grading" |
| "documentary" | "documentary photography, candid, unposed, natural light" |
| "editorial" | "editorial fashion photography, high contrast, intentional composition" |
| "vintage" | "film photography, Kodak Portra 400, soft grain, warm tones" |
| "dramatic" | "dramatic photography, chiaroscuro lighting, deep contrast" |
| "minimalist" | "minimalist photography, clean composition, negative space" |
| Artist/director name | "inspired by [name]'s visual style — [describe their signature look]" |

#### Aspect Ratio Defaults

| Context | Default |
|---------|---------|
| Portrait (vertical person) | 3:4 |
| Landscape/panorama | 16:9 |
| Square/product/profile | 1:1 |
| Instagram feed | 4:5 |
| Instagram/TikTok story | 9:16 |
| YouTube thumbnail | 16:9 |
| Ultra-wide/panoramic | 4:1 |
| NOT SPECIFIED | 3:4 |

### Step 3: Generate the JSON

Produce a JSON object with this exact structure. **Only include fields that are relevant** — omit blocks that don't apply (e.g., no `multi_panel_layout` for a single image, no `embedded_text` if no text requested).

```json
{
  "prompt": "<Dense narrative string: merge ALL details into one rich paragraph. Include camera math, material physics, lighting behavior, and negative commands. Write as if briefing a human photographer.>",

  "negative_prompt": "<Comma-separated realism blockers. ALWAYS include: blurry, low resolution, distorted face, extra fingers, overexposed, plastic skin, airbrushed texture, CGI, oversaturated colors, anatomy normalization, beautification filters, skin smoothing>",

  "settings": {
    "resolution": "<1024x1024 | 1024x1792 | 1792x1024 | 4k>",
    "style": "<from style defaults>",
    "lighting": "<from lighting defaults>",
    "camera_angle": "<derived from subject/camera hints>",
    "depth_of_field": "<shallow | deep | selective>",
    "quality": "<high detail, unretouched | visible film grain | clean digital>"
  },

  "api_parameters": {
    "aspect_ratio": "<from aspect ratio defaults>",
    "resolution": "1K",
    "output_format": "jpg"
  }
}
```

### Step 4: Writing the Dense Narrative `prompt` String

This is the most critical field. Follow these rules:

1. **Open with the shot type and medium**: "Ultra-realistic close-up portrait..." or "Cinematic wide establishing shot..."
2. **Describe the subject with microscopic detail**: Age, skin texture (visible pores, specific imperfections), hair, expression, body language
3. **Materials and textures**: What things are MADE OF — "worn leather jacket with creased elbows", "matte ceramic with visible clay texture"
4. **Environment and spatial placement**: Where the subject is, what's behind them, foreground elements
5. **Lighting BEHAVIOR**: Not just "golden hour" but "warm amber backlight from low horizon, creating a rim light along the subject's hair and shoulders, casting long shadows forward"
6. **Camera mathematics**: Exact lens, aperture, ISO — "85mm lens, f/1.8, ISO 200"
7. **Film stock** (if vintage/film style): "Shot on Kodak Portra 400" or "Fujifilm Superia look"
8. **Negative commands inline**: "Do not beautify or alter facial features. No makeup enhancement. Unretouched skin."
9. **Mood/atmosphere closure**: End with the emotional quality — "The atmosphere is contemplative and still."

#### Example Dense Narrative

User input: `"a cat on a beach at sunset"`

Generated prompt string:
> "Photorealistic nature photograph of a domestic shorthair orange tabby cat sitting upright on wet sand near the waterline at a quiet beach during golden hour. The cat's fur is soft with visible individual strands, slightly ruffled by a gentle sea breeze, with warm amber rim lighting along the edges of its ears and back. The sand is wet and reflective, showing a faint mirror of the cat's silhouette. Behind the cat, the ocean stretches to the horizon where the sun is setting, casting deep coral and peach tones across scattered clouds. Gentle waves lap at the shore in the middle distance, slightly out of focus. 85mm lens, f/2.0, ISO 100. Natural golden hour backlight from behind the subject, warm rim light on fur edges, long shadows stretching toward the camera. The color palette is restricted to warm amber, peach, deep coral, ocean blue-grey, and sandy beige. Do not over-saturate. Maintain natural animal proportions and realistic fur texture. The mood is serene, warm, and contemplative."

### Step 5: Offer the JSON and Next Steps

After generating the JSON, present it in a code block and tell the user:

1. The JSON is ready to paste into Gemini or Google AI Studio
2. They can save it to `/prompts/[descriptive-name].json` and run it via:
   ```bash
   python ./scripts/generate_gemini.py ./prompts/[name].json ./images/[name].jpg "3:4"
   ```
3. Offer to tweak any specific field (lighting, camera, mood, colors)
4. Offer to create variations (same scene, different lighting; same subject, different setting)

---

## Advanced Features

### Batch Variations

If the user asks for "variations" or "options", generate 2-3 JSON prompts that differ in ONE dimension:
- **Lighting variations**: Same scene at dawn, golden hour, and blue hour
- **Camera variations**: Same subject at 35mm wide, 50mm standard, 85mm portrait
- **Style variations**: Same scene as photorealistic, vintage film, and cinematic

### Multi-Panel / Collage

If user requests a grid or collage, add the `multi_panel_layout` block:
```json
"multi_panel_layout": {
  "grid_panels": [
    { "panel": "top_left", "pose": "...", "action": "..." },
    { "panel": "top_right", "pose": "...", "action": "..." },
    { "panel": "bottom_left", "pose": "...", "action": "..." },
    { "panel": "bottom_right", "pose": "...", "action": "..." }
  ]
}
```

### Text in Image

If user wants text rendered in the image, add:
```json
"embedded_text_and_overlays": {
  "text": "EXACT TEXT HERE",
  "location": "upper third, centered",
  "style": "clean sans-serif, white with subtle drop shadow"
}
```
Nano Banana 2 excels at legible text rendering — use this for posters, social media graphics, greeting cards, and UI mockups.

### Character Consistency

For generating multiple images of the same character, include an `identity` field in the subject and maintain the same physical description across all prompts. Use `consistency_id` in api_parameters when available.

### Hyper-Realism Mode

When the user says "realistic", "unretouched", or "raw", activate the full realism stack:
- Add `image_quality_simulation` block with sensor noise and lens imperfections
- Add `structural_preservation` rules
- Set all `explicit_restrictions` to true
- Expand the negative prompt with the full anti-AI blockers list
- Include commands like "Do not beautify", "unretouched skin", "natural body proportions"

---

## Integration with Existing Skill

This skill produces JSON files compatible with the **Nano Banana 2 Image Generation Master** skill. The workflow is:

1. User describes what they want in plain English
2. **This skill** translates it into structured JSON
3. The JSON is saved to `/prompts/`
4. **The Image Generation Master skill** executes it via `generate_gemini.py` (Google Gemini API)

The research backing this skill is documented in `nano-banana-2-json-prompting-research.md` at the project root.
