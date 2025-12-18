'use client';
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center pt-24 pb-12 px-6">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-stretch justify-center gap-8">
        
        {/* DUALITY */}
        <div className="flex-1 bg-[#050505] border border-yellow-500/30 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-[0_0_50px_-15px_rgba(234,179,8,0.3)]">
          <div>
            <h2 className="text-4xl font-black text-yellow-500 mb-6 italic tracking-tighter">DUALITY</h2>
            <p className="text-gray-400 text-lg leading-relaxed">Prédisez votre futur et dialoguez avec votre conscience profonde.</p>
          </div>
          <Link href="/duality" className="mt-12">
            <button className="w-full py-4 bg-yellow-500 text-black rounded-2xl font-black uppercase tracking-widest text-xs">Ouvrir Duality ↗</button>
          </Link>
        </div>

        {/* SOULSET */}
        <div className="flex-1 bg-[#050505] border border-cyan-500/30 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-[0_0_50px_-15px_rgba(6,182,212,0.3)]">
          <div>
            <h2 className="text-4xl font-black text-cyan-400 mb-6 italic tracking-tighter">SOULSET</h2>
            <p className="text-gray-400 text-lg leading-relaxed">Thérapie immersive par le coucher de soleil et scan émotionnel.</p>
          </div>
          <Link href="/soulset" className="mt-12">
            <button className="w-full py-4 bg-cyan-400 text-black rounded-2xl font-black uppercase tracking-widest text-xs">Commencer ↗</button>
          </Link>
        </div>

      </div>

      <button className="mt-16 px-12 py-5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-black text-lg uppercase tracking-tighter">
        Quel est ton mood ?
      </button>
    </main>
  );
}