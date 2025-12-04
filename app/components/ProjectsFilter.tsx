"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type Project = {
  Slug: string;
  Title: string;
  Category: string;
  Status: string;
  HeroImage: string;
  ShortDescription?: string;
  Location?: string;
  Year?: string;
  Size?: string;
  Tags?: string;
};

export default function ProjectsFilter({ projectRows }: { projectRows: Project[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Extract unique filter values
  const categories = useMemo(
    () => ["All", ...new Set(projectRows.map((p) => p.Category).filter(Boolean))],
    [projectRows]
  );

  const statuses = useMemo(
    () => ["All", ...new Set(projectRows.map((p) => p.Status).filter(Boolean))],
    [projectRows]
  );

  // Apply filtering
  const filteredProjects = useMemo(
    () =>
      projectRows.filter((p) => {
        const matchCategory = selectedCategory === "All" || p.Category === selectedCategory;
        const matchStatus = selectedStatus === "All" || p.Status === selectedStatus;
        return matchCategory && matchStatus;
      }),
    [selectedCategory, selectedStatus, projectRows]
  );

  return (
    <section className="px-4 py-10 w-full">
      {/* Filter UI */}
      <div className="bg-white rounded-xl p-6 shadow mb-6">
        <div className="flex flex-wrap gap-10 justify-between items-start md:items-center">

          {/* Category */}
          <FilterSection
            title="Category"
            options={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          {/* Status */}
          <FilterSection
            title="Status"
            options={statuses}
            selected={selectedStatus}
            onSelect={setSelectedStatus}
          />
        </div>
      </div>

      {/* Result Count */}
      <p className="text-sm text-slate-600 mb-4">
        Showing {filteredProjects.length} project{filteredProjects.length !== 1 && "s"}
      </p>

      {/* Project Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px] w-full">
        {filteredProjects.length === 0 && (
          <div className="col-span-full text-center text-slate-500 py-10">
            🚫 No results found — try adjusting your filters.
          </div>
        )}

        {filteredProjects.map((project) => (
          <ProjectCard key={project.Slug} project={project} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------- Filter Button Group ---------------------- */

function FilterSection({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <h3 className="font-semibold text-slate-700 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option}
            aria-pressed={selected === option}
            onClick={() => onSelect(option)}
            className={`px-3 py-1 rounded-full border text-sm transition ${
              selected === option
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

/* --------------------------- Card Component --------------------------- */

function ProjectCard({ project }: { project: Project }) {
  const tags = project.Tags?.split(",").filter(Boolean) || [];
  const statusColor = project.Status?.toLowerCase().includes("complete")
    ? "bg-emerald-100 text-emerald-700"
    : "bg-sky-100 text-sky-700";

  return (
    <article className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative h-44">
        <img src={`/img/${project.HeroImage}`} alt={project.Title} className="w-full h-full object-cover" />

        {project.Status && (
          <span className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${statusColor}`}>
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
        <p className="text-sm text-slate-600 mb-3 elipsis">{project.ShortDescription}</p>

        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
          {project.Location && <span>📍 {project.Location}</span>}
          {project.Year && <span>📅 {project.Year}</span>}
          {project.Size && <span>📐 {project.Size}</span>}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        <Link href={`/projects/${project.Slug}`} className="text-slate-900 font-medium hover:underline">
          View Details →
        </Link>
      </div>
    </article>
  );
}
