// components/Stats.tsx
import { getSheetData } from '../lib/fetchGoogleSheet'
export default async function Stats() {
  const data = await getSheetData('Stats')

  // data expected as array of objects: { Label: 'Projects Completed', Count: '500+' }
  return (
    <section className="bg-gradient-to-br from-sky-50 to-teal-50 py-16">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((stat: any, i: number) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-4xl font-bold text-blue-600">{stat.Count}</div>
            <div className="text-sm text-slate-600 mt-2">{stat.Label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
