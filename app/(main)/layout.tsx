import LeftMenu from '@/component/LeftMenu';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-4 container mx-auto mt-4">
      <LeftMenu />
      <div className="bg-white flex-1 p-8 rounded-2xl">{children}</div>
    </div>
  );
}
