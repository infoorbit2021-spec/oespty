import { getSheetData } from '../../lib/fetchGoogleSheet'
import { generateNextSeo } from 'next-seo/pages'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export async function generateStaticParams() {
  const rows = await getSheetData('ProjectDetail')
  return rows.map((r) => ({ slug: r.Slug }))
}

export const revalidate = 600

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  const rows = await getSheetData('ProjectDetail')
  const project = rows.find((p) => p.Slug === params.slug)

  if (!project) {
    return (
      <html lang="en">
        <head>{generateNextSeo({ title: 'Project Not Found' })}</head>
        <body><Header /><main className="container mx-auto py-16">Project not found.</main><Footer /></body>
      </html>
    )
  }

  const highlights = project.Highlights?.split(',').map((s) => s.trim()) ?? []

  return (
    <html lang="en">
      <head>
        {generateNextSeo({
          title: project.SEO_Title || project.Title,
          description: project.SEO_Description || project.Description,
          openGraph: {
            title: project.SEO_Title,
            description: project.SEO_Description,
            url: project.SEO_Canonical,
            images: project.SEO_OGImage ? [{ url: `/img/${project.SEO_OGImage}` }] : [],
          },
        })}
      </head>
      <body>
        <Header />
        <main className="container mx-auto py-16 px-4">
          {project.HeroImage && (
            <img src={`/img/${project.HeroImage}`} alt={project.Title} className="w-full rounded-lg mb-8" />
          )}
          <h1 className="text-4xl font-bold mb-4">{project.Title}</h1>
          <p className="text-slate-700 mb-8">{project.Description}</p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div><strong>Location:</strong> {project.Location}</div>
            <div><strong>Client:</strong> {project.Client}</div>
            <div><strong>Duration:</strong> {project.Duration}</div>
          </div>

          <h2 className="text-2xl font-semibold mb-3">Highlights</h2>
          <ul className="list-disc list-inside mb-6 text-slate-700">
            {highlights.map((h, i) => <li key={i}>{h}</li>)}
          </ul>

          <h2 className="text-2xl font-semibold mb-3">Services Used</h2>
          <p className="text-slate-700 mb-6">{project.ServicesUsed}</p>

          <h2 className="text-2xl font-semibold mb-3">Results</h2>
          <p className="text-slate-700">{project.Results}</p>
        </main>
        <Footer />
      </body>
    </html>
  )
}
