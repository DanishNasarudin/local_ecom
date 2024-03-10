import StudioNavbar from "./(studio-components)/StudioNavbar";

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <StudioNavbar />
      <div className="mx-16 my-4 w-full">{children}</div>
    </div>
  );
}
