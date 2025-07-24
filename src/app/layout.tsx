import vazirFont from "@/constants/localFonts";
import "../styles/globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: {
    template: "%s | بلاگ اپ",
    default: "بلاگ اپ",
  },
  description: "وب اپلیکیشن مدیریت بلاگ ها و نظرات کاربران",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} min-h-screen font-sans`}>
        <Header />
        <div className="container xl:max-w-screen-xl"> {children}</div>
      </body>
    </html>
  );
}
