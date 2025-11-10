// app/components/ProjectDetail.tsx
import { getSheetData } from "../lib/fetchGoogleSheet";
import Header from "./Header";
import Footer from "./Footer";

export const revalidate = 600;

export default async function ProjectDetail({ slug }: { slug: string }) {
  console.log("🔍 Looking for project slug:", slug);

  const rows = await getSheetData("ProjectDetail");
  const project = rows.find((r: any) => r.Slug === slug);

  if (!project) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-20 text-center text-slate-600">
          <h1 className="text-3xl font-semibold mb-4">Project not found</h1>
          <p>No details found for slug: <strong>{slug}</strong></p>
        </main>
        <Footer />
      </>
    );
  }
  // normalize CSV-like fields
  const gallery = (project.GalleryImages || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const highlights = (project.Highlights || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const services = (project.ServicesUsed || "")
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const challenges = (project.Challenges || "")
    .split(";")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const solutions = (project.Solutions || "")
    .split(";")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const outcomes = (project.Outcomes || "")
    .split(";")
    .map((s: string) => s.trim())
    .filter(Boolean);

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
        <div className="container mx-auto relative z-10 px-6">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <div className="flex gap-3 items-center mb-4">
                {(project.Tags || "").split(",").map((t: string) => (
                  <span key={t} className="bg-blue-600/90 text-white text-xs px-3 py-1 rounded-full">
                    {t.trim()}
                  </span>
                ))}
                {project.Status && (
                  <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full">
                    {project.Status}
                  </span>
                )}
              </div>
              <h1 className="text-white text-4xl font-semibold mb-2">{project.Title}</h1>
              <p className="text-slate-200 max-w-2xl">{project.Description}</p>

              <div className="mt-6 flex items-center text-sm text-slate-200 gap-6">
                {project.Location && <span>📍 {project.Location}</span>}
                {project.Duration && <span>⏳ {project.Duration}</span>}
                {project.Size && <span>📐 {project.Size}</span>}
                {project.Budget && <span>💰 {project.Budget}</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="container mx-auto px-6 py-12 grid lg:grid-cols-[2fr_1fr] gap-12">
        <div>
          {/* Overview */}
          <h2 className="text-2xl font-semibold mb-3">Project Overview</h2>
          <p className="text-slate-700 leading-relaxed mb-8">{project.Description}</p>

          {/* Meta cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 text-sm">
            <div className="bg-slate-50 p-4 rounded">
              <strong className="block text-slate-600">Client</strong>
              <span>{project.Client}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded">
              <strong className="block text-slate-600">Duration</strong>
              <span>{project.Duration}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded">
              <strong className="block text-slate-600">Size</strong>
              <span>{project.Size}</span>
            </div>
          </div>

          {/* Gallery */}
          {gallery.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4">Project Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {gallery.map((img: string, i: number) => (
                  <img
                    key={i}
                    src={`/img/${img}`}
                    alt={`${project.Title} ${i}`}
                    className="w-full h-40 object-cover rounded"
                  />
                ))}
              </div>
            </>
          )}

          {/* Challenges */}
          {challenges.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4">Project Challenges</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {challenges.map((c: string, i: number) => (
                  <div key={i} className="bg-white border rounded p-4 text-sm">
                    <strong className="block mb-2">{c.split(":")[0] || "Challenge"}</strong>
                    <p className="text-slate-600">{c}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Solutions */}
          {solutions.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4">Our Solutions</h3>
              <div className="bg-slate-50 p-6 rounded mb-8">
                <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-3">
                  {solutions.map((s: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <div className="mt-1">✔️</div>
                      <div>{s}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Outcomes */}
          {outcomes.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4">Project Outcomes</h3>
              <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white p-8 rounded mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {outcomes.map((o: string, i: number) => (
                    <div key={i} className="text-sm">
                      <div className="mb-2">✔️</div>
                      <div>{o}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* CTA */}
          <div className="bg-slate-50 p-8 rounded text-center">
            <h4 className="font-semibold mb-2">Interested in a Similar Project?</h4>
            <p className="text-slate-600 mb-4">Let's discuss how we can bring your vision to life.</p>
            <div className="flex justify-center gap-4">
              <a href="/contact" className="inline-block bg-blue-600 text-white px-6 py-2 rounded">Start a Conversation</a>
              <a href="/projects" className="inline-block border border-slate-200 px-6 py-2 rounded">View All Projects</a>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          <div className="bg-slate-50 rounded p-6 mb-6">
            <h4 className="font-semibold mb-3">Services Provided</h4>
            <ul className="text-sm space-y-2">
              {services.map((s: string, i: number) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <a href="/contact" className="block text-center bg-blue-600 text-white px-4 py-2 rounded">Contact Us</a>
              <a href="#" className="block text-center border border-slate-200 px-4 py-2 rounded">Download Case Study</a>
            </div>
          </div>
        </aside>
      </section>
      <Footer></Footer>
    </>
  );
}
