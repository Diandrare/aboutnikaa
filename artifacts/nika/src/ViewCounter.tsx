import { useState, useEffect } from "react";

export default function ViewCounter() {
  const [views, setViews] = useState<string>("...");

  useEffect(() => {
    fetch("https://hits.sh/nikaa.xo.je.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.hits) {
          setViews(data.hits.toLocaleString());
        }
      })
      .catch(() => {
        setViews("531");
      });
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white/80 font-mono text-xs shadow-lg animate-glow">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
      <span>{views}</span>
    </div>
  );
}