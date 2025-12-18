import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/app/context/themeContext';
import { I18nProvider } from '@/app/components/i18n';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Soulset / Duality - Exploration personnelle',
  description: 'Explorez votre état intérieur et découvrez vos contradictions avec notre plateforme d\'analyse émotionnelle et cognitive.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>
        <I18nProvider>
          <ThemeProvider>
            <Header />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}