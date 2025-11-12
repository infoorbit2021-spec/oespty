import { getSheetData } from '../lib/fetchGoogleSheet'
import { generateNextSeo } from 'next-seo/pages'
import ProjectCard from './ProjectCard'

export const revalidate = 600
 
export default async function ProjectsPage() {
  const data = await getSheetData('ProjectList')

  return (
   <>
        {generateNextSeo({
          title: 'Projects - Orbit Engineering Services',
          description: 'Discover our landmark engineering and BIM projects.',
          openGraph: {
            title: 'Projects',
            description: 'Discover our landmark engineering and BIM projects.',
            url: 'https://orbitengineering.in/projects',
          },
        })}
      
        <main className="container mx-auto py-16 px-4" style={{background:"#f0f8ff"}}>
          <><h1 className="text-4xl font-bold mb-8">Our Projects</h1><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((p) => (
              <ProjectCard key={p.Slug} project={p} />
            ))}
          </div></>
        </main>
       </>
  )
}
