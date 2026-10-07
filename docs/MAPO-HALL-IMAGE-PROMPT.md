# Mapo Hall home background: image prompt

Use with any image generator (Midjourney, DALL·E, Imagen, Flux, Firefly). Cartoon / animated style to match the game. If it accepts a reference image,
attach a real photo of Mapo Hall so the building is accurate.

## Prompt

Stylised animated-film illustration of Mapo Hall in Ibadan, Nigeria, at golden hour, in the look of a modern 3D
animated movie or a Studio Ghibli background painting. The stately cream-white colonial-era hall with its columned
portico and tower stands on Mapo hill among round, chunky palm trees and a bright green lawn, and below it a
sea of charming brown corrugated-iron rooftops rolls to a soft hazy horizon. Warm peach and orange sky with
fluffy storybook clouds, glowing sunlight, tiny yellow danfo buses and little okada riders on the roads far below,
a few birds, cooking smoke curls, cheerful colours, clean shapes, soft gradients, gentle rim light. Wide view from
slightly above and in front, the hall in the left third so there is open sky and rooftops on the right for text.
Playful, warm and inviting, 16:9, highly detailed, no text.

## Negative prompt

text, captions, logos, watermarks, photo-realistic, close-up faces, crowds, distorted buildings, extra towers, snow,
blurry, night-only darkness.

## Variants

- Phone: the same prompt in 9:16 vertical, hall in the lower third with open sky above (the page crops the image to fit).

## Delivery

1. Save as JPEG, 1920x1080 or larger, under about 400 KB (`ffmpeg -i in.png -vf scale=1920:-2 -q:v 4 mapo-hall.jpg`).
2. Put it at `public/home/mapo-hall.jpg`, commit and push.
3. The home page picks it up by itself and darkens it slightly so the buttons stay readable. With no file, it keeps the gradient and skyline.
