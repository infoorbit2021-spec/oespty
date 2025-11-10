export default function GetInTouch() {
  return (
    <section id="contact" className="py-8 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-slate-700 font-medium mb-1">Your Name</label>
              <input id="name" type="text" className="w-full border border-gray-300 rounded-lg p-3" placeholder="John Doe" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-slate-700 font-medium mb-1">Email</label>
              <input id="email" type="email" className="w-full border border-gray-300 rounded-lg p-3" placeholder="john@example.com" required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-slate-700 font-medium mb-1">Phone</label>
              <input id="phone" type="tel" className="w-full border border-gray-300 rounded-lg p-3" placeholder="+1 (555) 000-0000" required />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-slate-700 font-medium mb-1">Message</label>
              <textarea id="message" rows={4} className="w-full border border-gray-300 rounded-lg p-3" placeholder="Describe your project..." required></textarea>
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                Send Message
                <svg width="16" height="16" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
