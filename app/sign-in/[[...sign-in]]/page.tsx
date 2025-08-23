import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="pb-24 pt-32 sm:pt-40 min-h-screen flex items-center justify-center">
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm" />

      <div className="relative z-10 container flex max-w-5xl items-center justify-center">
        <div className="rounded-2xl bg-white/80 backdrop-blur-md p-8 shadow-lg">
          <SignIn />
        </div>
      </div>
    </section>
  );
}
