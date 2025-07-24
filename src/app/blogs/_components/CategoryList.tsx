import Link from "next/link";

export interface Category {
  _id: string;
  title: string;
  slug: string;
  englishTitle: string;
  description: string;
  createdAt: string; // اگر با Date کار می‌کنی می‌تونه Date هم باشه
  updatedAt: string;
  __v: number;
}

const CategoryList = async () => {
  const res = await fetch("http://localhost:5000/api/category/list");
  const {
    data: { categories },
  } = await res.json();
  console.log(categories);

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
