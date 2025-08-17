const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function HeaderSkeleton() {
  return (
    <div
      className={`${shimmer} flex items-center justify-between rounded-xl bg-secondary-0 px-4 py-5 lg:px-8`}
    >
      <div className="h-6 w-36 rounded-lg bg-secondary-200" />
      <div className="ml-2 h-6 w-6 rounded-full bg-secondary-200"></div>
    </div>
  );
}
