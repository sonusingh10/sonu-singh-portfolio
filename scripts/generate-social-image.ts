import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { profile } from "../content/profile";

const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char]!);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f5f3ed"/>
<circle cx="890" cy="325" r="230" fill="none" stroke="#c9ccc3" stroke-width="1"/>
<ellipse cx="890" cy="325" rx="330" ry="155" transform="rotate(-28 890 325)" fill="none" stroke="#c34f31" stroke-opacity=".5"/>
<circle cx="935" cy="330" r="115" fill="#c34f31"/>
<circle cx="935" cy="330" r="115" fill="url(#g)"/>
<defs><radialGradient id="g" cx="33%" cy="30%"><stop stop-color="#f9c2a9"/><stop offset=".62" stop-color="#c34f31"/><stop offset="1" stop-color="#833a30"/></radialGradient></defs>
<text x="74" y="102" font-family="Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="3" fill="#1a201e">✳  ${escape(profile.name.toUpperCase())} <tspan fill="#737a74" font-weight="400">/ PORTFOLIO</tspan></text>
<text x="74" y="300" font-family="Arial,sans-serif" font-size="83" font-weight="500" letter-spacing="-5" fill="#1a201e">Make the complex</text>
<text x="74" y="398" font-family="Georgia,serif" font-style="italic" font-size="99" letter-spacing="-5" fill="#c34f31">make sense.</text>
<text x="76" y="526" font-family="Arial,sans-serif" font-size="17" letter-spacing="2" fill="#636b66">NETWORK SECURITY  ·  OBSERVABILITY  ·  TECHNICAL SUCCESS</text>
</svg>`;

async function main() {
  const output = path.resolve("public/social-card.png");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  await sharp(Buffer.from(svg)).png().toFile(output);
  console.log(`Generated ${output} from profile data.`);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
