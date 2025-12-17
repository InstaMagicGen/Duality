import Link from "next/link";

export default function SoulsetPage() {
  return (
    <div className="min-h-screen bg-black text-cyan-400 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">SOULSET NAVIGATOR</h1>
      <p className="text-gray-400 mb-8">Module Sunset Therapy en cours de chargement...</p>
      <Link href="/" className="px-6 py-2 border border-cyan-600 rounded-full hover:bg-cyan-900/20">Retour</Link>
    </div>
  );
}