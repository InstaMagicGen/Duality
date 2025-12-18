import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { ThemeProvider } from './context/themeContext'
import { I18nProvider } from './components/i18n' // Ajoute cet import

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Soulset',
  description: 'Explorer ton futur et ton état intérieur',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 transition-colors`}>
        <ThemeProvider>
          <I18nProvider> {/* Ajoute ce provider */}
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}