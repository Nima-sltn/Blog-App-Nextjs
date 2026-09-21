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
 * - The backdrop is a native `<button>` so it is fully keyboard- and
 *   screen-reader-accessible (no click-only div with a fake role).
 * - Escape closes the drawer and focus is restored to the previously
 *   focused element.
 * - Body scrolling is locked while the drawer is open.
 * - The dialog is hidden from the accessibility tree (`aria-hidden`,
 *   `inert`) when closed so its content cannot be tabbed into.
 */
const Drawer = ({ open, onClose, children }: DrawerProps) => {
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape.
  useEscapeKey(
    (event) => {
      event.preventDefault();
      onClose();
    },
    open,
  );

  // Lock body scroll while the drawer is open.
  useLockBodyScroll(open);

  // Focus management: move focus into the close button when the drawer
  // opens and restore it when it closes.
  useEffect(() => {
    if (open) {
      previousFocusRef.current =
        document.activeElement as HTMLElement | null;
      closeButtonRef.current?.focus();
    } else {
      previousFocusRef.current?.focus?.();
      previousFocusRef.current = null;
    }
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop: a real <button> so pointer, keyboard and screen-reader
          users can all dismiss the drawer. */}
      <button
        type="button"
        aria-label="بستن"
        ref={closeButtonRef}
        onClick={onClose}
        className={`fixed inset-0 z-40 h-screen w-full cursor-default bg-secondary-800 bg-opacity-30 backdrop-blur-sm duration-200 ease-in-out ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        tabIndex={open ? 0 : -1}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        inert={!open}
        className={`fixed right-0 top-0 z-40 h-full w-[250px] transform transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="max-h-full overflow-y-auto bg-secondary-0">
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
};

export default Drawer;
