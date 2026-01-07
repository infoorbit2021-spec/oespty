// app/components/ProjectDetail.tsx
import { getSheetData } from "../lib/fetchGoogleSheet";
import Header from "./Header";
import Footer from "./Footer";

export const revalidate = 600;

export default async function ProjectDetail({ slug }: { slug: string }) {
  const rows = await getSheetData("ProjectDetail");
  const project = rows.find((r: any) => r.Slug === slug);

  if (!project) {
    return (
      <>
        <Header />
        <main className="mx-auto px-4 py-20 text-center text-slate-600">
          <h1 className="text-3xl font-semibold mb-4">Project not found</h1>
          <p>No details found for slug: <strong>{slug}</strong></p>
        </main>
        <Footer />
      </>
    );
  }

  /** Normalize CSV-like fields */
  const gallery = (project.GalleryImages || "").split(",").map((s: string) => s.trim()).filter(Boolean);
  const highlights = (project.Highlights || "").split(",").map((s: string) => s.trim()).filter(Boolean);
  const services = (project.ServicesUsed || "").split(",").map((s: string) => s.trim()).filter(Boolean);
  const challenges = (project.Challenges || "").split(";").map((s: string) => s.trim()).filter(Boolean);
  const solutions = (project.Solutions || "").split(";").map((s: string) => s.trim()).filter(Boolean);
  const outcomes = (project.Outcomes || "").split(";").map((s: string) => s.trim()).filter(Boolean);

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative h-[420px] flex items-center overflow-hidden">
        <img
          src={`/img/${project.HeroImage}`}
          alt={project.Title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/30 to-transparent" />

        <div className="mx-auto relative z-10 px-6 max-w-6xl">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center flex-wrap">
              {(project.Tags || "").split(",").map((t: string) => (
                <span key={t} className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                  {t.trim()}
                </span>
              ))}
              {project.Status && (
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                  {project.Status}
                </span>
              )}
            </div>

            <h1 className="text-white text-4xl font-semibold">{project.Title}</h1>
            {/* <p className="text-slate-200 max-w-2xl">{project.Description}</p> */}

            <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-200">
              {project.Location && <span>📍 {project.Location}</span>}
              {project.Duration && <span>⏳ {project.Duration}</span>}
              {project.Size && <span>📐 {project.Size}</span>}
              {project.Budget && <span>💰 {project.Budget}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-6xl px-6 py-14">

        {/* Overview Section */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
             <div className="prose max-w-none whitespace-pre-wrap leading-relaxed">{project.Description}</div>

            {/* Meta Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-slate-50 p-4 rounded border text-sm">
                <strong className="block text-slate-600">Client</strong>
                <span>{project.Client}</span>
              </div>
              <div className="bg-slate-50 p-4 rounded border text-sm">
                <strong className="block text-slate-600">Mechanical Contractor</strong>
                <span>{project.MechanicalContractor}</span>
              </div>
              {/* <div className="bg-slate-50 p-4 rounded border text-sm">
                <strong className="block text-slate-600">Size</strong>
                <span>{project.Size}</span>
              </div> */}
            </div>

            {/* Gallery */}
            {gallery.length > 0 && (
              <>
                <h3 className="text-xl font-semibold mb-4">Project Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                  {gallery.map((img: string, i: number) => (
                    <img
                      key={i}
                      src={`/img/${img}`}
                      alt={`${project.Title}-${i}`}
                      className="w-full h-40 object-cover rounded"
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {highlights.length > 0 && (
              <div className="bg-slate-50 border p-6 rounded">
                <h4 className="font-semibold mb-3">Highlights</h4>
                <ul className="text-sm space-y-2">
                  {highlights.map((s: string, i: number) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="inline-block w-3 h-3 rounded-full bg-blue-600" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {services.length > 0 && (
              <div className="bg-slate-50 border p-6 rounded">
                <h4 className="font-semibold mb-3">Services Provided</h4>
                <ul className="text-sm space-y-2">
                  {services.map((s: string, i: number) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-600" />
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-3">
                  <a href="/contact" className="text-center bg-blue-600 text-white px-4 py-2 rounded">
                    Contact Us
                  </a>
                  {/* <a href="#" className="text-center border border-slate-300 px-4 py-2 rounded">
                    Download Case Study
                  </a> */}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Challenges / Solutions / Outcomes Section */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12 mt-16">

          {/* Left */}
          <div className="space-y-12">
            {challenges.length > 0 && (
              <>
                <h3 className="text-xl font-semibold">Project Challenges</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {challenges.map((c: string, i: number) => (
                    <div key={i} className="bg-white border rounded p-4 text-sm">
                      <strong className="block mb-2">{c.split(":")[0] || "Challenge"}</strong>
                      <p className="text-slate-600">{c}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {outcomes.length > 0 && (
              <>
                <h3 className="text-xl font-semibold">Project Outcomes</h3>
                <div className="bg-blue-600 text-white p-8 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {outcomes.map((o: string, i: number) => (
                      <div key={i} className="text-sm flex gap-3 items-start">
                        <span>✔️</span>
                        <span>{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right */}
          <aside>
            {solutions.length > 0 && (
              <>
                <h3 className="text-xl font-semibold mb-4">Our Solutions</h3>
                <div className="bg-slate-50 border p-6 rounded">
                  <ul className="grid gap-4 text-sm">
                    {solutions.map((s: string, i: number) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="text-green-600">✔️</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
