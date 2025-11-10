import { Mail, Phone, MapPin } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactSection() {
  return (
    <><Header /><section className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-6 py-16 flex flex-col items-center">
          {/* Section Title */}
          <h2 className="text-4xl font-bold text-slate-800 mb-12">Our Contact</h2>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
              {/* Left: Contact Info */}
              <div className="bg-white rounded-2xl shadow p-8 space-y-6">
                  <h3 className="text-2xl font-semibold text-slate-800">Get in touch</h3>
                  <div className="space-y-3 text-slate-600">
                      <p className="flex items-center gap-3">
                          <Mail className="text-sky-500" /> info@oes-engineering.com
                      </p>
                      <p className="flex items-center gap-3">
                          <Phone className="text-rose-500" /> +1 (555) 123-4567
                      </p>
                  </div>

                  <div>
                      <h4 className="text-lg font-semibold text-slate-800 mt-6 mb-2">
                          Office Location
                      </h4>
                      <div className="bg-slate-100 rounded-xl h-48 flex flex-col items-center justify-center text-slate-500">
                          <MapPin className="text-red-500 w-6 h-6 mb-2" />
                          Map Placeholder
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
