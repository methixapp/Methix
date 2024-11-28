import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Methix - AI-driven Virtual Manager for Artists',
  description:
    'Empowering independent artists with personalized career guidance and support',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text`}>
        <div className="flex h-screen">

          {/* Main Content */}
          <div className="flex flex-col flex-grow relative">

            {/* Page Content */}
            <main className="flex-grow overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
