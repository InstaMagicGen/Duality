export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page non trouvée</h1>
        <p className="text-gray-600 dark:text-gray-300">
          La page que vous cherchez n'existe pas.
        </p>
      </div>
    </div>
  );
}