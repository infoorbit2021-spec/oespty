"use client";

import { useEffect, useState } from "react";

type FolderItem = {
  folder: string;
  alias: string;
};

export default function PdfViewer({ data }: { data: FolderItem[] }) {
  const [active, setActive] = useState(0);
  const [pdfs, setPdfs] = useState<string[]>([]);

  const activeFolder = data?.[active]?.folder;

  useEffect(() => {
    if (!activeFolder) return;

    fetch(`/api/pdfs?folder=${encodeURIComponent(activeFolder)}`)
      .then((res) => res.json())
      .then((res) => setPdfs(res.files || []))
      .catch(() => setPdfs([]));
  }, [activeFolder]);

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            {data?.[active]?.alias}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Left Tabs */}
          <div className="space-y-3 md:col-span-1">
            {data.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`w-full text-left px-5 py-4 rounded-lg border transition-all
                  ${
                    active === index
                      ? "bg-[#a500da] text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-blue-50"
                  }`}
              >
                <span className="font-medium text-sm md:text-base">
                  {tab.alias}
                </span>
              </button>
            ))}
          </div>

          {/* Right Content */}
          <div className="md:col-span-3">

            {pdfs.length === 0 && (
              <p className="text-gray-500">No PDFs found in this folder.</p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pdfs.map((pdf, i) => (
                <a
                  key={i}
                  href={`/pdfs/${activeFolder}/${pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
                >
                  {/* Thumbnail */}
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <object
                      data={`/pdfs/${activeFolder}/${pdf}#page=1&view=FitH`}
                      type="application/pdf"
                      className="w-full h-full pointer-events-none"
                    >
                      <span className="text-sm text-gray-400">PDF</span>
                    </object>
                  </div>

                  {/* Filename */}
                  <div className="p-3 text-xs text-center text-gray-700 truncate group-hover:text-blue-600">
                    {pdf}
                  </div>
                </a>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
