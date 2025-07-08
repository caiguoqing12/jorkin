import LeftMenu from "@/component/LeftMenu";
import Header from "@/component/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex gap-4 container mx-auto mt-4">
        <LeftMenu />
        <div className="bg-white flex-1 p-8 rounded-2xl">{children}</div>
      </div>
    </>
  );
}
