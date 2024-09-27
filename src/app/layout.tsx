import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen">
      <body className="w-full h-screen flex flex-col items-center overflow-hidden bg-white dark:bg-dark-mode-1-matte-black">
        <Navbar />
        {/* <div className="flex h-full"> */}
          {/* Outer flex container */}
          <div className="h-full w-full flex flex-row justify-center">
            {/* <Navbar /> */}
            {/* Middle component */}
            <div className="h-full xl:w-[1280px] lg:w-[1024px] w-full flex flex-row border-4 justify-center border-yellow-500">
              {/* Left component */}
              <div className="h-full border-4 border-blue-400 lg:w-[256px] hidden xl:block">
                instructions, rules
              </div>

              {/* Main content area */}
              <div className="h-full xl:w-[768px] lg:w-[768px] sm:w-[768px] p-1 border-4 border-green-400">
                {children}
              </div>

              {/* Right component */}
              <div className="h-full border-4 border-red-400 lg:w-[256px] md:flex-none hidden lg:block md:hidden">
                leaderboard, game history
              </div>
            </div>
          </div>
        {/* </div> */}
      </body>
    </html>
  );
}
