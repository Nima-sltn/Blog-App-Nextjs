import Link from "next/link";

export interface Category {
  _id: string;
  title: string;
  slug: string;
  englishTitle: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const CategoryList = async () => {
  // Best-effort: the sidebar degrades to "no categories" rather than crashing
  // the whole blog list when the API is briefly unavailable.
  let categories: Category[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/list`, {
      cache: "force-cache",
    });
    if (res.ok) {
      const body: { data?: { categories?: Category[] } } = await res.json();
      categories = body.data?.categories ?? [];
    }
  } catch {
    categories = [];
  }

  if (categories.length === 0) return null;

  return (
    <ul className="space-y-4">
      <Link href={`/blogs/`}>همه</Link>
      {categories.map((category) => {
        return (
          <li key={category._id}>
            <Link href={`/blogs/category/${category.slug}`}>
              {category.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryList;
