import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import StarCursor from "./StarCursor";
import StardustBackground from "./StardustBackground";
import ViewCounter from "./ViewCounter";

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
  {
    label: "Roblox",
    href: "https://www.roblox.com/users/1326705110/profile",
    d: "M5.163 0L0 18.837l18.837 5.163L24 5.163 5.163 0zm9.73 13.91l-4.14-1.135 1.135-4.14 4.14 1.135-1.135 4.14z",
  },
  {
    label: "Guns.lol",
    href: "https://guns.lol/niqa",
    d: "M2 7h11v2H2V7zm11 0l3-3h4v2h-3l-2 2h-2zm-3 3h2v7l-2 3v-2l1-1v-7zm10-1h2v3h-2V9zM4 10h6v2H4v-2zm-2 3h5v2H2v-2z",
  },
];

/* ───────── Clock (Multi-Language) ───────── */
function Clock({ lang }: { lang: "EN" | "ID" }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");

  const days = {
    EN: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    ID: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
  };

  const months = {
    EN: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    ID: [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ],
  };

  const dayName = days[lang][now.getDay()];
  const date = now.getDate();
  const month = months[lang][now.getMonth()];

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
    }, 40);

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
          animate={
            playing
              ? { height: ["4px", "14px", "6px", "12px", "4px"] }
              : { height: "4px" }
          }
          transition={
            playing
              ? {
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
          initial={{ height: "4px" }}
        />
      ))}
    </div>
  );
}

