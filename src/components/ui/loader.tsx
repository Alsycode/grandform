import Image from "next/image";

export default function Loader() {
  return (
    <div className="relative mx-auto h-16 w-16">
      <Image
        src="/images/logo-icon.webp"
        alt="Loading"
        width={64}
        height={64}
        className="h-full w-full animate-logo-spin object-contain"
      />
    </div>
  );
}
