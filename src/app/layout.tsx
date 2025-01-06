import { Vazirmatn } from "next/font/google";
import Header from "@/components/layouts/Header/Header";
import "./globals.css";
import { BottomNav } from "@/components/layouts/BottomNav/BottomNav";


const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`bg-bgcolor container ${vazirmatn.className}`}>


        <div className="pt-10 sm:pt-26 pb-22 sm:pb-0 relative !min-h-screen">
          <Header />
          {children}
          <BottomNav />
        </div>


      </body>
    </html>
  );
}
