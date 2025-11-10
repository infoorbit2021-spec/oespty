import ProjectDetail from "../../components/ProjectDetail";


interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const resolved = await params;
  const slug = resolved?.slug;

  console.log("✅ Server params:", resolved);

  if (!slug) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Error: Missing slug</h1>
        <p>Try visiting /projects/modern-hospital manually.</p>
      </main>
    );
  }

  return (
    <main>
      <ProjectDetail slug={slug} />
    </main>
  );
}
