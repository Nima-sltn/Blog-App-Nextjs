"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { createPortal } from "react-dom";

import useEscapeKey from "@/hook/useEscapeKey";
import useLockBodyScroll from "@/hook/useLockBodyScroll";

interface DrawerProps {
  /** Whether the drawer is visible. */
  readonly open: boolean;

  /** Called when the user dismisses the drawer (overlay click or Escape). */
  readonly onClose: () => void;

  /** Drawer content. */
  readonly children: ReactNode;
}

/**
 * Slide-in panel rendered through a portal on top of the page.
 *
 * Accessibility:
 * - Uses a native <dialog> element.
 * - Escape closes the drawer.
 * - Focus is restored to the previously focused element when closed.
 * - Body scrolling is locked while the drawer is open.
 */
const Drawer = ({ open, onClose, children }: DrawerProps) => {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape.
  useEscapeKey((event) => {
    event.preventDefault();
    onClose();
  }, open);

  // Lock body scroll while the drawer is open.
  useLockBodyScroll(open);

  // Manage dialog visibility and focus.
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;

      if (!dialog.open) {
        dialog.showModal();
      }

      dialog.querySelector<HTMLElement>("button")?.focus();
    } else if (dialog.open) {
      dialog.close();

      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    }
  }, [open]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-label="منوی کناری"
      className={`fixed right-0 top-0 z-50 m-0 h-full max-h-full w-[250px] max-w-full translate-x-0 border-none bg-transparent p-0 shadow-none transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="h-full max-h-full overflow-y-auto bg-secondary-0">
        {children}
      </div>
    </dialog>,
    document.body,
  );
};

export default Drawer;
