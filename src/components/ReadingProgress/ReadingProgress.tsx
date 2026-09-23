"use client";

import { useEffect, useState } from "react";

/**
 * Thin reading-progress bar shown at the top of a post.
 *
 * Fills from the right (RTL) as the reader scrolls through the document and
 * exposes its value via `role="progressbar"` for assistive technology. Uses
 * `requestAnimationFrame`-throttled scroll events to stay jank-free.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    function measure() {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const next = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, next)));
      frame = 0;
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(measure);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    measure();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-20 h-1 bg-secondary-200"
      role="progressbar"
      aria-label="پیشرفت خواندن"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      dir="rtl"
    >
      <div
        className="h-full bg-primary-900 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
