import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import Footer from "../components/Footer";

export default function TimerPage() {
  const [index, setIndex] = useState(() => {
  const saved = localStorage.getItem("currentRouteIndex");
  return saved !== null ? Number(saved) : 0;
});

  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0); // milliseconds
  const navigate = useNavigate();
  

  useEffect(() => {
  localStorage.setItem("currentRouteIndex", index);
}, [index]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setTime(t => t + 10);
    }, 10);
    return () => clearInterval(interval);
  }, [running]);

  const saveAndNext = () => {
    const prev = JSON.parse(localStorage.getItem("results")) || {};
    const updated = { ...prev, [index]: time };
    localStorage.setItem("results", JSON.stringify(updated));

    setRunning(false);
    setTime(0);

    if (index < ROUTES.length - 1) {
      setIndex(i => i + 1);
    }
  };

  const reset = () => {
    setRunning(false);
    setTime(0);
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">

      {/* INDEX */}
      <div className="text-gray-400 mb-2">
        {index + 1} / {ROUTES.length}
      </div>

      {/* TITLE (FIXED HEIGHT + MARQUEE) */}
      <div className="route-title-wrapper">
        <div className="route-title">
          {ROUTES[index]}
        </div>
      </div>

      {/* TIMER */}
      <div className="text-5xl font-mono my-6">
        {format(time)}
      </div>

      {/* MAIN BUTTON */}
      <button
        onClick={() => (running ? saveAndNext() : setRunning(true))}
        className="bg-green-600 px-8 py-4 rounded-xl text-xl font-bold mb-3"
      >
        {running ? "STOP & NEXT" : "START"}
      </button>

      {/* RESET */}
      <button
        onClick={reset}
        className="bg-red-600 px-6 py-2 rounded-lg mb-6"
      >
        RESET
      </button>

      {/* NAV */}
      <div className="flex gap-8 text-3xl mb-6">
        <button onClick={prev}>⬅️</button>
        <button onClick={next}>➡️</button>
      </div>

      {/* RESULT */}
      <button
        onClick={() => navigate("/result")}
        className="underline text-gray-300"
      >
        Lihat Result
      </button>

      <Footer />
    </div>
  );
}
