import { Suspense } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MenuHighlights from "@/components/MenuHighlights";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import LocationContact from "@/components/LocationContact";
import {
  MenuHighlightsSkeleton,
  GallerySkeleton,
  TestimonialsSkeleton,
  LocationContactSkeleton,
} from "@/components/skeletons";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={<MenuHighlightsSkeleton />}>
        <MenuHighlights />
      </Suspense>
      <Suspense fallback={<GallerySkeleton />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<LocationContactSkeleton />}>
        <LocationContact />
      </Suspense>
    </>
  );
}
