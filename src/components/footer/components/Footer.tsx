"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getRoleBasedFooterSections, bottomLinks } from "../footer.constants";
import { Brand } from "./Brand";

export const Footer = () => {
  const { getUserRole, isAuthenticated } = useAuth();
  const role = getUserRole();

  const activeSections = useMemo(() => {
    return getRoleBasedFooterSections(role, isAuthenticated);
  }, [role, isAuthenticated]);

  return (
    <footer className="bg-[#141414] text-white pt-14 sm:pt-16 md:pt-20 pb-10 border-t border-neutral-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr_1fr] gap-10 lg:gap-8">
          {/* Brand and Description */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1">
            <Brand />
          </div>

          {/* Navigation Columns */}
          {activeSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-sm sm:text-base font-semibold font-work-sans text-white mb-4 tracking-normal">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {section.links.map((link, id) => (
                  <li key={id}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 text-sm font-work-sans transition-colors duration-200 hover:text-[#B89047]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider Line */}
        <div className="border-t border-neutral-800/80 mt-12 sm:mt-16 mb-8" />

        {/* Bottom Copyright & Policy Links */}
        <div className="flex sm:flex-row flex-col items-center justify-between gap-4 text-sm text-neutral-400">
          <div>
            <p className="text-center sm:text-left">
              &copy; 2026 InviteOly. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-6">
            {bottomLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

