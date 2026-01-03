import Link from "next/link";
import { getSheetData } from "../lib/fetchGoogleSheet";
import Stats from "../components/Stats";
import  Header  from "../components/Header";
import Footer from "../components/Footer";
import ProjectsFilter from "../components/ProjectsFilter";

export const revalidate = 600; // ISR - revalidate every 10 mins

export default async function ProjectsPage() {
  const statsData = await getSheetData('Stats')
  // ✅ Fetch Google Sheet Data directly on the server
  const [heroRows, homeRows, projectRows] = await Promise.all([
    getSheetData("Hero"),
    getSheetData("Home"),
    getSheetData("ProjectDetail"),
  ]);

 

  // ---- Hero Section ----
  const hero = Object.fromEntries(
    heroRows
      .filter((r: any) => r.Page === 'projects')
      .map((r: any) => [r.Field, r.Value])
  );
console.log("slides.........................................",hero);
  // ✅ Stats Section
  const s = homeRows.filter((r: any) => r.Section === "Stat");
  const stats: { Label: string; Count: string }[] = [];
  for (let i = 0; i < s.length; i += 2) {
    stats.push({ Label: s[i]?.Label, Count: s[i + 1]?.Count });
  }

  // ✅ Unique categories & statuses
  const categories = ["All", ...new Set(projectRows.map((p: any) => p.Category).filter(Boolean))];
  const statuses = ["All", ...new Set(projectRows.map((p: any) => p.Status).filter(Boolean))];

  return (
    <><Header /><main className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative h-[200px] flex items-center overflow-hidden">
        <img
          src={`/img/${hero.Image}`}
          alt="Projects Hero"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className=" mx-auto relative z-10 px-6">
          <h1 className="text-white text-4xl font-semibold mb-2">{hero.Title}</h1>
          <p className="text-slate-200 max-w-2xl">{hero.Subtitle}</p>
        </div>
      </section>

      {/* STATS SECTION */}
      <div>
         <Stats data={statsData} />
        
      </div>
      {/* FILTERS */}
      <section className="px-4 py-10">
       {/*  <div className="bg-white rounded-xl p-6 shadow mb-6">
          <div className="flex flex-wrap gap-6 justify-between items-start md:items-center">
            <div>
              <h3 className="font-semibold text-slate-700 mb-2">Category</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((c) => (
                  <span
                    key={c}
                    className={`px-3 py-1 rounded-full border text-sm bg-slate-100 text-slate-700`}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-700 mb-2">Status</h3>
              <div className="flex gap-3">
                {statuses.map((s) => (
                  <span
                    key={s}
                    className={`px-3 py-1 rounded-full border text-sm bg-slate-100 text-slate-700`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-4">
          Showing {projectRows.length} project{projectRows.length !== 1 && "s"}
        </p> */}

        {/* PROJECT GRID */}
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectRows.map((project: any) => {
            console.log("Project Row →", project);
            const tags = (project.Tags || "").split(",").filter(Boolean);
            const statusColor = project.Status?.toLowerCase().includes("complete")
              ? "bg-emerald-100 text-emerald-700"
              : "bg-sky-100 text-sky-700";

            return (
              <article
                key={project.Slug}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="relative h-44">
                  <img
                    src={`/img/${project.HeroImage}`}
                    alt={project.Title}
                    className="w-full h-full object-cover" />
                  {project.Status && (
                    <span
                      className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${statusColor}`}
                    >
                      {project.Status}
                    </span>
                  )}
                  {project.Category && (
                    <span className="absolute bottom-3 left-3 bg-white/80 text-xs px-3 py-1 rounded-full shadow">
                      {project.Category}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{project.Title}</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {project.ShortDescription}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    {project.Location && <span>📍 {project.Location}</span>}
                    {project.Year && <span>📅 {project.Year}</span>}
                    {project.Size && <span>📐 {project.Size}</span>}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((t:string) => (
                      <span
                        key={t}
                        className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link href={`/projects/${project.Slug}`} prefetch>
  View Details →
</Link>


                </div>
              </article>
            );
          })}
        </div> */}
        <ProjectsFilter projectRows={projectRows} />

      </section>
    </main>
    <Footer /></>
  );
}
