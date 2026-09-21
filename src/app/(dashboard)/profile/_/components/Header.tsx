"use client";
import Link from "next/link";
import Avatar from "@/ui/Avatar/Avatar";
import ButtonIcon from "@/ui/ButtonIcon/ButtonIcon";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import SideBar from "./SideBar";
import Drawer from "@/ui/Drawer/Drawer";

function Header() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { user, isLoading } = useAuth();

  return (
    <header
      className={`bg-secondary-0 ${isLoading ? "bg-opacity-30 blur-md" : ""}`}
    >
      <div className="flex items-center justify-between px-4 py-5 lg:px-8">
        <ButtonIcon
          className="block border-none lg:hidden"
          variant="outline"
          aria-expanded={isOpenDrawer}
          aria-label={isOpenDrawer ? "بستن منو" : "باز کردن منو"}
          onClick={() => setIsOpenDrawer(!isOpenDrawer)}
        >
          {isOpenDrawer ? <XMarkIcon /> : <Bars3Icon />}
        </ButtonIcon>
        <span className="text-sm font-bold text-secondary-700 lg:text-lg">
          سلام؛ {user?.name}
        </span>
        <div className="flex items-center gap-x-3">
          <Link href="/profile">
            <Avatar src={user?.avatarUrl} />
          </Link>

          <Drawer
            open={isOpenDrawer}
            onClose={() => setIsOpenDrawer(false)}
          >
            <SideBar onClose={() => setIsOpenDrawer(false)} />
          </Drawer>
        </div>
      </div>
    </header>
  );
}
export default Header;
