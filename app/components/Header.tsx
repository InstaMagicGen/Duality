'use client';

type HeaderProps = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  appName: string;
  slogan: string;
};

export default function Header({ theme, toggleTheme, appName, slogan }: HeaderProps) {
  return (
    <header className="header">
      {/* Bouton dark/light à gauche */}
      <button onClick={toggleTheme} className="header-btn theme-btn">
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>

      {/* Titre centré */}
      <div className="header-left flex flex-col items-center justify-center mx-auto">
        <h1 className="header-title">{appName}</h1>
        <p className="header-slogan">{slogan}</p>
      </div>

      {/* Boutons Se connecter / Créer un compte à droite */}
      <div className="flex gap-3">
        <button className="header-btn login-btn">Se connecter</button>
        <button className="header-btn signup-btn">Créer un compte</button>
      </div>
    </header>
  );
}
