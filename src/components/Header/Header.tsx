"use client";
import { useAuth } from "@/context/AuthContext";
import NavLink from "../NavLink/NavLink";

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
      className={`sticky top-0 z-10 mb-10 border-b border-b-secondary-300 bg-inherit shadow-md transition-all duration-200 ${isLoading && "opacity-80 blur-sm"}`}
    >
      <nav className="container xl:max-w-screen-xl">
        <ul className="flex items-center justify-between py-2 text-secondary-400">
          <div className="flex items-center gap-x-10">
            {navLinks.map((navLink) => {
              return (
                <li key={navLink.id}>
                  <NavLink path={navLink.path}>{navLink.children}</NavLink>
                </li>
              );
            })}
          </div>
          <li>
            {user ? (
              <NavLink path="/profile">پروفایل</NavLink>
            ) : (
              <NavLink path="/signin">ورود</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
