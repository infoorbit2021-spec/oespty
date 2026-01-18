"use client";

import { useState } from "react";

export default function Services({ servicedata }: { servicedata: any[] }) {
  const [active, setActive] = useState<number | null>(0);
  const tabs = servicedata;

  return (
    <section className="py-20 bg-white" id="services">
      <div className="mx-auto px-4 max-w-7xl">

        {/* ================= MOBILE & TABLET (ACCORDION) ================= */}
        <div className="lg:hidden space-y-4">
          {tabs.map((tab, index) => {
            const isOpen = active === index;

            return (
              <div
                key={index}
                className="border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setActive(isOpen ? null : index)}
                  className={`w-full flex justify-between items-center px-5 py-4 text-left transition
                    ${
                      isOpen
                        ? "bg-[#a500da] text-white"
                        : "bg-white text-gray-800"
                    }
                  `}
                >
                  <span className="font-medium">{tab.Title}</span>
                  <span
                    className={`transform transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 py-4 text-gray-700 bg-gray-50 animate-fadeIn">
                    {tab.ShortDescription}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ================= DESKTOP (UNCHANGED TABS LAYOUT) ================= */}
        <div className="hidden lg:grid grid-cols-4 gap-10">

          {/* Left: Tab Buttons */}
          <div className="space-y-3 col-span-1">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`flex items-center gap-3 w-full text-left px-5 py-4 rounded-lg border transition-all
                  ${
                    active === index
                      ? "bg-[#a500da] text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-blue-50"
                  }
                `}
              >
                <span className="font-medium text-base">{tab.Title}</span>
              </button>
            ))}
          </div>

          {/* Right: Content */}
          <div className="col-span-3 bg-white p-8 rounded-xl shadow-lg leading-relaxed text-gray-700 animate-fadeIn">
            {tabs[active ?? 0]?.ShortDescription}
          </div>

        </div>
      </div>
    </section>
  );
}
