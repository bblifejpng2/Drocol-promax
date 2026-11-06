// Builds the homepage hero by blending two real photos: the sky and sun from
// one, and the Lagos city at dusk from another. Radio masts and old rooftops
// are retouched out of the sky. The sun stays at (1413, 708), which
// SunAlignedPhoto in hero.tsx expects.
//
// Regenerate (from the project root):
//   node scripts/make-home-hero.mjs docs/design-references/home-original.jpg docs/design-references/home-city.jpg public/sites/drocol/heroes/home.jpg
import sharp from "sharp";

const [skyPath, cityPath, output] = process.argv.slice(2);
const W = 1920;
const H = 1440;
const HORIZON = 860; // where the city's horizon sits in the final image
const CITY_HORIZON = 418; // the horizon's height within the city photo

const sky = await sharp(skyPath).resize(W, H, { fit: "fill" }).toBuffer();

// Retouch: cover each mast with neighbouring sky through a feathered mask.
// [x, y, width, height, how far sideways to borrow the sky from]
const patches = [
  [1622, 560, 128, 330, 130],
  [962, 728, 56, 160, -62],
  [606, 716, 56, 170, -62],
  [378, 770, 52, 118, -56],
  [764, 796, 40, 92, -44],
  [1384, 806, 44, 82, -50],
  [466, 724, 40, 44, -44],
];
async function featheredPatch(source, x, y, w, h, srcX, srcY, feather) {
  const mask = await sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect x="${feather}" y="${feather}" width="${w - feather * 2}" height="${h - feather * 2}" fill="#fff"/></svg>`,
    ),
  )
    .blur(feather / 2)
    .png()
    .toBuffer();
  const input = await sharp(source)
    .extract({ left: srcX, top: srcY, width: w, height: h })
    .ensureAlpha()
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
  return { input, left: x, top: y };
}

const retouch = await Promise.all(
  patches.map(([x, y, w, h, dx]) => featheredPatch(sky, x, y, w, h, x + dx, y, w > 100 ? 26 : 9)),
);
const cleanSky = await sharp(sky).composite(retouch).png().toBuffer();

// Hide the old rooftops at the horizon: stretch the clean sky just above them
// down over that band, softened, fading in from the top.
const bandTop = 802;
const bandH = 110;
const bandFade = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${bandH}"><defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0"/>
    <stop offset="0.3" stop-color="#fff" stop-opacity="1"/>
  </linearGradient></defs><rect width="${W}" height="${bandH}" fill="url(#b)"/></svg>`,
);
const skyBand = await sharp(
  await sharp(cleanSky)
    .extract({ left: 0, top: 772, width: W, height: 44 })
    .resize(W, bandH, { fit: "fill" })
    .blur(5)
    .png()
    .toBuffer(),
)
  .ensureAlpha()
  .composite([{ input: bandFade, blend: "dest-in" }])
  .png()
  .toBuffer();

// City: fades in across the horizon so there's no visible seam.
const cityHeight = H - (HORIZON - CITY_HORIZON);
const fadeStart = ((CITY_HORIZON - 53) / cityHeight) * 100;
const fadeEnd = ((CITY_HORIZON + 19) / cityHeight) * 100;
const cityMask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${cityHeight}"><defs><linearGradient id="m" x1="0" y1="0" x2="0" y2="1">
    <stop offset="${fadeStart}%" stop-color="#fff" stop-opacity="0"/>
    <stop offset="${fadeEnd}%" stop-color="#fff" stop-opacity="1"/>
  </linearGradient></defs><rect width="${W}" height="${cityHeight}" fill="url(#m)"/></svg>`,
);
const city = await sharp(cityPath)
  .resize(W, H, { fit: "cover" })
  .extract({ left: 0, top: 0, width: W, height: cityHeight })
  .modulate({ brightness: 1.12, saturation: 1.1 })
  .ensureAlpha()
  .composite([{ input: cityMask, blend: "dest-in" }])
  .png()
  .toBuffer();

// Warm light from the sunset falling onto the far part of the city.
const warmth = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#f08a24" stop-opacity="0.2"/>
    <stop offset="1" stop-color="#f08a24" stop-opacity="0"/>
  </linearGradient></defs><rect x="0" y="${HORIZON - 6}" width="${W}" height="190" fill="url(#g)"/></svg>`,
);

const blended = await sharp(cleanSky)
  .composite([
    { input: skyBand, left: 0, top: bandTop },
    { input: city, left: 0, top: HORIZON - CITY_HORIZON },
    { input: warmth, left: 0, top: 0 },
  ])
  .png()
  .toBuffer();

// Retouch a third party's logo off the building's side wall, using the wall
// just below it.
const logo = await featheredPatch(blended, 1026, 1094, 50, 48, 1026, 1146, 7);
const logoCorner = await featheredPatch(blended, 668, 1054, 30, 40, 668, 1096, 6);

await sharp(blended).composite([logo, logoCorner]).jpeg({ quality: 84, mozjpeg: true }).toFile(output);

console.log("written", output);
