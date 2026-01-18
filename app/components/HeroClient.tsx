'use client'

import { useEffect, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroClient({ slides }: { slides: any[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides?.length) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  if (!slides?.length) {
    return (
      <section className="h-[60vh] flex items-center justify-center bg-slate-900 text-slate-300">
        Loading hero slides...
      </section>
    );
  }

  const slide = slides[index];
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  // Swipe handler with velocity & distance
  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50; // minimum pixels
    const swipeVelocity = 0.3; // velocity threshold

    if (info.offset.x > swipeThreshold || info.velocity.x > swipeVelocity) {
      prev();
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -swipeVelocity) {
      next();
    }
  };

  return (
    <section className="relative overflow-hidden text-white h-[60vh] sm:h-[70vh] lg:h-[80vh] flex items-center">

      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.SlideNo}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.25} // makes the drag feel more natural
          onDragEnd={handleDragEnd}
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 
                   p-3 rounded-full bg-black/40 hover:bg-black/70 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 
                   p-3 rounded-full bg-black/40 hover:bg-black/70 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-24 text-center lg:text-left">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-xs sm:text-sm">
            ⭐ Excellence in Engineering
          </div>

          <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
            {slide.Title}
          </h1>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-200">
            {slide.Subtitle}
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="/projects"
              className="px-8 py-4 bg-white/15 border border-white/30 backdrop-blur-md hover:bg-white/25 transition rounded-xl font-semibold"
            >
              View Projects
            </a>
            <a
              href="/services"
              className="px-8 py-4 bg-black/50 hover:bg-black/80 transition rounded-xl font-semibold"
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_: any, i: number) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${i === index ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}
