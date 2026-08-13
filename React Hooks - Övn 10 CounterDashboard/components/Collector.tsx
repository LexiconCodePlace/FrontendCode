import { useState } from "react";

// ==========================================
// VARIANT 2: Förälder skickar knappnamn (Props)
// ==========================================
interface CollectorProps {
  value: number;
}

// Föräldern skickar in texten på knappen (Data flödar NEDÅT).
// Barnet hanterar fortfarande sitt eget värde.
export default function Collector({ value }: CollectorProps) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-green-400 shadow-sm">
      <h3 className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">
        SAMLAREN
      </h3>
      <div className="text-4xl font-black text-white mb-4 slashed-zero">
        <p className="slashed-zero">{value}</p>
      </div>
      <p className="text-sm text-slate-500 mb-4 h-10">
        Totala poäng insamlade (Mål: 10)
      </p>
    </div>
  );
}
