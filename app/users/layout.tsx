
export default function UsersLayout({
  children, ...rest
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col">
      {children}
    </section>
  );
}
