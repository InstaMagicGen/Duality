"use client";

type Lang = "fr" | "en" | "ar";

const translations = {
  fr: {
    title: "Choisis ton espace",
    duality: "Dualité",
    dualityDesc: "Explorer tes opposés intérieurs",
    soulset: "Soulset",
    soulsetDesc: "Suivre et comprendre ton état émotionnel",
  },
  en: {
    title: "Choose your space",
    duality: "Duality",
    dualityDesc: "Explore your inner opposites",
    soulset: "Soulset",
    soulsetDesc: "Track and understand your emotional state",
  },
  ar: {
    title: "اختر مساحتك",
    duality: "الازدواجية",
    dualityDesc: "استكشاف التناقضات الداخلية",
    soulset: "سولسِت",
    soulsetDesc: "متابعة وفهم حالتك العاطفية",
  },
};

export default function Page() {
  // 🔹 même langue que le layout (plus tard : context ou store)
  const lang: Lang = "fr";
  const t = translations[lang];

  return (
    <main
      style={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
      }}
    >
      <h2 style={{ fontSize: "24px", fontWeight: "600" }}>
        {t.title}
      </h2>

      {/* CONTAINER DES 2 BOX */}
      <div
        style={{
          display: "flex",
          gap: "32px",
        }}
      >
        {/* DUALITY */}
        <div
          style={{
            width: "260px",
            padding: "24px",
            border: "2px solid gold",
            borderRadius: "12px",
            textAlign: "center",
            background: "#0f172a",
            color: "white",
          }}
        >
          <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>
            {t.duality}
          </h3>
          <p style={{ fontSize: "14px", opacity: 0.85 }}>
            {t.dualityDesc}
          </p>
        </div>

        {/* SOULSET */}
        <div
          style={{
            width: "260px",
            padding: "24px",
            border: "2px solid gold",
            borderRadius: "12px",
            textAlign: "center",
            background: "#020617",
            color: "white",
          }}
        >
          <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>
            {t.soulset}
          </h3>
          <p style={{ fontSize: "14px", opacity: 0.85 }}>
            {t.soulsetDesc}
          </p>
        </div>
      </div>
    </main>
  );
}
