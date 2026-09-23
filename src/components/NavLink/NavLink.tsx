"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinkProps } from "./type";

/**
 * Navigation link that highlights itself when it matches the current route
 * and announces its active state to assistive technology via `aria-current="page"`.
 */
function NavLink({ path, children }: Readonly<NavLinkProps>) {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      className={`block py-2 transition-all ease-out hover:text-secondary-900 ${isActive ? "text-primary-900" : ""} `}
      href={path}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export default NavLink;
