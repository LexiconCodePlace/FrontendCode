// ==========================================
// HUVUDKOMPONENT (FÖRÄLDERN)

import { useState } from "react";
import CounterV5 from "./components/CounterV5";
import Collector from "./components/Collector";

interface ICounter {
  id: number;
  count: number;
}

export default function App() {
  const [counters, setCounters] = useState<ICounter[]>([
    { id: 1, count: 0 },
    { id: 2, count: 0 },
    { id: 3, count: 0 },
    { id: 4, count: 0 },
  ]);

  const [progressCount, setProgressCount] = useState(0);
  const [masterCount, setMasterCount] = useState(0);

  const increaseCounter = (id: number, value: number) => {
    const newCountersList: ICounter[] = [...counters];
    const counter: ICounter = newCountersList.filter((c) => c.id === id)[0];
    counter.count = value;

    const totalCount: number = newCountersList.reduce(
      (total, c) => total + c.count,
      0,
    );

    if (totalCount === 10) {
      newCountersList.forEach((counter: ICounter) => {
        counter.count = 0;
      });
      setProgressCount(0);
      setMasterCount(masterCount + 1);
    } else {
      setProgressCount(totalCount);
    }

    setCounters(newCountersList);
  };

  const resetAllValues = () => {
    const newCountersList: ICounter[] = [...counters];
    newCountersList.forEach((counter: ICounter) => {
      counter.count = 0;
    });

    setProgressCount(0);
    setMasterCount(0);
    setCounters(newCountersList);
  };

  return (
    <div className="min-h-screen bg-slate-800 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* <header className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Props & Callbacks: I 4 Steg
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Här ser vi hur kommunikationen mellan en förälder (denna gråa
            bakgrund) och dess barn (de vita korten) kan se ut.
          </p>
        </header> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8"></div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-400 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 text-left">
              <h3 className="text-gray-400 font-semibold tracking-wider text-sm">
                Målprogress (Aktuell summa)
              </h3>
            </div>

            <div className="space-y-2 text-right">
              <h3 className="text-green-400 font-semibold tracking-wider text-sm">
                {progressCount} / 10
              </h3>
            </div>
          </div>

          <progress
            className="w-full h-2 bg-gray-300"
            value={progressCount}
            max="10"
          ></progress>
        </div>

        <Collector value={masterCount} />
        <div className="mt-10 bg-slate-800 text-white p-8 rounded-2xl shadow-lg">
          {/* <h2 className="text-2xl font-bold mb-6 text-slate-200 border-b border-slate-700 pb-4">
            Förälderns State (App.tsx)
          </h2> */}
          <button
            onClick={() => resetAllValues()}
            className="w-full font-semibold py-2 px-4 rounded-lg transition-colors bg-purple-600 hover:bg-purple-700 text-white"
          >
            Nollställ allt
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {counters.map((counter) => (
            <CounterV5
              key={counter.id}
              id={counter.id}
              buttonName={counter.count > 2 ? "Max nått!" : "Öka värde"}
              buttonDisabled={counter.count > 2}
              currentValue={counter.count}
              onUpdateValue={(id, val) => increaseCounter(id, val)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
