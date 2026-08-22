import { config } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
config({ path: path.join(root, ".env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key);
const BUCKET = "site-images";

// Objects seeded directly at the bucket root, still referenced by existing
// menu_items.image_url / gallery_images.url rows. Re-encoded in place at the
// SAME path so no DB row needs to change.
const OBJECTS = [
  "menu-biryani.png",
  "menu-tandoori.png",
  "menu-pasta.png",
  "menu-burger.png",
  "menu-shake.png",
  "storefront.png",
  "gallery-1.jpg",
  "gallery-2.jpg",
  "gallery-3.jpg",
];

for (const objectPath of OBJECTS) {
  const { data, error } = await supabase.storage.from(BUCKET).download(objectPath);
  if (error) {
    console.warn(`skip ${objectPath}: ${error.message}`);
    continue;
  }
  const before = data.size;
  const buf = Buffer.from(await data.arrayBuffer());
  const meta = await sharp(buf).metadata();

  const isJpeg = /\.jpe?g$/i.test(objectPath);
  const out = isJpeg
    ? await sharp(buf).jpeg({ quality: 78, mozjpeg: true }).toBuffer()
    : await sharp(buf)
        .png({ palette: true, quality: 85, effort: 10, compressionLevel: 9 })
        .toBuffer();

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(objectPath, out, {
      upsert: true,
      contentType: isJpeg ? "image/jpeg" : "image/png",
    });

  if (upErr) {
    console.warn(`upload failed ${objectPath}: ${upErr.message}`);
    continue;
  }

  console.log(
    `${objectPath}: ${(before / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB` +
      ` (-${(100 - (out.length / before) * 100).toFixed(0)}%) [${meta.width}x${meta.height}]`
  );
}
