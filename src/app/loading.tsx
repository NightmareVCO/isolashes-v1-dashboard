import LashesLogo from "@ui/icons/LashesLogo";

export default function Loading() {
  return (
    <section className="relative h-screen">
      <div className="absolute transform -translate-x-1/2 -translate-y-full top-1/2 left-1/2">
        <LashesLogo className="size-48 fill-primary animate-pulse" />
      </div>
    </section>
  );
}
