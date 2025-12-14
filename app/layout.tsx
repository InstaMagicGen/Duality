import "./globals.css";
import { ThemeProvider, useTheme } from "./context/themeContext";

export const metadata = {
  title: "Soulset Duality",
  description: "Application Soulset Duality",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
