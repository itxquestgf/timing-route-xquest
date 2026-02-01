import { ROUTES } from "../routes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";

export default function ResultPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState(
    () => JSON.parse(localStorage.getItem("results")) || {}
  );

  const format = ms => {
    if (ms == null) return "-";
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const d = Math.floor((ms % 1000) / 10);
    return `${String(m).padStart(2, "0")}.${String(s).padStart(2, "0")}.${String(d).padStart(2, "0")}`;
  };

  const deleteOne = index => {
    const updated = { ...results };
    delete updated[index];
    setResults(updated);
    localStorage.setItem("results", JSON.stringify(updated));
  };

  const resetAll = () => {
    localStorage.removeItem("results");
    setResults({});
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Hasil Timing</h1>

      <ul className="space-y-2">
        {ROUTES.map((r, i) => (
          <li
            key={i}
            className="flex justify-between items-center bg-gray-800 p-3 rounded"
          >
            <span className="w-4/5">
              {i + 1}. {r}
            </span>

            <div className="flex items-center gap-3">
              <span className="font-mono">
                {format(results[i])}
              </span>
              <button
                onClick={() => deleteOne(i)}
                className="text-red-400 hover:text-red-600"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate("/")}
          className="underline"
        >
          ⬅️ Kembali
        </button>

        <button
          onClick={resetAll}
          className="bg-red-600 px-4 py-2 rounded"
        >
          RESET ALL
        </button>
        <Footer />
      </div>
    </div>
  );
}
