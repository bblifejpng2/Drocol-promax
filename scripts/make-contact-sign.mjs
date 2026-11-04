// Composite a brushed-brass Drocol sign onto the contact lobby photo.
// Regenerate (from the project root):
//   node scripts/make-contact-sign.mjs docs/design-references/contact-original.jpg public/sites/calif/heroes/contact.jpg
import sharp from "sharp";

const [input, output] = process.argv.slice(2);

const W = 1920, H = 1080;
// Wall behind reception: x 685..1365, y 410..675. Centre the sign on it.
const cx = 1025, cy = 538;

const markH = 96, markS = markH / 83, markW = 86 * markS;
const wordH = 54, wordS = wordH / 36, wordW = 138 * wordS;
const gap = 24;
const left = cx - (markW + gap + wordW) / 2;
const markX = left - 7 * markS, markY = cy - markH / 2 - 3.5 * markS;
const wordX = left + markW + gap, wordY = cy - wordH / 2;

const ORANGE = "#E2701A";

const mark = (fill) => `
  <path d="M50 7.5 L87 30 L50 52.5 L13 30 Z" fill="${fill}" stroke="${fill}" stroke-width="6" stroke-linejoin="round" mask="url(#hole)"/>
  <path d="M11 41 Q11 44.5 14 46.3 L50 68 L86 46.3 Q89 44.5 89 41 M11 55.5 Q11 59 14 60.8 L50 82.5 L86 60.8 Q89 59 89 55.5" fill="none" stroke="${fill}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;

const word = (stroke) => `
  <g fill="none" stroke="${stroke}" stroke-width="5">
    <path d="M2.5 3.5 H13 A12 12 0 0 1 25 15.5 V20.5 A12 12 0 0 1 13 32.5 H2.5 Z"/>
    <path d="M33.5 35 V22.5 A7 7 0 0 1 40.5 15.5 H47"/>
    <rect x="52.5" y="15.5" width="21" height="17" rx="7"/>
    <path d="M101 15.5 H88 A7 7 0 0 0 81 22.5 V25.5 A7 7 0 0 0 88 32.5 H101"/>
    <rect x="106.5" y="15.5" width="21" height="17" rx="7"/>
    <path d="M134.5 1 V35"/>
  </g>`;

// Letters stand ~2cm off the wall, lit from the ceiling spots: shadow falls
// below and slightly soft. A second tight shadow gives contact depth.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <mask id="hole" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="92">
      <rect width="100" height="92" fill="#fff"/>
      <path d="M50 19 L67 30 L50 41 L33 30 Z" fill="#000" stroke="#000" stroke-width="5" stroke-linejoin="round"/>
    </mask>
    <linearGradient id="brassMark" gradientUnits="userSpaceOnUse" x1="0" y1="3" x2="0" y2="87">
      <stop offset="0" stop-color="#f6e2b0"/>
      <stop offset="0.28" stop-color="#d8b06a"/>
      <stop offset="0.52" stop-color="#a87a35"/>
      <stop offset="0.7" stop-color="#d9b46f"/>
      <stop offset="1" stop-color="#8c6428"/>
    </linearGradient>
    <linearGradient id="brassWord" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="36">
      <stop offset="0" stop-color="#f6e2b0"/>
      <stop offset="0.35" stop-color="#d4aa62"/>
      <stop offset="0.6" stop-color="#a47634"/>
      <stop offset="1" stop-color="#d0a85f"/>
    </linearGradient>
    <filter id="shadowSoft" x="-20%" y="-20%" width="140%" height="160%">
      <feGaussianBlur stdDeviation="5"/>
    </filter>
    <filter id="shadowTight" x="-10%" y="-10%" width="120%" height="130%">
      <feGaussianBlur stdDeviation="1.4"/>
    </filter>
    <radialGradient id="glow" cx="${cx}" cy="${cy - 30}" r="300" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fff2d8" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#fff2d8" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- warm wash where the sign is lit -->
  <rect x="685" y="410" width="680" height="265" fill="url(#glow)"/>

  <!-- soft cast shadow -->
  <g opacity="0.42" filter="url(#shadowSoft)">
    <g transform="translate(${markX + 2} ${markY + 9}) scale(${markS})">${mark("#2a1c0e")}
      <path d="M50 26 L56 30 L50 34 L44 30 Z" fill="#2a1c0e" stroke="#2a1c0e" stroke-width="4" stroke-linejoin="round"/></g>
    <g transform="translate(${wordX + 2} ${wordY + 9}) scale(${wordS})">${word("#2a1c0e")}</g>
  </g>
  <!-- tight contact shadow -->
  <g opacity="0.35" filter="url(#shadowTight)">
    <g transform="translate(${markX + 0.5} ${markY + 2.5}) scale(${markS})">${mark("#1a1108")}</g>
    <g transform="translate(${wordX + 0.5} ${wordY + 2.5}) scale(${wordS})">${word("#1a1108")}</g>
  </g>

  <!-- brass letters -->
  <g transform="translate(${markX} ${markY}) scale(${markS})">
    ${mark("url(#brassMark)")}
    <path d="M50 26 L56 30 L50 34 L44 30 Z" fill="${ORANGE}" stroke="${ORANGE}" stroke-width="4" stroke-linejoin="round"/>
  </g>
  <g transform="translate(${wordX} ${wordY}) scale(${wordS})">
    ${word("url(#brassWord)")}
    <rect x="114" y="21" width="6" height="6" rx="1.5" fill="${ORANGE}"/>
  </g>

  <!-- top-edge highlight from the downlights -->
  <g opacity="0.55" transform="translate(${markX} ${markY - 0.8}) scale(${markS})">
    <path d="M50 7.5 L87 30 M50 7.5 L13 30" fill="none" stroke="#fff6e0" stroke-width="1.2" stroke-linecap="round"/>
  </g>
</svg>`;

sharp(input)
  .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(output)
  .then((info) => console.log("written", output, info.width + "x" + info.height, info.size + "B"))
  .catch((e) => { console.error(e); process.exit(1); });
