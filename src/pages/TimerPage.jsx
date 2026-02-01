import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import Footer from "../components/Footer";

export default function TimerPage() {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0); // milliseconds
  const [results, setResults] = useState(
    () => JSON.parse(localStorage.getItem("results")) || {}
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => {
      setTime(t => t + 10);
    }, 10);
    return () => clearInterval(i);
  }, [running]);

  const saveAndNext = () => {
    setResults(r => {
      const updated = { ...r, [index]: time };
      localStorage.setItem("results", JSON.stringify(updated));
      return updated;
    });

    setTime(0);
    setRunning(false);
    if (index < ROUTES.length - 1) {
      setIndex(i => i + 1);
    }
  };

  const reset = () => {
    setTime(0);
    setRunning(false);
  };

  const prev = () => {
    reset();
    if (index > 0) setIndex(i => i - 1);
  };

  const next = () => {
    reset();
    if (index < ROUTES.length - 1) setIndex(i => i + 1);
  };

  const format = ms => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const d = Math.floor((ms % 1000) / 10);
    return `${String(m).padStart(2, "0")}.${String(s).padStart(2, "0")}.${String(d).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h2 className="text-gray-400 mb-2">
        {index + 1} / {ROUTES.length}
      </h2>

      <h1 className="text-2xl font-bold text-center mb-6">
        {ROUTES[index]}
      </h1>

      <div className="text-6xl font-mono mb-6">
        {format(time)}
      </div>

      <button
        onClick={() => {
          if (running) saveAndNext();
          else setRunning(true);
        }}
        className="bg-green-600 px-8 py-4 rounded-xl text-xl font-bold mb-3"
      >
        {running ? "STOP & NEXT" : "START"}
      </button>

      <button
        onClick={reset}
        className="bg-red-600 px-6 py-2 rounded-lg mb-6"
      >
        RESET
      </button>

      <div className="flex gap-6">
        <button onClick={prev} className="text-3xl">⬅️</button>
        <button onClick={next} className="text-3xl">➡️</button>
      </div>

      <button
        onClick={() => navigate("/result")}
        className="mt-6 underline text-gray-300"
      >
        Lihat Result
      </button>
      <Footer />
    </div>
  );
}
