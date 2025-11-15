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
    <section className="relative text-white overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 h-[80vh] flex items-center">
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
              className="w-full h-full object-cover opacity-30"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
            ⭐ Excellence in Engineering
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-200">
            {slide.Title}
          </h1>
          <p className="mt-4 text-lg text-slate-200">{slide.Subtitle}</p>
          <div className="mt-6 flex gap-4">
            <a
              href="/services"
              className="inline-flex items-center gap-3 bg-white text-blue-900 px-4 py-2 rounded shadow"
            >
              {slide.CtaText || "Explore Services"}
            </a>
            <a
              href="/projects"
              className="inline-flex items-center gap-3 border border-white/30 px-4 py-2 rounded"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
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
