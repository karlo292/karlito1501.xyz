"use client";
import { siteMetadata } from "@/data/siteMetadata";
import { SOCIALS } from "@/data/socials";
import { SocialLink } from "./social-link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <footer className="mt-16 space-y-6 pb-4">
      <Separator />

      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            © 2026
            <a
              href={"/"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground ml-1 transition-colors"
            >
              Blaze Studios
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
