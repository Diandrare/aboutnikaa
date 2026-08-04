import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const queryClient = new QueryClient();

/* ───────── Quotes ───────── */
const QUOTES = [
  "I don't like crowds, and I like black and white.",
  "aku hanya sebatas menyukainya.",
  "akan ada perpisahan suatu saat.",
  "dia datang memberikan luka dan pergi.",
  "when yah",
];

/* ───────── Social links ───────── */
const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/Diandrare",
    d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
  },
  {
    label: "Discord",
    href: "https://discord.com/users/v6xp",
    d: "M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/ndrlzz__",
    d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/user/31a33ysxajzbfgve6fgmy2w5wfvu",
    d: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@nika79xv",
    d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.56V6.79a4.85 4.85 0 01-1.07-.1z",
  },
];

/* ───────── Clock (Indonesian) ───────── */
function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const dayName = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];

  return (
    <div className="text-center">
      <p className="font-mono text-white text-3xl font-bold tracking-widest">
        {hh}
        <span className="opacity-60 animate-pulse">.</span>
        {mm}
      </p>
      <p className="font-mono text-gray-400 text-xs mt-1">
        {dayName}, {date} {month}
      </p>
    </div>
  );
}

/* ───────── Typewriter ───────── */
function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    setDisplayed("");
    setTyping(true);
    let pos = 0;
    const quote = QUOTES[idx];

    timer = setInterval(() => {
      pos++;
      setDisplayed(quote.slice(0, pos));
      if (pos >= quote.length) {
        clearInterval(timer);
        setTyping(false);
        timer = setTimeout(() => {
          setIdx((i) => (i + 1) % QUOTES.length);
        }, 5000);
      }
    }, 35);

    return () => clearInterval(timer);
  }, [idx]);

  return (
    <p className="font-mono text-gray-300 text-sm text-center min-h-[1.5em]">
      {displayed}
      {typing && <span className="opacity-70 animate-pulse">_</span>}
    </p>
  );
}

/* ───────── Music Player Bars ───────── */
function Bars({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-[3px] bg-white rounded-full"
          animate={playing ? { height: ["4px", "14px", "6px", "12px", "4px"] } : { height: "4px" }}
          transition={
            playing
              ? { duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }
              : { duration: 0.3 }
          }
          initial={{ height: "4px" }}
        />
      ))}
    </div>
  );
}

/* ───────── Music Player ───────── */
function MusicPlayer() {
  const [playing, setPlaying] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
      );
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  const toggle = () => {
    const cmd = playing ? "pauseVideo" : "playVideo";
    iframeRef.current?.contentWindow?.postMessage(
      `{"event":"command","func":"${cmd}","args":""}`,
      "*"
    );
    setPlaying((p) => !p);
  };

  return (
    <div className="flex items-center gap-5 p-4 rounded-2xl bg-[rgba(20,20,25,0.8)] border border-white/10 backdrop-blur-xl w-full">
      <iframe
        ref={iframeRef}
        src="https://www.youtube.com/embed/MzYO6_ld3LA?enablejsapi=1&autoplay=1&controls=0&rel=0"
        allow="autoplay"
        className="absolute w-0 h-0 opacity-0 pointer-events-none"
        title="audio"
      />
      <div className="w-14 h-14 rounded-xl bg-gray-800 border border-white/10 flex-shrink-0 overflow-hidden">
        <img
          src="https://img.youtube.com/vi/MzYO6_ld3LA/mqdefault.jpg"
          alt="misery"
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">Now Playing</p>
        <p className="font-mono text-sm text-white truncate">misery</p>
        <div className="flex items-center gap-2 mt-1">
          <p className="font-mono text-xs text-gray-500 truncate">pupsies</p>
          <Bars playing={playing} />
        </div>
      </div>
      <button
        onClick={toggle}
        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? (
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </div>
  );
}

/* ───────── Mode Select (Loading) Screen ───────── */
function ModeSelect({ onSelect }: { onSelect: (mode: "performance" | "lite") => void }) {
  return (
    <div
      className="bg-black min-h-screen w-full flex items-center justify-center"
      style={{ backgroundImage: "radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.03) 0%, transparent 60%)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-8 w-full max-w-lg"
      >
        <p className="font-mono text-white text-lg tracking-[0.3em] mb-4 opacity-90">
          [ CHOOSE MODE ]
        </p>
        <p className="font-mono text-gray-400 text-sm leading-relaxed mb-12 max-w-sm mx-auto text-center">
          This website may experience lag or some effects may not be fully supported on your device. Because of that, I've provided 2 mode options to keep the experience enjoyable.
        </p>
        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect("performance")}
            className="flex flex-col items-center gap-1 px-7 py-3.5 rounded-2xl border border-white/15 bg-white/6 cursor-pointer transition-all hover:bg-white/12 hover:border-white/30 min-w-[88px]"
          >
            <span className="font-mono text-lg font-semibold text-white">Performance</span>
            <span className="font-mono text-sm text-gray-400">full visuals (recommended)</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect("lite")}
            className="flex flex-col items-center gap-1 px-7 py-3.5 rounded-2xl border border-white/15 bg-white/6 cursor-pointer transition-all hover:bg-white/12 hover:border-white/30 min-w-[140px]"
          >
            <span className="font-mono text-lg font-semibold text-white">Lite</span>
            <span className="font-mono text-sm text-gray-400">smoother</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

/* ───────── Main Page ───────── */
function MainPage({ mode }: { mode: "performance" | "lite" }) {
  const isPerf = mode === "performance";
  const idle = useIdleStatus();

  return (
    <div
      className="relative min-h-screen bg-[#0a0a0f] bg-cover bg-center bg-no-repeat"
      style={isPerf ? { backgroundImage: "url('/bg.gif')" } : {}}
    >
      {/* dark overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/75 z-[1]" />

      {/* content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen py-12 px-4"
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-[88px] h-[88px] rounded-full p-[2px] mb-4"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.08))" }}
        >
          <img src="/avatar.png" alt="nika" className="w-full h-full rounded-full object-cover bg-gray-800" />
        </motion.div>

        {/* Name */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="font-mono text-white text-2xl font-semibold tracking-widest mb-2"
        >
          nika
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="font-mono text-gray-400 text-sm tracking-wider mb-8"
        >
          designer, gamer, editor
        </motion.p>

        {/* Clock */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <Clock />
        </motion.div>

        {/* Typewriter quotes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-6 max-w-xs text-center"
        >
          <Typewriter />
        </motion.div>

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/8 border border-white/12 mb-8"
        >
          <span className={`w-2 h-2 rounded-full ${idle ? "bg-yellow-400 shadow-[0_0_6px_#facc15]" : "bg-green-400 shadow-[0_0_6px_#4ade80]"} animate-pulse`} />
          <span className="font-mono text-sm text-gray-200">currently: {idle ? "idle" : "online"}</span>
        </motion.div>

        {/* Music player */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-xs mb-8"
        >
          <MusicPlayer />
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex gap-4 mb-2"
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white/75 hover:bg-white/18 hover:text-white hover:border-white/30 hover:-translate-y-0.5 transition-all duration-150"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d={s.d} />
              </svg>
            </a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ───────── Idle status ───────── */
function useIdleStatus(idleMs = 5500) {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const reset = () => {
      setIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), idleMs);
    };

    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    timer = setTimeout(() => setIdle(true), idleMs);

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [idleMs]);

  return idle;
}

/* ───────── Root ───────── */
function Home() {
  const [mode, setMode] = useState<null | "performance" | "lite">(null);

  if (!mode) return <ModeSelect onSelect={setMode} />;
  return <MainPage mode={mode} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
