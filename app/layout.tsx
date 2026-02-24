import type {Metadata} from 'next';
import {Poppins, Open_Sans} from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['400', '600', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: 'KachraCash - Turn Waste into Wallet',
  description: 'A marketplace connecting citizens with local scrap collectors.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable}`}>
      <body className="font-sans bg-[#FEF3C7] text-[#1F2937] antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
