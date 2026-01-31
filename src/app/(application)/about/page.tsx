
import { AboutHero } from "@/components/shared/About-Page/AboutHero"
import { LoaderOne } from "@/components/ui/loader";
import { Delay } from "@/components/Delay";
import { Suspense } from "react";
const  aboutpage = () => {
    return (
        <main>
            <Suspense
                fallback={
                    <div className="flex h-screen items-center justify-center">
                        <LoaderOne />
                    </div>
                }
            >
                <Delay>
                    <AboutHero />
                </Delay>
            </Suspense>
        </main>
    )
}

export default aboutpage
