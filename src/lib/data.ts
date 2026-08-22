import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
};

export type GalleryImage = {
  id: string;
  url: string;
  category: string;
  caption: string;
};

export type SiteContent = {
  about_text: string;
  hours: string;
  phone_1: string;
  phone_2: string;
  email: string;
  website: string;
  address_line_1: string;
  address_line_2: string;
  map_query: string;
  instagram_url: string | null;
  facebook_url: string | null;
  whatsapp_number: string | null;
};

const DEFAULT_SITE_CONTENT: SiteContent = {
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
  facebook_url: null,
  whatsapp_number: null,
};

export const getMenuItems = cache(async (): Promise<MenuItem[]> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("menu_items")
    .select("id, category, name, description, price, image_url")
    .eq("status", "Active")
    .order("sort_order");
  return data ?? [];
});

export const getGalleryImages = cache(async (): Promise<GalleryImage[]> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_images")
    .select("id, url, category, caption")
    .order("sort_order");
  return data ?? [];
});

export type Special = {
  id: string;
  title: string;
  description: string;
  active: boolean;
};

export const getSpecials = cache(async (): Promise<Special[]> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("specials")
    .select("id, title, description, active")
    .eq("active", true)
    .order("created_at", { ascending: false });
  return data ?? [];
});

export type Testimonial = {
  id: string;
  name: string;
  message: string;
  rating: number;
  avatar_url: string | null;
};

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("id, name, message, rating, avatar_url")
    .eq("approved", true)
    .order("created_at", { ascending: false });
  return data ?? [];
});

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_content")
    .select(
      "about_text, hours, phone_1, phone_2, email, website, address_line_1, address_line_2, map_query, instagram_url, facebook_url, whatsapp_number"
    )
    .eq("id", 1)
    .single();
  return data ?? DEFAULT_SITE_CONTENT;
});
