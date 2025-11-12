'use client';
import { useState } from 'react';

export default function OurJourney({ data }: { data: any[] }) {
  const [selectedYear, setSelectedYear] = useState(data[0]?.Year);

  const selected = data.find((d) => d.Year === selectedYear);

  return (
    <section className="mb-16">
      <h3 className="text-3xl mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent text-center">
        Our Journey (2018–2025)
      </h3>
      <p className="text-center text-slate-600 mb-12">
        Here are some significant milestones and achievements in our company's journey
      </p>

      {/* Year buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {data.map((d) => (
          <button
            key={d.Year}
            onClick={() => setSelectedYear(d.Year)}
            className={`px-6 py-3 rounded-full transition-all ${
              selectedYear === d.Year
                ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {d.Year}
          </button>
        ))}
      </div>

      {/* Selected Year Details */}
      {selected && (
        <div className="rounded-[3rem] p-10 bg-white shadow-lg transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-80 h-52 rounded-[2rem] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {selected.Image ? (
                <img
                  src={`/img/${selected.Image}`}
                  alt={selected.Title}
                  className="w-full h-full object-cover rounded-[2rem]"
                />
              ) : (
                <span className="text-slate-400">Timeline Image</span>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-4xl mb-6 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                {selected.Year}
              </h2>
              <ul className="space-y-3 text-lg">
                {selected.Milestones && (
                  <li>
                    <strong>Milestone:</strong> {selected.Milestones}
                  </li>
                )}
                {selected.Achievements && (
                  <li>
                    <strong>Achievement:</strong> {selected.Achievements}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
