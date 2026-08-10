import { useState, useEffect } from "react";

export default function ViewCounter() {
  const [views, setViews] = useState<string>("...");

  useEffect(() => {
    fetch("https://nikaa.xo.je/counter.php")
      .then(async (res) => {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          if (data && data.hits !== undefined) {
            setViews(data.hits.toLocaleString());
          } else {
            setViews("");
          }
        } catch {
          // Menangkap respon HTML dari proteksi InfinityFree tanpa membuat web crash
          setViews("");
        }
      })
      .catch(() => {
        setViews("");
      });
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white/80 font-mono text-xs shadow-lg">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
      <span>{views}</span>
    </div>
  );
}
