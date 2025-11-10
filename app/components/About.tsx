export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-slate-600 mb-4">
            Orbit Engineering Services delivers cutting-edge solutions in BIM, CAD drafting, and comprehensive project support.
          </p>
          <p className="text-slate-600 mb-6">
            Our mission is to reduce waste, improve collaboration, and accelerate innovation through intelligent modeling.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-full">
                <svg width="20" height="20" stroke="currentColor" strokeWidth="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
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
            src="https://images.unsplash.com/photo-1609293241092-8c4e5cf64af8?auto=format&fit=crop&w=800&q=80"
            alt="Engineering team"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}
