import Link from "next/link";

export default function DualityPage() {
  return (
    <div className="min-h-screen bg-black text-yellow-400 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">DUALITY MODULE</h1>
      <p className="text-gray-400 mb-8">Interface d'analyse en cours de développement...</p>
      <Link href="/" className="px-6 py-2 border border-yellow-600 rounded-full hover:bg-yellow-900/20">Retour</Link>
    </div>
  );
}