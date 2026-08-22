import { getTestimonials } from "@/lib/data";
import { TestimonialCarousel } from "@/components/ui/testimonial";

const AVATARS = [
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?q=80&w=200&h=200&auto=format&fit=crop",
];

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  if (testimonials.length === 0) return null;

  const carouselData = testimonials.map((t, i) => ({
    id: t.id,
    name: t.name,
    avatar: t.avatar_url || AVATARS[i % AVATARS.length],
    description: t.message,
  }));

  return (
    <section id="testimonials" className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 text-center lg:px-10">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gold/60" />
          <p className="text-sm font-semibold tracking-[0.25em] text-maroon">
            TESTIMONIALS
          </p>
          <span className="h-px w-10 bg-gold/60" />
        </div>
        <h2 className="mt-3 font-display text-4xl font-bold text-maroon sm:text-5xl">
          What Our Guests Say
        </h2>
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-gold/40" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-16 bg-gold/40" />
        </div>

        <div className="pt-8 pb-4">
          <TestimonialCarousel
            testimonials={carouselData}
            className="mx-auto h-80 max-w-2xl"
          />
        </div>

        <div className="mx-auto mt-8 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-gold/40" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-16 bg-gold/40" />
        </div>
      </div>
    </section>
  );
}
