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
  // await new Promise((res) => setTimeout(res, 2000));

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/list`);
  const {
    data: { categories },
  } = await res.json();

  return (
    <ul className="space-y-4">
      <Link href={`/blogs/`}>همه</Link>
      {categories.map((category: Category) => {
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
