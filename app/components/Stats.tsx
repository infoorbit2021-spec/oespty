'use client';

import { useEffect, useState } from "react";

export type StatItem = {
  Label: string;
  Count: string | number;
  Icons: string;
};

export default function Stats({
  data,
}: {
  data: StatItem[];
}) {
  return (
    <section className="relative w-full py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((stat, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-white to-[#f1f5f9] p-5 rounded-xl shadow text-center"
            >
              <div className="flex items-center justify-center gap-3 text-2xl font-bold text-blue-600">
                <div
                  className="flex-shrink-0 w-9 h-9"
                  dangerouslySetInnerHTML={{ __html: stat.Icons }}
                />
                <div className="flex-shrink-0">
    <AnimatedNumber value={stat.Count} />
  </div>
              </div>

              <div className="mt-2 text-xs text-slate-600">
                {stat.Label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedNumber({
  value,
  duration = 1500,
}: {
  value: string | number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const numericValue = Number(String(value).replace(/\D/g, "")) || 0;

  useEffect(() => {
    let start = 0;
    const step = Math.max(numericValue / (duration / 16), 1);

    const interval = setInterval(() => {
      start += step;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(interval);
  }, [numericValue, duration]);

  const suffix = String(value).replace(/[0-9,]/g, "");
  return <span>{count.toLocaleString()}{suffix}</span>;
}
