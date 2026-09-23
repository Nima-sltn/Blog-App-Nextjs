"use client";

import { useAuth } from "@/context/AuthContext";

import NavLink from "../NavLink/NavLink";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const navLinks = [
  {
    id: 1,
    children: "خانه",
    path: "/",
  },
  {
    id: 2,
    children: "بلاگ ها",
    path: "/blogs",
  },
];

function Header() {
  const { user, isLoading } = useAuth();

  return (
    <header
      className={`sticky top-0 z-10 mb-10 border-b border-b-secondary-300 bg-inherit shadow-md transition-all duration-200 ${
        isLoading && "opacity-80 blur-sm"
      }`}
    >
      <nav aria-label="منوی اصلی" className="container xl:max-w-screen-xl">
        <ul className="flex items-center justify-between py-2 text-secondary-400">
          <li>
            <ul className="flex items-center gap-x-10">
              {navLinks.map((navLink) => (
                <li key={navLink.id}>
                  <NavLink path={navLink.path}>{navLink.children}</NavLink>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <ul className="flex items-center gap-4">
              <li>
                {user ? (
                  <NavLink path="/profile">پروفایل</NavLink>
                ) : (
                  <NavLink path="/signin">ورود</NavLink>
                )}
              </li>

              <li className="flex">
                <button
                  type="button"
                  onClick={() =>
                    document.dispatchEvent(
                      new KeyboardEvent("keydown", {
                        key: "k",
                        metaKey: true,
                      }),
                    )
                  }
                  aria-label="باز کردن جستجوی سریع (کلید میانبر Command+K)"
                  className="flex items-center gap-1 rounded-md border border-secondary-300 px-2 py-1 text-secondary-400 transition-all hover:text-primary-900"
                >
                  <MagnifyingGlassIcon className="h-4 w-4" />
                  <kbd className="hidden text-[10px] sm:block">⌘K</kbd>
                </button>
              </li>

              <li className="flex">
                <DarkModeToggle />
              </li>

              {/* <li className="flex">
                <Logout />
              </li> */}
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
