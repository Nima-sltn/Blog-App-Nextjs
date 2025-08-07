const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="w-full max-w-md p-2">{children}</div>
    </div>
  );
};

export default layout;
