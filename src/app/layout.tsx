import vazirFont from "@/constants/localFonts";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AuthContext";
import { DarkModeProvider } from "@/context/DarkModeContext";
import CommandPalette from "@/components/CommandPalette/CommandPalette";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    template: "%s | بلاگ اپ",
    default: "بلاگ اپ",
  },
  description: "وب اپلیکیشن مدیریت بلاگ ها و نظرات کاربران",
  keywords: ["بلاگ", "وبلاگ", "مدیریت محتوا", "نظرات کاربران", "Next.js"],
  openGraph: {
    siteName: "بلاگ اپ",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem("isDarkMode");
                  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  const isDark = stored ? JSON.parse(stored) : prefersDark;
                  document.documentElement.classList.add(isDark ? "dark-mode" : "light-mode");
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${vazirFont.variable} min-h-screen font-sans`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:right-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-primary-900 focus:px-4 focus:py-2 focus:text-primary-100"
        >
          پرش به محتوای اصلی
        </a>
        <Toaster />
        <AuthProvider>
          <DarkModeProvider>
            {children}
            <CommandPalette />
          </DarkModeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
