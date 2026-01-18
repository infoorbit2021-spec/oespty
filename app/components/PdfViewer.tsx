"use client";

import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";

type FolderItem = {
  folder: string;
  alias: string;
};

type PdfViewerProps = {
  data?: FolderItem[];
};

/* Lazy load component for desktop thumbnails */
function LazyPdfThumbnail({
  url,
  pdf,
  onError,
}: {
  url: string;
  pdf: string;
  onError: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="h-48 bg-gray-100 flex items-center justify-center"
    >
      {show ? (
        <object
          data={`${url}#page=1&view=FitH`}
          type="application/pdf"
          className="w-full h-full pointer-events-none"
          onError={onError}
        />
      ) : (
        <FileText className="w-10 h-10 text-gray-400" />
      )}
    </div>
  );
}

export default function PdfViewer({ data = [] }: PdfViewerProps) {
  const [active, setActive] = useState(0);
  const [pdfs, setPdfs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [broken, setBroken] = useState<Record<string, boolean>>({});

  const activeFolder = data?.[active]?.folder;

  /* Fetch PDFs whenever active folder changes */
  useEffect(() => {
    if (!activeFolder) return;

    setLoading(true);
    setPdfs([]);
    setBroken({});

    fetch(`/api/pdfs?folder=${encodeURIComponent(activeFolder)}`)
      .then((res) => res.json())
      .then((res) => setPdfs(res.files || []))
      .catch(() => setPdfs([]))
      .finally(() => setLoading(false));
  }, [activeFolder]);

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto px-4">

        {/* ================= MOBILE: DROPDOWN ================= */}
        <div className="md:hidden mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Select Category Drawing
          </label>
          <select
            value={active}
            onChange={(e) => setActive(Number(e.target.value))}
            className="w-full border rounded-lg px-4 py-3"
          >
            {data.map((item, i) => (
              <option key={item.folder} value={i}>
                {item.alias}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* ================= DESKTOP / TABLET: TABS ================= */}
          <div className="hidden md:block space-y-3 md:col-span-1">
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

          {/* ================= CONTENT ================= */}
          <div className="md:col-span-3 relative min-h-[300px]">

            {/* Spinner */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-20">
                <div className="flex flex-col items-center gap-3">
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      border: "5px solid rgba(0,0,0,0.2)",
                      borderTop: "5px solid #a500da",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  <span className="text-gray-700 text-sm">Loading PDFs...</span>
                </div>
              </div>
            )}

            {!loading && pdfs.length === 0 && (
              <p className="text-gray-500">No PDFs found in this folder.</p>
            )}

            {/* ================= MOBILE: 1-COLUMN LIST WITH ICONS ================= */}
            <div className="md:hidden space-y-3">
              {pdfs.map((pdf) => (
                <a
                  key={pdf}
                  href={`/pdfs/${activeFolder}/${pdf}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50"
                >
                  <FileText className="w-6 h-6 text-[#a500da]" />
                  <span className="text-sm truncate">{pdf}</span>
                </a>
              ))}
            </div>

            {/* ================= DESKTOP / TABLET: GRID WITH LAZY-LOADED THUMBNAILS ================= */}
            <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pdfs.map((pdf) => {
                const url = `/pdfs/${activeFolder}/${pdf}#toolbar=0`;
                const isBroken = broken[pdf];

                return (
                  <a
                    key={pdf}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
                  >
                    {!isBroken ? (
                      <LazyPdfThumbnail
                        url={url}
                        pdf={pdf}
                        onError={() =>
                          setBroken((b) => ({ ...b, [pdf]: true }))
                        }
                      />
                    ) : (
                      <div className="h-48 flex items-center justify-center bg-gray-100">
                        <FileText className="w-10 h-10 text-gray-400" />
                      </div>
                    )}

                    <div className="p-3 text-xs text-center truncate">
                      {pdf}
                    </div>
                  </a>
                );
              })}
            </div>

          </div>
        </div>
      </div>

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
