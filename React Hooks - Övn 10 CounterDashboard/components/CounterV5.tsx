// ==========================================
// VARIANT 5: Föräldern styr ALLT (Controlled Component)
// ==========================================
interface CounterV5Props {
  id: number;
  buttonName: string;
  buttonDisabled: boolean;
  currentValue: number;
  onUpdateValue: (id: number, newValue: number) => void;
}

// Barnet är nu "dumt" (stateless). Det har inget eget minne alls.
// Det visar bara det värde föräldern skickar, och ber föräldern att uppdatera när man klickar.
export default function CounterV5({
  id,
  buttonName,
  buttonDisabled,
  currentValue,
  onUpdateValue,
}: CounterV5Props) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-green-800 mb-2">RÄKNARE #{id}</h2>

      <div className="text-3xl font-black text-green-600 mb-4">
        {currentValue}/3
      </div>

      <button
        onClick={() => onUpdateValue(id, currentValue + 1)} // Ber föräldern: "Snälla öka detta värde!"
        className={`w-full font-semibold py-2 px-4 rounded-lg transition-colors ${
          buttonDisabled
            ? "bg-slate-400 text-slate-600 cursor-not-allowed opacity-60"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
        disabled={buttonDisabled}
      >
        {buttonName}
      </button>
    </div>
  );
}
