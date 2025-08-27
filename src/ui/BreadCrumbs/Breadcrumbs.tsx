import Link from "next/link";

export interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  readonly breadcrumbs: Breadcrumb[];
}

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 block">
      <ol className="flex gap-x-2 text-lg">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active ? "page" : undefined}
            className={`${
              breadcrumb.active ? "text-secondary-700" : "text-secondary-500"
            } flex gap-x-2`}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 && (
              <span className="inline-block">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
