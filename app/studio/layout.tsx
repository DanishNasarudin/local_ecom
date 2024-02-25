import StudioNavbar from "./(studio-components)/StudioNavbar";

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StudioNavbar />
      {children}
    </>
  );
}
