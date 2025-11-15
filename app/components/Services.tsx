"use client";

import { useState } from "react";

const tabs = [
  {
    title: "HVAC - BIM",
    icon: "fas fa-info",
    content: (
      <>
        <p>
          <strong>Building Information Modelling (BIM)</strong> is a process that
          begins with the creation of an intelligent 3D model. BIM is essential
          for efficient planning, design, and execution.
        </p>
        <p className="mt-3">
          HVAC BIM modelling improves planning, coordination, and delivers
          clash-free designs helping prevent delays and cost overruns.
        </p>
      </>
    ),
  },
  {
    title: "HVAC - DRAFTING",
    icon: "fas fa-drafting-compass",
    content: (
      <>
        <p>
          Drafting represents design intent and is critical to meaningful
          project execution. With correct codes, standards, and precision,
          drafting ensures seamless translation from design to reality.
        </p>
        <p className="mt-3">
          Our skilled drafters help reduce duct waste by up to 10% through smart
          layout strategy and value engineering.
        </p>
      </>
    ),
  },
  {
    title: "HVAC - COORDINATION",
    icon: "far fa-handshake",
    content: (
      <>
        <p>
          HVAC coordination is crucial for successful completion of medium to
          complex projects like hospitals, malls, and high-rise buildings.
        </p>
        <p className="mt-3">
          Our team ensures heating, ventilation, and cooling systems work
          synergistically with other trades, minimizing rework and maximizing
          project efficiency.
        </p>
      </>
    ),
  },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    // <section className="py-20 bg-gradient-to-br from-sky-50 to-teal-50" id="services">
    //   <div className="container mx-auto px-4">
        
    //     {/* Heading */}
    //     <div className="text-center mb-12">
    //       <h2 className="text-3xl md:text-4xl font-bold">Services Offered</h2>
    //       <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
    //     </div>

    //     {/* Tabs */}
    //     <div className="max-w-4xl mx-auto">
    //       <div className="flex flex-wrap justify-center gap-3 mb-10">
    //         {tabs.map((tab, i) => (
    //           <button
    //             key={i}
    //             onClick={() => setActive(i)}
    //             className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm transition-all
    //             ${
    //               active === i
    //                 ? "bg-blue-600 text-white shadow-md"
    //                 : "bg-white text-gray-600 border hover:bg-blue-50"
    //             }`}
    //           >
    //             <i className={tab.icon}></i>
    //             {tab.title}
    //           </button>
    //         ))}
    //       </div>

    //       {/* Content Area */}
    //       <div className="bg-white shadow-md p-6 rounded-xl text-gray-700 leading-relaxed animate-fadeIn">
    //         {tabs[active].content}
    //       </div>
    //     </div>
    //   </div>
    // </section>
     <section className="py-20 bg-gradient-to-br from-sky-50 to-teal-50" id="services">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            {tabs[0]?.title || "Services Offered"}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Layout Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Left: Tab Buttons */}
          <div className="space-y-3 md:col-span-1">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`flex items-center gap-3 w-full text-left px-5 py-4 rounded-lg border transition-all 
                  ${
                    active === index
                      ? "bg-[#a500da] text-white shadow-lg border-blue-600"
                      : "bg-white text-gray-700 hover:bg-blue-50"
                  }
                `}
              >
                {/* {tab.Icon && <i className={`${tab.Icon} text-lg`}></i>} */}
                <span className="font-medium text-sm md:text-base">{tab.title}</span>
              </button>
            ))}
          </div>

          {/* Right: Content */}
          <div className="md:col-span-3 bg-white p-8 rounded-xl shadow-lg leading-relaxed text-gray-700 animate-fadeIn">
            {tabs[active].content}
          </div>

        </div>
      </div>
    </section>
  );
}
