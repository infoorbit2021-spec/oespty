// components/ProjectCard.tsx
import Link from 'next/link';

export default function ProjectCard({ project }: any) {
  console.log("peroject", project );
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <div className="h-56 relative">
        <img src={`/img/${project.Image}`} alt={project.Title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{project.Title}</h3>
        <p className="text-slate-600 text-sm mb-3">{project.ShortDescription ?? project.Description}</p>
        <Link href={`/projects/${project.Slug}`} className="text-blue-600">
          View Details →
        </Link>
      </div>
    </article>
  );
}
