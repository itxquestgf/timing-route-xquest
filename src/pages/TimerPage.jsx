import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import Footer from "../components/Footer";

export default function TimerPage() {
  const navigate = useNavigate();

  /* ================= ROUTE INDEX ================= */
  const [index, setIndex] = useState(() => {
    const saved = localStorage.getItem("currentRouteIndex");
    return saved !== null ? Number(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("currentRouteIndex", index);
  }, [index]);

  /* ================= TIMER STATE ================= */
  const [running, setRunning] = useState(() => {
    return localStorage.getItem("timerRunning") === "true";
  });

  const [startTime, setStartTime] = useState(() => {
    const v = localStorage.getItem("timerStart");
    return v ? Number(v) : null;
  });

  const [elapsed, setElapsed] = useState(() => {
    const v = localStorage.getItem("timerElapsed");
    return v ? Number(v) : 0;
  });

  const [displayTime, setDisplayTime] = useState(elapsed);

  /* ================= TICK ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      if (running && startTime) {
        setDisplayTime(elapsed + (Date.now() - startTime));
      } else {
        setDisplayTime(elapsed);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [running, startTime, elapsed]);

  /* ================= PERSIST ================= */
  useEffect(() => {
    localStorage.setItem("timerRunning", running);
    localStorage.setItem("timerElapsed", elapsed);
    if (startTime) {
      localStorage.setItem("timerStart", startTime);
    } else {
      localStorage.removeItem("timerStart");
    }
  }, [running, elapsed, startTime]);

  /* ================= ACTIONS ================= */
  const start = () => {
    setRunning(true);
    setStartTime(Date.now());
  };

  const stopAndNext = () => {
    const total = elapsed + (Date.now() - startTime);

    const prev = JSON.parse(localStorage.getItem("results")) || {};
    prev[index] = total;
    localStorage.setItem("results", JSON.stringify(prev));

    setRunning(false);
    setStartTime(null);
    setElapsed(0);

    if (index < ROUTES.length - 1) {
      setIndex(i => i + 1);
    }
  };

  const reset = () => {
    setRunning(false);
    setStartTime(null);
    setElapsed(0);
  };

  const prevRoute = () => {
    reset();
    if (index > 0) setIndex(i => i - 1);
  };

  const nextRoute = () => {
    reset();
    if (index < ROUTES.length - 1) setIndex(i => i + 1);
  };

  /* ================= FORMAT ================= */
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

      {/* CURRENT ROUTE (STATIC) */}
      <div className="w-full max-w-md text-center text-base font-semibold mb-1">
        {ROUTES[index]}
      </div>

      {/* NEXT ROUTE (FADED) */}
      {ROUTES[index + 1] && (
        <div className="w-full max-w-md text-center text-sm text-gray-400 opacity-60 mb-4">
          Next: {ROUTES[index + 1]}
        </div>
      )}

      {/* TIMER */}
      <div className="text-5xl font-mono my-6">
        {format(displayTime)}
      </div>

      {/* MAIN BUTTON */}
      <button
        onClick={() => (running ? stopAndNext() : start())}
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
        <button onClick={prevRoute}>⬅️</button>
        <button onClick={nextRoute}>➡️</button>
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