function MusicPlayer() {
  const [playing, setPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(165);
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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (playing) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) return 0;
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [playing, duration]);

  const toggle = () => {
    const cmd = playing ? "pauseVideo" : "playVideo";
    iframeRef.current?.contentWindow?.postMessage(
      `{"event":"command","func":"${cmd}","args":""}`,
      "*"
    );
    setPlaying((p) => !p);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    iframeRef.current?.contentWindow?.postMessage(
      `{"event":"command","func":"seekTo","args":[${newTime}, true]}`,
      "*"
    );
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl bg-[rgba(20,20,25,0.8)] border border-white/10 backdrop-blur-xl w-full">
      <iframe
        ref={iframeRef}
        src="https://www.youtube.com/embed/PUzt7rZIFOo?enablejsapi=1&autoplay=1&controls=0&rel=0"
        allow="autoplay"
        className="absolute w-0 h-0 opacity-0 pointer-events-none"
        title="audio"
      />

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gray-800 border border-white/10 flex-shrink-0 overflow-hidden animate-glow">
          <img
            src="https://img.youtube.com/vi/PUzt7rZIFOo/mqdefault.jpg"
            alt="Paparazzi"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">
            Now Playing
          </p>
          <div className="w-full overflow-hidden whitespace-nowrap">
            <span className="animate-marquee-smooth inline-block font-mono text-xs font-semibold text-white">
              That's ur problem not mine.
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-[11px] text-gray-400 truncate">
              Alximo - Topic
            </span>
            <Bars playing={playing} />
          </div>
        </div>

        <button
          onClick={toggle}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer animate-glow"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      <div className="w-full flex flex-col gap-1 mt-1">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
        />
        <div className="flex justify-between font-mono text-[10px] text-gray-400 px-0.5">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

/* ───────── Glitch Star Transition (Calm -> Brutal -> Gepeng Blur Exit) ───────── */
const GLITCH_CYCLE = 2600;

export function GlitchStar({
  onDone,
  mode,
}: {
  onDone: () => void;
  mode: "performance" | "lite";
}) {
  useEffect(() => {
    const t = setTimeout(onDone, GLITCH_CYCLE);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[999] grid place-items-center overflow-hidden bg-[#020204]">
      <style>{`
        @keyframes star-sequence {
          /* Phase 1: Calm Entrance (0% - 20%) */
          0% {
            transform: scale(0.6) rotate(0deg);
            opacity: 0;
            filter: blur(8px);
          }
          10% {
            transform: scale(0.9) rotate(0deg);
            opacity: 1;
            filter: blur(0px);
          }
          20% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
            filter: blur(0px);
          }

          /* Phase 2: UNHINGED BRUTAL GLITCH (20% - 75%) */
          22% { transform: translate(-45px, 25px) scale(1.4) skewX(-45deg); filter: invert(0.8) contrast(300%); }
          25% { transform: translate(50px, -30px) scale(0.6) rotate(15deg); }
          28% { transform: translate(-55px, -20px) scale(1.5) skewY(35deg); filter: hue-rotate(90deg); }
          31% { transform: translate(40px, 35px) scale(0.7) rotate(-20deg); }
          34% { transform: translate(-60px, -40px) scale(1.6) skewX(50deg) invert(1); }
          38% { transform: translate(55px, 20px) scale(0.5) rotate(25deg); }
          42% { transform: translate(-35px, 45px) scale(1.7) skewY(-40deg); filter: contrast(400%); }
          46% { transform: translate(45px, -35px) scale(0.6) skewX(-55deg); }
          50% { transform: translate(-50px, -25px) scale(1.8) rotate(-35deg) invert(0.9); }
          54% { transform: translate(60px, 30px) scale(0.5) skewY(45deg); }
          58% { transform: translate(-40px, 40px) scale(1.5) rotate(40deg); }
          62% { transform: translate(35px, -45px) scale(0.7) skewX(60deg); filter: invert(1); }
          66% { transform: translate(-25px, 20px) scale(1.3); }
          71% { transform: translate(15px, -15px) scale(0.95); }

          /* Phase 3: Extreme Gepeng & Smooth Blur Exit (75% - 100%) */
          76% {
            transform: scaleX(3) scaleY(0.2) skewX(30deg);
            opacity: 1;
            filter: blur(3px) brightness(2);
          }
          85% {
            transform: scaleX(8) scaleY(0.02) skewX(-45deg);
            opacity: 0.8;
            filter: blur(12px) brightness(2.5);
          }
          93% {
            transform: scaleX(14) scaleY(0.002) skewX(60deg);
            opacity: 0.35;
            filter: blur(25px) brightness(3);
          }
          100% {
            transform: scaleX(20) scaleY(0.0001);
            opacity: 0;
            filter: blur(40px) brightness(1);
          }
        }

        /* RGB Cyan - Jitter Super Kasar */
        @keyframes rgb-cyan {
          0%, 19%, 76%, 100% { transform: translate(0, 0); opacity: 0; }
          22% { transform: translate(-50px, 30px) scaleX(1.4); opacity: 1; }
          32% { transform: translate(55px, -35px) scaleY(0.5); opacity: 0.95; }
          42% { transform: translate(-60px, -20px) skewX(45deg); opacity: 1; }
          52% { transform: translate(48px, 40px); opacity: 0.9; }
          62% { transform: translate(-40px, -30px) scaleX(1.6); opacity: 1; }
        }

        /* RGB Magenta - Jitter Super Kasar */
        @keyframes rgb-magenta {
          0%, 19%, 76%, 100% { transform: translate(0, 0); opacity: 0; }
          24% { transform: translate(52px, -25px) scaleY(1.5); opacity: 1; }
          34% { transform: translate(-58px, 30px) skewY(-35deg); opacity: 0.95; }
          44% { transform: translate(65px, 18px); opacity: 1; }
          54% { transform: translate(-45px, -45px) scaleX(0.5); opacity: 0.9; }
          64% { transform: translate(50px, 35px); opacity: 1; }
        }

        /* RGB Yellow - Lapisan RGB Ketiga Biar Makin Brutal */
        @keyframes rgb-yellow {
          0%, 19%, 76%, 100% { transform: translate(0, 0); opacity: 0; }
          26% { transform: translate(-30px, -40px) scale(1.3); opacity: 0.8; }
          36% { transform: translate(40px, 45px) skewX(-30deg); opacity: 0.85; }
          48% { transform: translate(-50px, 25px); opacity: 0.9; }
          60% { transform: translate(35px, -35px) scaleY(1.4); opacity: 0.8; }
        }

        /* Extreme Slice Slicing */
        @keyframes slice-tear-1 {
          0%, 19%, 76%, 100% { clip-path: inset(0 0 0 0); opacity: 0; }
          23% { clip-path: inset(5% 0 80% 0); transform: translateX(-80px); opacity: 1; }
          37% { clip-path: inset(70% 0 5% 0); transform: translateX(85px); opacity: 1; }
          51% { clip-path: inset(20% 0 50% 0); transform: translateX(-90px); opacity: 1; }
          65% { clip-path: inset(40% 0 20% 0); transform: translateX(75px); opacity: 1; }
        }

        @keyframes slice-tear-2 {
          0%, 19%, 76%, 100% { clip-path: inset(0 0 0 0); opacity: 0; }
          27% { clip-path: inset(85% 0 2% 0); transform: translateX(90px); opacity: 1; }
          41% { clip-path: inset(10% 0 60% 0); transform: translateX(-95px); opacity: 1; }
          55% { clip-path: inset(50% 0 30% 0); transform: translateX(80px); opacity: 1; }
          69% { clip-path: inset(30% 0 40% 0); transform: translateX(-70px); opacity: 1; }
        }

        /* Strobe Background Glitch */
        @keyframes bg-strobe {
          0%, 19%, 76%, 100% { opacity: 0; }
          22% { opacity: 0.8; background-color: #ff0055; }
          30% { opacity: 0.85; background-color: #00f0ff; }
          38% { opacity: 0.95; background-color: #ffffff; }
          48% { opacity: 0.8; background-color: #ffe600; }
          58% { opacity: 0.9; background-color: #ff0055; }
          68% { opacity: 0.7; background-color: #00f0ff; }
        }

        .star-main-container {
          animation: star-sequence ${GLITCH_CYCLE}ms cubic-bezier(0.1, 0.95, 0.1, 1) forwards;
        }

        .cyan-ghost {
          animation: rgb-cyan ${GLITCH_CYCLE}ms linear infinite;
          mix-blend-mode: screen;
        }

        .magenta-ghost {
          animation: rgb-magenta ${GLITCH_CYCLE}ms linear infinite;
          mix-blend-mode: screen;
        }

        .yellow-ghost {
          animation: rgb-yellow ${GLITCH_CYCLE}ms linear infinite;
          mix-blend-mode: screen;
        }

        .slice-layer-1 {
          animation: slice-tear-1 ${GLITCH_CYCLE}ms linear infinite;
        }

        .slice-layer-2 {
          animation: slice-tear-2 ${GLITCH_CYCLE}ms linear infinite;
        }

        .strobe-bg {
          animation: bg-strobe ${GLITCH_CYCLE}ms linear infinite;
        }
      `}</style>

      {/* Strobe Layer */}
      <div className="strobe-bg absolute inset-0 pointer-events-none mix-blend-overlay" />

      {/* Background Video */}
      {mode === "performance" && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-25 mix-blend-difference"
          src="/bg.webm"
        />
      )}

      {/* Ukuran Diperkecil & Dibuat Sleek: w-44 h-44 (Desktop: w-56 h-56) */}
      <div className="star-main-container relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* Yellow Shift */}
        <div className="yellow-ghost absolute inset-0 text-[#ffe600]">
          <StarSvg />
        </div>

        {/* Cyan Shift */}
        <div className="cyan-ghost absolute inset-0 text-[#00f0ff]">
          <StarSvg />
        </div>

        {/* Magenta Shift */}
        <div className="magenta-ghost absolute inset-0 text-[#ff0055]">
          <StarSvg />
        </div>

        {/* Slice Layer 1 */}
        <div className="slice-layer-1 absolute inset-0 text-white drop-shadow-[0_0_30px_rgba(255,255,255,1)]">
          <StarSvg />
        </div>

        {/* Slice Layer 2 */}
        <div className="slice-layer-2 absolute inset-0 text-cyan-300 drop-shadow-[0_0_30px_rgba(0,240,255,1)]">
          <StarSvg />
        </div>

        {/* Center Base Star */}
        <div className="relative w-full h-full text-white">
          <StarSvg />
        </div>
      </div>

      {/* Sub-Text */}
      <div className="absolute bottom-12 font-mono text-[10px] font-bold tracking-[0.6em] text-cyan-400 uppercase opacity-75">
        [ SYSTEM OVERRIDE ]
      </div>
    </div>
  );
}

/* ───────── Sleek & Sharp Realistic Star SVG ───────── */
function StarSvg() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <circle
        cx="100"
        cy="100"
        r="70"
        fill="currentColor"
        className="opacity-20 blur-lg"
      />
      <ellipse
        cx="100"
        cy="100"
        rx="95"
        ry="3"
        fill="currentColor"
        className="opacity-80"
      />
      <ellipse
        cx="100"
        cy="100"
        rx="3"
        ry="95"
        fill="currentColor"
        className="opacity-80"
      />
      <ellipse
        cx="100"
        cy="100"
        rx="55"
        ry="1.8"
        fill="currentColor"
        className="opacity-60"
        transform="rotate(45 100 100)"
      />
      <ellipse
        cx="100"
        cy="100"
        rx="55"
        ry="1.8"
        fill="currentColor"
        className="opacity-60"
        transform="rotate(-45 100 100)"
      />
      <path
        d="M 100,22 C 100,75 125,100 178,100 C 125,100 100,125 100,178 C 100,125 75,100 22,100 C 75,100 100,75 100,22 Z"
        fill="#ffffff"
      />
      <circle cx="100" cy="100" r="5" fill="#ffffff" />
    </svg>
  );
}

