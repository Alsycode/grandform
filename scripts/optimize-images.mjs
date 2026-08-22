import { statSync, unlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dir = path.join(root, "public", "images");

// Local files actually referenced via <Image src="/images/xxx.ext"> in the app.
// Converted to .webp (same basename) for large size + format savings.
const TARGETS = [
  "about-bg",
  "contact-interior",
  "footer-bg",
  "hero-bg",
  "hero-food",
  "storefront",
  "logo-icon",
];

const results = [];

for (const name of TARGETS) {
  const candidates = [".png", ".jpg", ".jpeg"].map((ext) =>
    path.join(dir, name + ext)
  );
  const src = candidates.find((p) => {
    try {
      statSync(p);
      return true;
    } catch {
      return false;
    }
  });
  if (!src) {
    console.warn(`skip ${name}: source not found`);
    continue;
  }

  const before = statSync(src).size;
  const out = path.join(dir, name + ".webp");
  const meta = await sharp(src).metadata();

  await sharp(src)
    .webp({ quality: meta.hasAlpha ? 88 : 80, effort: 6 })
    .toFile(out);

  const after = statSync(out).size;
  results.push({ name, before, after, hadAlpha: meta.hasAlpha });

  if (src !== out) unlinkSync(src);
}

let totalBefore = 0;
let totalAfter = 0;
for (const r of results) {
  totalBefore += r.before;
  totalAfter += r.after;
  console.log(
    `${r.name}: ${(r.before / 1024).toFixed(0)}KB -> ${(r.after / 1024).toFixed(0)}KB` +
      ` (-${(100 - (r.after / r.before) * 100).toFixed(0)}%)`
  );
}
console.log(
  `\nTotal: ${(totalBefore / 1024).toFixed(0)}KB -> ${(totalAfter / 1024).toFixed(0)}KB` +
    ` (-${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}%)`
);
