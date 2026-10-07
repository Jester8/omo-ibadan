# Mapo Hall home background: image prompt

Use with any image generator (Midjourney, DALL·E, Imagen, Flux, Firefly). If it accepts a reference image,
attach a real photo of Mapo Hall so the building is accurate.

## Prompt

Wide cinematic photograph of Mapo Hall in Ibadan, Nigeria, at golden hour. The stately cream-white colonial-era
hall with its columned portico and tower stands on Mapo hill among palm trees and a green lawn, and below it an
endless sea of rust-brown corrugated-iron roofs rolls to the hazy horizon, the famous Ibadan skyline. Warm low
sun, long soft shadows, glowing roofs, a few birds in the sky, tiny yellow danfo buses on the roads far below, wisps
of cooking smoke, dramatic soft clouds. Aerial view from slightly above and in front, the hall in the left third so
there is calm open sky and rooftops on the right for text. Photoreal, rich warm colour grade, shallow atmospheric
haze, 16:9, ultra detailed.

## Negative prompt

text, captions, logos, watermarks, close-up faces, crowds, distorted buildings, extra towers, snow, cartoon style,
oversaturated, night-only darkness.

## Variants

- Phone: the same prompt in 9:16 vertical, hall in the lower third with open sky above (the page crops the image to fit).

## Delivery

1. Save as JPEG, 1920x1080 or larger, under about 400 KB (`ffmpeg -i in.png -vf scale=1920:-2 -q:v 4 mapo-hall.jpg`).
2. Put it at `public/home/mapo-hall.jpg`, commit and push.
3. The home page picks it up by itself and darkens it slightly so the buttons stay readable. With no file, it keeps the gradient and skyline.
