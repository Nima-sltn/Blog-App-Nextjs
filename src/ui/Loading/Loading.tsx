"use client";

/**
 * Inline loader used inside submit buttons.
 * Rendered with the app's own `spinner-mini` CSS (dark-mode aware) instead
 * of a third-party loader — the previous one both conflicted with React 19
 * and rendered with `visible={false}` (never actually showed).
 */
function Loading() {
  return (
    <span className="spinner-mini" role="status" aria-label="در حال پردازش" />
  );
}
export default Loading;
