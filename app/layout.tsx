import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { twm } from "@/lib/twm";
import { Providers } from "./_context";

import { Toaster } from "@/shadcn/ui/toaster";

import "@/style/global.scss";

const inter = Inter({ subsets: ["latin"] });

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
    <Providers>
      <html lang='en'>
        <body
          className={twm(
            inter.className,
            'BODY flex-col-sbc overflow-clip min-h-screen h-screen'
          )}
        >
          <div className='LAYOUT_INNER overflow-y-scroll h-full w-[var(--layout-width)] flex-tl border-r border-l border-neutral-300 px-md pb-[25vh]'>
            {children}
          </div>
          <Toaster />
        </body>
      </html>
    </Providers>
  )
}
