"use client";
import { motion } from "framer-motion";

export default function ParallaxTimeline({ sections, about, overlayColors }: any) {
  return (
    <div className="relative border-l-4 border-blue-500 ml-6 ">
      {sections.map((s: any, i: number) => {
        const isRight = i % 2 === 0;
        const overlay = overlayColors[i % overlayColors.length];

        return (
          <motion.div
            key={i}
            className={`relative mb-20 pl-10 ${isRight ? 'text-left' : 'text-right'}`}
            initial={{ opacity: 0, x: isRight ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute w-4 h-4 bg-blue-600 rounded-full left-[-10px] top-1.5" />

            <section
              className="p-8 rounded-lg shadow-xl bg-cover bg-center bg-fixed"
              style={{ backgroundImage: `url(/img/${about.Image})` }}
            >
              <div className={`absolute inset-0 ${overlay} backdrop-blur-sm rounded-lg`} />

              <div className="relative">
                <h3 className="text-3xl font-bold mb-4">{s.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: s.text }} className="prose" />
              </div>
            </section>
          </motion.div>
        );
      })}
    </div>
  );
}
