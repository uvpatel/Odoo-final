"use client";
import { LoaderOne } from "@/components/ui/loader";

export default function Loading() {
    return (
        <div className="overflow-hidden flex h-screen w-screen items-center justify-center transition-opacity duration-500 opacity-0">
            <LoaderOne />
        </div>
    );
}