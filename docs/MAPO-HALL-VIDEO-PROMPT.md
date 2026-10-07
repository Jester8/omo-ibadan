# Mapo Hall animated background: prompt

Use with any text-to-video tool (Veo, Runway, Kling, Luma, Sora). If the tool accepts a reference image,
attach a real photo of Mapo Hall so the building is accurate.

## Video prompt

Cinematic aerial drone shot slowly pushing in toward Mapo Hall in Ibadan, Nigeria, at golden hour. The stately
cream-white colonial-era hall with its columned portico and tower sits on Mapo hill, the green hilltop lawn and
palm trees around it, while below it an endless sea of rust-brown corrugated-iron roofs rolls to the horizon, the
famous Ibadan skyline. Warm low sun, soft haze, long shadows, glowing roofs. Gentle life in the scene: flags
fluttering at the hall, a flock of birds crossing the sky, clouds drifting slowly, tiny yellow danfo buses, keke and
okada moving along the roads far below, smoke wisps from cooking fires, a few windows and street lamps flicking on as
dusk arrives. Camera: one smooth, slow forward drift with a very slight upward tilt, no cuts. Rich, warm, photoreal
color grade, shallow atmospheric depth, 16:9, 8 to 10 seconds, seamless loop (the last frame matches the first).

## Negative prompt

text, captions, logos, watermarks, close-up faces, crowds, fast camera motion, cuts, flicker, distorted
buildings, extra towers, snow, night-only darkness, cartoon style.

## Variants

- Phone: same prompt, 9:16 vertical, camera rising slowly up the hill toward the hall.
- Poster frame: "Mapo Hall, Ibadan, golden hour, aerial, rust-brown rooftops below, photoreal, 16:9" (save as mapo-hall.jpg).

## Delivery

1. Export H.264 MP4, 1920x1080, 24 to 30 fps, no audio, under about 5 MB (compress with HandBrake or ffmpeg if larger):
   `ffmpeg -i in.mp4 -an -vf scale=1920:-2 -c:v libx264 -crf 28 -preset slow -movflags +faststart mapo-hall.mp4`
2. Save it as `public/video/mapo-hall.mp4` (optional poster as `public/video/mapo-hall.jpg`), commit and push.
3. The home page picks it up by itself. With no file, it keeps the gradient and skyline.
