import { useEffect } from "react";

type EscapeHandler = (event: KeyboardEvent) => void;

/**
 * Calls `handler` whenever the Escape key is pressed.
 * The listener is only active while `enabled` is `true`.
 *
 * @param handler — callback invoked on Escape press
 * @param enabled — whether the listener should be active (default: `true`)
 */
export default function useEscapeKey(
  handler: EscapeHandler,
  enabled: boolean = true,
): void {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handler(event);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handler, enabled]);
}
