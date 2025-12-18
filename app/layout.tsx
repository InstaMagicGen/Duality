import './globals.css';
import Header from './components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-black">
        <Header /> 
        {children}
      </body>
    </html>
  );
}