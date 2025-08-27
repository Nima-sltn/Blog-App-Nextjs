import Breadcrumbs from "@/ui/BreadCrumbs/Breadcrumbs";

function CeatePostPage() {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "پست ها", href: "/profile/posts" },
          {
            label: "ایجاد پست",
            href: `/profile/posts/create`,
            active: true,
          },
        ]}
      />
      <h1 className="mb-6 text-2xl font-bold text-secondary-700">
        ایجاد پست جدید
      </h1>
    </div>
  );
}
export default CeatePostPage;