/* ───────── Mode Select / Welcome Screen (Enhanced) ───────── */
function ModeSelect({
  onSelect,
}: {
  onSelect: (mode: "performance" | "lite") => void;
}) {
  return (
    <div className="relative bg-[#08080c] min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 1. Subtle Cyber Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* 2. Ambient Colored Glows */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* 3. Decorative Corner Text */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-gray-500 tracking-widest hidden sm:block">
        JUST A PERSON
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-gray-500 tracking-widest hidden sm:block">
        EMO4LYFE
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-8 w-full max-w-lg"
      >
        <p className="font-mono text-cyan-400 text-xs tracking-[0.4em] uppercase mb-2">
          [ WELCOME ]
        </p>

        <p className="font-mono text-xs text-gray-300 leading-relaxed max-w-xs mx-auto mb-6 opacity-80">
          Welcome to Nika's digital sanctuary — a personal space for links, music, and quiet thoughts.
        </p>

        {/* 4. Mini Badges / Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["Designer", "Gamer", "Editor", "Music"].map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect("performance")}
            className="group relative flex flex-col items-center gap-1 px-10 py-4 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md cursor-pointer transition-all hover:bg-white/10 hover:border-cyan-500/50 min-w-[220px]"
          >
            <span className="font-mono text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              ENTER
            </span>
            <span className="font-mono text-[11px] text-gray-400">
              Continue To Profile Nika
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

/* ───────── Content Dictionary ───────── */
const content = {
  EN: {
    bio: "designer, gamer, editor, cat lover",
    status: "currently:",
    aboutBtn: "About Me",
  },
  ID: {
    bio: "desainer, gamer, editor, pecinta kucing",
    status: "saat ini:",
    aboutBtn: "Tentang Saya",
  },
};

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

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
    ];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    timer = setTimeout(() => setIdle(true), idleMs);

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [idleMs]);

  return idle;
}

