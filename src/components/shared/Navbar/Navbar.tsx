"use client";
import CardNav from "@/components/CardNav";

import type { CardNavItem } from "@/types/navigation";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export const Navbar = () => {
  const navitems: CardNavItem[] = [
    {
      label: "About",
      bgColor: "#0A031E",
      textColor: "#fff",
      links: [
        {
          label: "Company",
          ariaLabel: "About Company",
          href: "/about/company",
        },
        {
          label: "Careers",
          ariaLabel: "About Careers",
          href: "/about/careers",
        },
      ],
    },
    {
      label: "Authentication",
      bgColor: "#0A031E",
      textColor: "#fff",
      links: [
        {
          label: "Sign In",
          ariaLabel: "Sign In",
          href: "/sign-in",
        },
        {
          label: "Sign Up",
          ariaLabel: "Sign Up",
          href: "/sign-up",
        },
      ],
    },
    {
      label: "Fetures",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        {
          label: "Company",
          ariaLabel: "About Company",
          href: "/about/company",
        },
        {
          label: "Careers",
          ariaLabel: "About Careers",
          href: "/about/careers",
        },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        {
          label: "Featured",
          ariaLabel: "Featured Projects",
          href: "/projects/featured",
        },
        {
          label: "Case Studies",
          ariaLabel: "Project Case Studies",
          href: "/projects/case-studies",
        },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        {
          label: "Featured",
          ariaLabel: "Featured Projects",
          href: "/projects/featured",
        },
        {
          label: "Case Studies",
          ariaLabel: "Project Case Studies",
          href: "/projects/case-studies",
        },
      ],
    },
  ];

  return (
    <nav
      className="sticky top-0 z-50 bg-background/80  backdrop-blur-xl
    supports-backdrop-filter:bg-background/60
    border-b border-white/10
    "
    >
      
        <CardNav
          logo="/logo.svg"
          logoAlt="Company Logo"
          items={navitems}
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
        />
      
    </nav>
  );
};
