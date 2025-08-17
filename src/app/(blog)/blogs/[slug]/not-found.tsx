"use client";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function NotFound() {
  return (
    <div className="h-screen">
      <div className="container xl:max-w-screen-xl">
        <div className="flex justify-center pt-10">
          <div>
            <h1 className="mb-8 text-xl font-bold text-red-600">
              هیچ پستی با این مشخصات یافت نشد
            </h1>
            <Link
              href="/blogs"
              className="flex items-center gap-x-2 text-secondary-500"
            >
              <ArrowRightIcon className="h-6 w-6 text-secondary-500" />
              رفتن به همه پست ها
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
