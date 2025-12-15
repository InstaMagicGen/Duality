"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="btn-container">
        <Link href="/duality">
          <button className="btn">Duality</button>
        </Link>
        <Link href="/navigator">
          <button className="btn">Navigator</button>
        </Link>
      </div>
    </div>
  );
}
