import Header from "@/components/Header/Header";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main id="main-content" className="container xl:max-w-screen-xl">
        {children}
      </main>
    </>
  );
};

export default layout;
