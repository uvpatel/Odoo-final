
import { Suspense } from "react";
import Hero from "@/components/shared/Hero";
import { FetureSection } from "@/components/shared/Feature/FetureSection";
import { LoaderOne } from "@/components/ui/loader";
import { Delay } from "@/components/Delay";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <LoaderOne />
        </div>
      }
    >
      <Delay>
        <main>
          <Hero />
          <FetureSection />
        </main>
      </Delay>
    </Suspense>
  );
}