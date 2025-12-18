import './globals.css';
import Header from './components/Header';

export const metadata = {
  title: 'Soulset Journeys',
  description: 'Elevate your inner vision',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Note : Pour le mode sombre/langue global, on utilise souvent un Provider, 
  // mais restons simple pour l'instant avec la structure.
  return (
    <html lang="fr">
      <body className="bg-black">
        {/* Le Header est maintenant ici, au-dessus de toutes les pages */}
        <Header /> 
        {children}
      </body>
    </html>
  );
}