/* ───────── Main Page ───────── */
function MainPage({ mode }: { mode: "performance" | "lite" }) {
  const isPerf = mode === "performance";
  const idle = useIdleStatus();
  const [lang, setLang] = useState<"EN" | "ID">("EN");

  return (
    <div className="relative min-h-screen bg-[#0a0a0f]">
      <StardustBackground />

      {isPerf && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
          src="/bg.webm"
        />
      )}
      <div className="fixed inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/75 z-[1]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen py-12 px-4"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-[88px] h-[88px] rounded-full p-[2px] mb-4 animate-glow"
        >
          <img
            src="/avatar.png"
            alt="nika"
            className="w-full h-full rounded-full object-cover bg-gray-800"
          />
        </motion.div>

        <button
          onClick={() => window.location.reload()}
          className="fixed top-5 right-5 z-50 p-2.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 text-white/70 hover:text-white transition-all backdrop-blur-md cursor-pointer"
          title="Refresh Page"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glitch font-mono text-2xl font-bold tracking-wider text-white mb-1 cursor-default"
          data-text="Nika"
        >
          Nika
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="font-mono text-gray-400 text-sm tracking-wider mb-8"
        >
          {content[lang].bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <Clock lang={lang} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-6 max-w-xs text-center"
        >
          <Typewriter />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/8 border border-white/12 mb-8"
        >
          <span
            className={`w-2 h-2 rounded-full ${idle ? "bg-yellow-400 shadow-[0_0_6px_#facc15]" : "bg-green-400 shadow-[0_0_6px_#4ade80]"} animate-pulse`}
          />
          <span className="font-mono text-sm text-gray-200">
            {content[lang].status} {idle ? "idle" : "online"}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-xs mb-8"
        >
          <MusicPlayer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex gap-6 mb-2"
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white/75 hover:bg-white/18 hover:text-white hover:border-white/30 hover:-translate-y-0.5 transition-all duration-150 animate-glow"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d={s.d} />
              </svg>
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6"
        >
          <button
            onClick={() => setLang((prev) => (prev === "EN" ? "ID" : "EN"))}
            className="glow flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/8 hover:bg-white/15 border border-white/12 text-white/80 hover:text-white text-xs font-mono transition-all backdrop-blur-md cursor-pointer"
          >
            <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span>{content[lang].aboutBtn}</span>
            <span className="text-[10px] opacity-70 font-bold text-cyan-400">[{lang}]</span>
          </button>
        </motion.div>
      </motion.div>
      <ViewCounter />
    </div>
  );
}

/* ───────── Root ───────── */
function Home() {
  const [mode, setMode] = useState<null | "performance" | "lite">(null);
  const [transitioning, setTransitioning] = useState(false);

  const handleSelect = (m: "performance" | "lite") => {
    setMode(m);
    setTransitioning(true);
  };

  if (transitioning && mode)
    return <GlitchStar onDone={() => setTransitioning(false)} mode={mode} />;
  if (!mode) return <ModeSelect onSelect={handleSelect} />;
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
      <StarCursor />
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;