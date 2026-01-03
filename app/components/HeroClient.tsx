'use client'

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroClient({ slides }: { slides: any[] }) {
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  if (!slides || slides.length === 0) {
    return (
      <section className="h-[70vh] flex items-center justify-center bg-slate-900 text-slate-300">
        Loading hero slides...
      </section>
    );
  }

  const slide = slides[index];

  return (
    <section className="relative text-white overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-500 to-slate-500 h-[80vh] flex items-start pt-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.SlideNo}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {slide.Image && (
            <img
              src={`/img/${slide.Image}`}
              alt={slide.Title}
              className="w-full h-full object-cover opacity-55"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 ms-5 px-4">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
            ⭐ Excellence in Engineering
          </div>
          <h1 className="mt-4 text-4xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-200 block leading-tight">
            {slide.Title}
          </h1>
          <p className="mt-4 text-lg text-slate-200">{slide.Subtitle}</p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className=" w-100 absolute flex flex-col md:flex-row gap-4 md:gap-6 
                      left-1/2 md:left-auto top-1/2 md:top-[50%] transform -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 z-30 px-4">
        <a
          href="/projects"
          className="pointer-events-auto px-8 py-4 bg-white/15 border border-white/30 backdrop-blur-md hover:bg-white/25 transition-all rounded-xl shadow-lg text-white font-semibold text-center"
        >
          View Projects
        </a>
        <a
          href="/services"
          className="pointer-events-auto px-8 py-4 bg-black/50 hover:bg-black/80 transition-all rounded-xl shadow-lg text-white font-semibold text-center"
        >
          Explore Services
        </a>
      </div>

      {/* Dots */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-3" style={{bottom:"15%"}}>
        {slides.map((_: any, i: number) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
