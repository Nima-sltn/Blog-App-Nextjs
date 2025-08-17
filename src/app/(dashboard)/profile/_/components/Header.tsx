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
  console.log(user);

  return (
    <header
      className={`bg-secondary-0 ${isLoading ? "bg-opacity-30 blur-md" : ""}`}
    >
      <div className="flex items-center justify-between px-4 py-5 lg:px-8">
        <ButtonIcon
          className="block border-none lg:hidden"
          variant="outline"
          onClick={() => setIsOpenDrawer(!isOpenDrawer)}
        >
          {isOpenDrawer ? <XMarkIcon /> : <Bars3Icon />}
        </ButtonIcon>
        {/* <div className="flex items-center gap-x-3"> */}
        {/* <div className="flex flex-col justify-start gap-x-2 lg:flex-row lg:items-center"> */}
        <span className="text-sm font-bold text-secondary-700 lg:text-lg">
          سلام؛ {user?.name}
        </span>
        {/* </div> */}
        {/* </div> */}
        <div className="flex items-center gap-x-3">
          <Link href="/profile">
            {/* <ButtonIcon
              variant="outline"
              className={`border-secondaray-200 flex cursor-pointer items-center justify-center rounded-2xl`}
            > */}
            <Avatar src={user?.avatarUrl} />
            {/* </ButtonIcon> */}

            <Drawer open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
              <SideBar onClose={() => setIsOpenDrawer(false)} />
            </Drawer>
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
