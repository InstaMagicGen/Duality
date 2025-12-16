// app/layout.tsx
import "./globals.css"; // <-- chemin correct
import Link from "next/link";

export const metadata = {
  title: "Duality / Soulset",
  description: "Navigation app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-slate-950 text-white min-h-screen">
        {/* HEADER GLOBAL */}
        <header className="header max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="logo text-2xl font-bold">Duality / Soulset</div>

          <nav className="auth flex gap-3">
            <Link href="/login" className="auth-btn">Login</Link>
            <Link href="/signup" className="auth-btn outline">Sign Up</Link>
          </nav>
        </header>

        {/* CONTENU */}
        {children}
      </body>
    </html>
  );
}
