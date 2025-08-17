import vazirFont from "@/constants/localFonts";
import "../styles/globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AuthContext";
import { DarkModeProvider } from "@/context/DarkModeContext";

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
        <Toaster />
        <AuthProvider>
          <DarkModeProvider>{children}</DarkModeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
