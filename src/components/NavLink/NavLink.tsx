"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinkProps } from "./type";

function NavLink({ path, children }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      className={`block py-2 transition-all ease-out hover:text-secondary-900 ${pathname === path ? "text-primary-900" : ""} `}
      href={path}
    >
      {children}
    </Link>
  );
}

export default NavLink;
