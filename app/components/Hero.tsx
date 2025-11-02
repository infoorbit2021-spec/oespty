// components/Hero.tsx
export default function Hero({ title, subtitle, ctaText, image }: any) {
  return (
    <section className="relative text-white overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900">
      {image && (
        <div className="absolute inset-0 opacity-30 -z-10">
          <img src={`/img/${image}`} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="container mx-auto px-4 relative py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
            ⭐ Excellence in Engineering
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-200">
            {title}
          </h1>
          <p className="mt-4 text-lg text-slate-200">{subtitle}</p>
          <div className="mt-6 flex gap-4">
            <a href="/features" className="inline-flex items-center gap-3 bg-white text-blue-900 px-4 py-2 rounded shadow">
              {ctaText || 'Explore Services'}
            </a>
            <a href="/projects" className="inline-flex items-center gap-3 border border-white/30 px-4 py-2 rounded">
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
