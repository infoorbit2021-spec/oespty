import { getSheetData } from '../lib/fetchGoogleSheet';

export default async function About() {
  const rows = await getSheetData('Home');

  const aboutData: Record<string, string> = {};

  rows.forEach((row: any) => {
    if (row.Section?.toLowerCase() === 'about') {
      aboutData[row.Field] = row.Value;
    }
  });
  return (
    <section id="about" className="py-20 bg-grey px-5">
      <div className=" mx-auto px-6 grid md:grid-cols-2 gap-12 items-center   ">
        <div className=' rtelative '>
          <h2 className="text-3xl font-bold mb-4">{aboutData.title}</h2>
          <p className="text-slate-600 mb-4">
            {aboutData.description}
          </p>
          <p className="text-slate-600 mb-6">
            Our mission is to reduce waste, improve collaboration, and accelerate innovation through intelligent modeling.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-full">
                <svg width="25" height="25" stroke="currentColor" strokeWidth="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
              </span>
              <span><strong>Quality Excellence</strong> — ISO certified processes</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-cyan-100 text-cyan-600 p-2 rounded-full">
                <svg width="20" height="20" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              </span>
              <span><strong>Expert Team</strong> — Certified professionals</span>
            </li>
          </ul>
        </div>
        <div>
          
          <img
              src={`/img/${aboutData.image}`}
              alt={aboutData.title || 'About Image'}
            className="rounded-lg shadow-lg mx-auto"
          />
       
        </div>
      </div>
    </section>
  )
}
