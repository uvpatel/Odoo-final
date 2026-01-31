"use client"

import { NoiseBackground } from "@/components/ui/noise-background"
import { Link } from "next-view-transitions"
import { useRouter } from "next/navigation"

export function HeroButton() {
  const router = useRouter()

  return (
    <div className="flex justify-center m-2 z-200 cusor-pointer">
      <NoiseBackground
        containerClassName="w-fit p-2 rounded-full mx-auto"
        gradientColors={[
          "rgb(255, 100, 150)",
          "rgb(100, 150, 255)",
          "rgb(255, 200, 100)",
        ]}
      >
        <div className="pointer-events-auto relative z-100 cursor-pointer">
          <Link href="/dashboard">
          <button
            onClick={() => router.push("/dashboard")}
            className="cursor-pointer rounded-full bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black transition-all active:scale-95 dark:bg-black dark:text-white"
            >
            Dashboard →
          </button>
            </Link>
        </div>
      </NoiseBackground>
    </div>
  )
}
