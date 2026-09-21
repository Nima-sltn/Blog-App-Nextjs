import { useEffect } from "react";

/**
 * Locks `<body>` scroll while `locked` is `true`.
 * Saves and restores the previous `overflow` and `paddingRight` styles
 * (padding is adjusted to compensate for the hidden scrollbar and prevent
 * layout shift when the page already has a visible scrollbar).
 *
 * @param locked — whether body scroll should be locked (default: `true`)
 */
export default function useLockBodyScroll(locked: boolean = true): void {
  useEffect(() => {
    if (!locked) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [locked]);
}
