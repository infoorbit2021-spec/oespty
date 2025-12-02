'use client'
import { useEffect, useState } from "react";

export type StatItem = {
  Label: string;
  Count: string | number;
};

export default function Stats({ data, pathname }: { data: StatItem[], pathname: string }) {

  const applyLiftStyle = pathname === "/projects";

  return (
    <section className="bg-white pb-16 px-5">
      <div className="mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((stat, i) => (
          <div
            key={i}
            className={`bg-white p-6 rounded-lg shadow text-center ${
              applyLiftStyle ? "-mt-16 relative z-[9]" : ""
            }`}
          >
            <div className="text-4xl font-bold text-blue-600">
              <AnimatedNumber value={stat.Count} />
            </div>
            <div className="text-sm text-slate-600 mt-2">{stat.Label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}


// 🔥 Embedded Animated Number Logic
function AnimatedNumber({ value, duration = 1500 }: { value: string | number, duration?: number }) {
  const [count, setCount] = useState(0);

  // Extract digits only (handles 500+, 2,000, 90%)
  const numericValue = Number(String(value).replace(/\D/g, ""));

  useEffect(() => {
    let start = 0;
    const increment = numericValue / (duration / 16); // ~60fps

    const interval = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        clearInterval(interval);
        setCount(numericValue);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [numericValue, duration]);

  // Add back suffixes like "+" or "%"
  const suffix = String(value).replace(/[0-9,]/g, "");

  return <span>{count.toLocaleString()}{suffix}</span>;
}
