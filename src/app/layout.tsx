import { Vazirmatn } from "next/font/google";
import Header from "@/components/layouts/Header/Header";
import "./globals.css";
import { BottomNav } from "@/components/layouts/BottomNav/BottomNav";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";
import { authUserWhitToken } from "@/utils/auth";


const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"]
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const token = (await cookies()).get('token')?.value

  const user = await authUserWhitToken(token)


  return (
    <html lang="fa" dir="rtl">
      <body className={`bg-bgcolor container ${vazirmatn.className}`}>


        <div className="pt-10 sm:pt-26 pb-22 sm:pb-0 relative !min-h-screen">
          <Header user={user} />
          {children}
          <BottomNav />
        </div>
        <Toaster />

      </body>
    </html>
  );
}
