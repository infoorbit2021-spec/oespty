"use client";

import { useEffect, useState } from "react";

type FolderItem = {
  folder: string;
  alias: string;
};

export default function PdfViewer({ data = [] }: { data?: FolderItem[] }) {
  const [active, setActive] = useState(0);
  const [pdfs, setPdfs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const activeFolder = data?.[active]?.folder;

  useEffect(() => {
    if (!activeFolder) return;

    setLoading(true);
    setPdfs([]);

    fetch(`/api/pdfs?folder=${encodeURIComponent(activeFolder)}`)
      .then((res) => res.json())
      .then((res) => setPdfs(res.files || []))
      .catch(() => setPdfs([]))
      .finally(() => setLoading(false));
  }, [activeFolder]);

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Tabs */}
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
                {tab.alias}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="md:col-span-3 relative min-h-[400px]">

            {/* Spinner Overlay */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
                <div className="flex flex-col items-center gap-3">
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      border: "5px solid rgba(255,255,255,0.3)",
                      borderTop: "5px solid white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  <span className="text-white text-sm">Loading PDFs...</span>
                </div>
              </div>
            )}

            {/* Empty */}
            {!loading && pdfs.length === 0 && (
              <p className="text-gray-500">No PDFs found in this folder.</p>
            )}

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {!loading &&
                pdfs.map((pdf, i) => (
                  <a
                    key={i}
                    href={`/pdfs/${activeFolder}/${pdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
                  >
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <object
                        data={`/pdfs/${activeFolder}/${pdf}#page=1&view=FitH`}
                        type="application/pdf"
                        className="w-full h-full pointer-events-none"
                      >
                        <span className="text-sm text-gray-400">PDF</span>
                      </object>
                    </div>

                    <div className="p-3 text-xs text-center text-gray-700 truncate group-hover:text-blue-600">
                      {pdf}
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spinner animation */}
      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
