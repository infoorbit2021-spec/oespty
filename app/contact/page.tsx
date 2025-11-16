import { Mail, Phone, MapPin } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSheetData } from "../lib/fetchGoogleSheet";

 

export default async function ContactSection() {
    const rows = await getSheetData("Locations");

  const locations = rows
    .filter(r => r.Section === "Location")
    .map(r => ({
      name: r.Name,
      lat: parseFloat(r.Latitude),
      lng: parseFloat(r.Longitude),
      address: r.Address,
    }));

  return (
    <><Header />
     {/* HERO SECTION */}
      <section className="relative h-[200px] flex items-center overflow-hidden">
        <img
          src={`/img/contact_us_hero.jpg`}
          alt="Projects Hero"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className="container mx-auto relative z-10 px-6">
          <h1 className="text-white text-4xl font-semibold mb-2">Contact Us</h1>
          {/* <p className="text-slate-200 max-w-2xl">{hero.Subtitle}</p> */}
        </div>
      </section>
    <section className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-6 py-16 flex flex-col items-center">
          

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
              {/* Left: Contact Info */}
              <div className="bg-white rounded-2xl shadow p-8 space-y-6">
                  <h3 className="text-2xl font-semibold text-slate-800">Get in touch</h3>
                  <div className="space-y-3 text-slate-600">
                      <p className="flex items-center gap-3">
                          <Mail className="text-sky-500" /> info@oespty.com
                      </p>
                      <p className="flex items-center gap-3">
                          <Phone className="text-rose-500" /> +61-433-219-447
                      </p>
                  </div>

                  <div>
                      <h4 className="text-lg font-semibold text-slate-800 mt-6 mb-2">
                          Office Location
                      </h4>
                      <div className="bg-slate-100 rounded-xl min-h-[250px] p-6 overflow-hidden">
                          
                      </div>
                  </div>
              </div>

              {/* Right: Inquiry Form */}
              <form
                  action="/api/contact"
                  method="POST"
                  className="bg-white rounded-2xl shadow p-8 flex flex-col space-y-4"
              >
                  <h3 className="text-2xl font-semibold text-slate-800">
                      Send an Inquiry
                  </h3>

                  <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                      required />
                  <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                      required />
                  <input
                      type="text"
                      name="contact"
                      placeholder="Contact Number"
                      className="border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
                  <select
                      name="subject"
                      className="border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                      <option>General</option>
                      <option>Services</option>
                      <option>Projects</option>
                      <option>Support</option>
                  </select>
                  <textarea
                      name="message"
                      placeholder="Message"
                      rows={4}
                      className="border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  ></textarea>

                  <button
                      type="submit"
                      className="bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold rounded-lg py-2 hover:opacity-90 transition"
                  >
                      Send
                  </button>
              </form>
          </div>
      </section><Footer /></>
  );
}
