import {
  ChatBubbleBottomCenterIcon,
  DocumentTextIcon,
  RectangleGroupIcon,
  Squares2X2Icon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarNavs = [
  {
    id: 1,
    title: "داشبورد",
    icon: <RectangleGroupIcon className="h-5 w-5" />,
    href: "/profile",
  },

  {
    id: 2,
    title: "پست ها",
    icon: <DocumentTextIcon className="h-5 w-5" />,
    href: "/profile/posts",
  },
  {
    id: 3,
    title: "نظرات",
    icon: <ChatBubbleBottomCenterIcon className="h-5 w-5" />,
    href: "/profile/comments",
  },
  {
    id: 4,
    title: "دسته بندی ها",
    icon: <Squares2X2Icon className="h-5 w-5" />,
    href: "/profile/categories",
  },
  {
    id: 5,
    title: "کاربران",
    icon: <UsersIcon className="h-5 w-5" />,
    href: "/profile/users",
  },
];

export default function SideBarNavs() {
  const pathname = usePathname();
  return (
    <ul className="space-y-2">
      {sidebarNavs.map((nav) => {
        return (
          <li key={nav.id}>
            <Link
              href={nav.href}
              className={classNames(
                "flex items-center gap-x-2 rounded-2xl px-4 py-3 font-medium text-secondary-700 transition-all duration-200 hover:text-primary-900",
                {
                  "bg-primary-100/40 !font-bold text-primary-900":
                    pathname === nav.href,
                },
              )}
            >
              {nav.icon}
              {nav.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
