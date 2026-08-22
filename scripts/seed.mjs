import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
config({ path: path.join(root, ".env.local") });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const imagesDir = path.join(root, "public", "images");
const BUCKET = "site-images";

async function uploadImage(filename) {
  const filePath = path.join(imagesDir, filename);
  const fileBuffer = readFileSync(filePath);
  const ext = path.extname(filename).slice(1);
  const contentType = ext === "jpg" ? "image/jpeg" : `image/${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, fileBuffer, { contentType, upsert: true });

  if (error) throw new Error(`Upload failed for ${filename}: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return data.publicUrl;
}

async function main() {
  console.log("Uploading images to storage bucket...");
  const files = [
    "menu-biryani.png",
    "menu-tandoori.png",
    "menu-pasta.png",
    "menu-burger.png",
    "menu-shake.png",
    "gallery-1.jpg",
    "gallery-2.jpg",
    "gallery-3.jpg",
    "gallery-4.jpg",
    "hero-bg.png",
    "storefront.png",
  ];
  const urls = {};
  for (const f of files) {
    urls[f] = await uploadImage(f);
    console.log(`  uploaded ${f}`);
  }

  console.log("Seeding menu_items...");
  await supabase.from("menu_items").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error: menuErr } = await supabase.from("menu_items").insert(
    [
      {
        category: "Main Course",
        name: "Chicken Biryani",
        description: "Aromatic basmati rice cooked with spicy chicken & herbs.",
        price: 220,
        image_url: urls["menu-biryani.png"],
        sort_order: 1,
      },
      {
        category: "Main Course",
        name: "Tandoori Chicken",
        description: "Marinated in spices & yogurt and grilled to perfection.",
        price: 280,
        image_url: urls["menu-tandoori.png"],
        sort_order: 2,
      },
      {
        category: "Main Course",
        name: "Alfredo Pasta",
        description: "Creamy, cheesy and loaded with vegetables & herbs.",
        price: 200,
        image_url: urls["menu-pasta.png"],
        sort_order: 3,
      },
      {
        category: "Main Course",
        name: "Crispy Chicken Burger",
        description: "Crispy chicken, fresh veggies and our special sauce.",
        price: 150,
        image_url: urls["menu-burger.png"],
        sort_order: 4,
      },
      {
        category: "Beverages",
        name: "Chocolate Shake",
        description: "Thick, creamy and chocolatey delight in every sip.",
        price: 120,
        image_url: urls["menu-shake.png"],
        sort_order: 5,
      },
    ]
  );
  if (menuErr) throw new Error(`menu_items insert failed: ${menuErr.message}`);

  console.log("Seeding gallery_images...");
  await supabase.from("gallery_images").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  // NOTE: every row must include the same keys — PostgREST sends NULL (not the
  // column default) for keys missing from some rows in a batched insert.
  const { error: galleryErr } = await supabase.from("gallery_images").insert([
    { url: urls["gallery-1.jpg"], category: "Ambience", caption: "", sort_order: 1 },
    { url: urls["gallery-2.jpg"], category: "Ambience", caption: "", sort_order: 2 },
    { url: urls["gallery-3.jpg"], category: "Ambience", caption: "Good Food Great Moments", sort_order: 3 },
    { url: urls["gallery-4.jpg"], category: "Ambience", caption: "", sort_order: 4 },
    { url: urls["hero-bg.png"], category: "Ambience", caption: "", sort_order: 5 },
    { url: urls["storefront.png"], category: "Others", caption: "Storefront", sort_order: 6 },
  ]);
  if (galleryErr) throw new Error(`gallery_images insert failed: ${galleryErr.message}`);

  console.log("Seeding site_content...");
  await supabase
    .from("site_content")
    .update({
      about_text:
        "At Grand Form, we serve a wide variety of delicious dishes made with fresh ingredients and authentic flavours. Whether it's a casual meal with family or a celebration with friends, we make every moment special.",
      hours: "Open 12:00 PM – 12:00 AM",
      phone_1: "9961 80 80 70",
      phone_2: "8086 908 909",
      email: "hotelgrandform@gmail.com",
      website: "www.hotelgrandform.com",
      address_line_1: "Grand form, Iringalakuda,",
      address_line_2: "Kator Bypass Road, 680121",
      map_query: "Iringalakuda Kator Bypass Road 680121",
      instagram_url: "https://instagram.com/hotel.grandform",
    })
    .eq("id", 1);

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
