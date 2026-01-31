"use client";

import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { HeroButton } from "./herobutton";
import TextType from "../TextType";
import BlurText from "../BlurText";

export default function Hero() {
    return (
        <section className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
            <BackgroundRippleEffect />
            <div className="mt-60 w-full">
                <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
                    <BlurText
                        text="Shiv Furniture "
                        direction="bottom"
                        className="text-3xl flex justify-center font-extrabold md:text-2xl lg:text-5xl"
                    />
                </h2 >
                <p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
                   write dummy content
                </p>
                
            <div className="relative flex justify-center items-center">

                <HeroButton />
            </div>
            </div>
        </section>

    );
}
