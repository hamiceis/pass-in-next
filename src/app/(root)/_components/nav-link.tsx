"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { ComponentProps } from "react";

interface NavLinkProps extends ComponentProps<"a"> {
  href: string;
  children: string;
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathName = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "font-medium text-sm hover:text-zinc-500 transition-colors duration-200",
        pathName === href || href === "/events" ? "text-zinc-300" : null
      )}
    >
      {children}
    </Link>
  );
}
