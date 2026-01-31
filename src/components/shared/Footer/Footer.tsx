"use client";

import { Hexagon } from "lucide-react";
import Link from "next/link";

function Footer() {
  const Productlink = [
    {
      title: "Features",
      href: "#Features",
    },
    {
      title: "Pricing",
      href: "#Pricing",
    },
    {
      title: "Changelog",
      href: "#Changelog"
    },
    {
        title: "Docs",
        href: "#Docs"
    },
  ];
  
  const Companylink = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Careers",
      href: "#Careers",
    },
    {
      title: "Legal",
      href: "#Legal",
    },
    {
      title: "Contact",
      href: "#Contact",
    },
    
  ];

  const legelLink = [
    {
      title: "Privacy Policy",
        href: "#PrivacyPolicy",
    },
    {
      title: "Terms of Service",
        href: "#TermsOfService",
    },
  ];


  return (
    <footer className="mx-auto   border-t py-14 px-35 bg-muted/20 mt-12 p-10">
      <div className="container grid md:grid-cols-4 gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Hexagon className="h-5 w-5 fill-current" />
            </div>
            Dayflow
          </div>
          <p className="text-sm text-muted-foreground">
            Making work flow better <br /> for everyone, everywhere.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground ">

            {Productlink.map((item) => (
                <li key={item.title} className="hover:text-neutral-700"><Link href={item.href}>{item.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {Companylink.map((item) => (
                <li key={item.title} className="hover:text-neutral-700"><Link href={item.href}>{item.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {legelLink.map((item) => (
                <li key={item.title} className="hover:text-neutral-700"><Link href={item.href}>{item.title}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Dayflow Inc. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
