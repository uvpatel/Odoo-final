"use client";
import { cn } from "@/lib/utils";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconUser,
    IconChartBar,
    IconShieldCheck,
    IconZeppelin
} from "@tabler/icons-react";



export function FetureSection() {
    return (
        <section>

            <p className="relative z-10 mx-auto m-4 p-2 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
                Everything you need to run your team.
                Stop juggling spreadsheets and disparate tools. Dayflow brings everything into one unified operating system.
            </p>
            <BentoGrid className="max-w-4xl mx-auto">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        icon={item.icon}
                        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                    />
                ))}
            </BentoGrid>
        </section>
    );
}
const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-24 rounded-xl bg-linear-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">

    </div>
);
const items = [
    {
        title: "The Dawn of Innovation",
        description: "Team Management Onboard, manage, and offboard employees with automated workflows and self-serve profiles.",
        header: <Skeleton />,
        icon: <IconUser className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Digital Revolution",
        description: "Dive into the transformative power of technology.",
        header: <Skeleton />,
        icon: <IconZeppelin className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Smart Payroll",
        description: "Automate salary calculations, tax deductions, and payslip generation with zero errors.",
        header: <Skeleton />,
        icon: <IconChartBar className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Bank-Grade Security",
        description: "Your data is encrypted at rest and in transit. Role-based access control keeps sensitive info safe.",
        header: <Skeleton />,
        icon: < IconShieldCheck className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Instant Actions",
        description: "Approve leaves, mark attendance, and generate reports in milliseconds.",
        header: <Skeleton />,
        icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Compliance Ready",
        description: "Stay compliant with local labor laws automatically. We handle the complexity for you.",
        header: <Skeleton />,
        icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Modern Design",
        description: "Embark on exciting journeys and thrilling discoveries.",
        header: <Skeleton />,
        icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
];
