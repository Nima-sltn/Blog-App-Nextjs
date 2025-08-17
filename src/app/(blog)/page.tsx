import Button from "@/ui/Button/Button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "خانه | بلاگ اپ",
};

export default function Home() {
  return (
    <>
      <h1 className="my-20 text-center text-2xl font-bold text-secondary-800 md:text-5xl">
        اپلیکیشن مدیریت بلاگ
      </h1>

      <div>
        <p className="text-center text-lg leading-loose text-secondary-500">
          جایی که قراره بتونی یه اپلیکیشن بلاگ کامل رو مدیریت کنی!
          <br /> بتونی بلاگ بسازی - کامنت بگذاری و در پنلت همه اتفاقات رو رصد
          کنی!
        </p>
        <div className="mt-10 flex w-full justify-center gap-x-8">
          <Button variant="outline">
            <Link href="/blogs">مطالعه بلاگ ها</Link>
          </Button>
          <Button variant="primary">
            <Link href="/profile">مدیریت بلاگ ها</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
