"use client";

import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSheetData } from "../lib/fetchGoogleSheet";
import { useState, useEffect } from "react";
import Reveal from "../components/Reveal";

type Location = {
  name: string;
  lat: number;
  lng: number;
  address: string;
  email: string;
  phone: string;
  timezone?: string;
  hours?: string;
};

export default function ContactSection() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<Location | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    subject: "General",
    message: "",
    preferredOffice: "",
  });

  useEffect(() => {
    async function loadData() {
      const rows = await getSheetData("Locations");

      const filtered = rows
        .filter((r: any) => r.Section === "Location")
        .map((r: any) => ({
          name: r.Name,
          lat: parseFloat(r.Latitude),
          lng: parseFloat(r.Longitude),
          address: r.Address,
          email: r.Email,
          phone: r.Phone,
          timezone: r.Timezone || "AEDT (UTC+11)",
          hours: r.Hours || "Mon-Fri: 9:00 AM - 5:00 PM",
        }));

      setLocations(filtered);
      if (filtered.length > 0) {
        setSelectedOffice(filtered[0]);
        setFormData((prev) => ({ ...prev, preferredOffice: filtered[0].name }));
      }
    }

    loadData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    alert("Your message has been successfully sent!");
    setFormData({
      name: "",
      email: "",
      contact: "",
      subject: "General",
      message: "",
      preferredOffice: formData.preferredOffice,
    });
  } else {
    alert("Error sending message. Please try again later.");
  }
};


  // Generate Google Maps embed URL
  const getMapUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${lat},${lng}&zoom=15`;
  };

  // Alternative: Use regular Google Maps link
  const getMapEmbedUrl = (lat: number, lng: number) => {
    return `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=15&output=embed`;
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      {/* <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl mb-6">Get in Touch</h1>
            <p className="text-xl text-slate-300 mb-8">
              Have a project in mind? We're here to help. Reach out to any of
              our offices or send us a message below.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-5 h-5" />
                <span className="text-sm">{locations.length} Locations</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-5 h-5" />
                <span className="text-sm">24/7 Support Available</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-5 h-5" />
                <span className="text-sm">Response within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
  <section className="relative h-[200px] flex items-center overflow-hidden">
        <img
          src={`/img/contact_us_her_img.jpg`}
          alt="Projects Hero"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" />
        <div className=" mx-auto relative z-10 px-6">
          <h1 className="text-white text-4xl font-semibold mb-2">Contact Us</h1>
          {/* <p className="text-slate-200 max-w-2xl">{hero.Subtitle}</p> */}
        </div>
      </section>
      {/* Office Locations Section */}
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <Reveal>
        <div className="mb-12">
          <h2 className="text-3xl mb-3 text-slate-900">Our Offices</h2>
          <p className="text-slate-600">
            Select an office to view location details and contact information
          </p>
        </div>
        </Reveal>
        <Reveal>
        {/* Office Pills Navigation */}
        {locations.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8">
            {locations.map((office, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedOffice(office);
                  setFormData((prev) => ({
                    ...prev,
                    preferredOffice: office.name,
                  }));
                }}
                className={`px-6 py-3 rounded-full transition-all duration-200 ${
                  selectedOffice?.name === office.name
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{office.name}</span>
                </div>
              </button>
            ))}
          </div>
        )}
</Reveal>
<Reveal>
        {/* Selected Office Details */}
        {selectedOffice && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Office Information Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h3 className="text-2xl mb-6 text-slate-900">
                {selectedOffice.name}
              </h3>

              <div className="space-y-6">
                {/* Address */}
                {selectedOffice.address && (
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm mb-1">Address</p>
                      <p className="text-slate-900">{selectedOffice.address}</p>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {selectedOffice.phone && (
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm mb-1">Phone</p>
                      <a
                        href={`tel:${selectedOffice.phone}`}
                        className="text-slate-900 hover:text-slate-700 transition-colors"
                      >
                        {selectedOffice.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {selectedOffice.email && (
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm mb-1">Email</p>
                      <a
                        href={`mailto:${selectedOffice.email}`}
                        className="text-slate-900 hover:text-slate-700 transition-colors"
                      >
                        {selectedOffice.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Hours */}
                {selectedOffice.hours && (
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm mb-1">
                        Business Hours
                      </p>
                      <p className="text-slate-900">{selectedOffice.hours}</p>
                      {selectedOffice.timezone && (
                        <p className="text-slate-500 text-sm mt-1">
                          {selectedOffice.timezone}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedOffice.lat},${selectedOffice.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition-colors text-center"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-[500px]">
              <iframe
                src={getMapEmbedUrl(selectedOffice.lat, selectedOffice.lng)}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        )}
        </Reveal>
<Reveal>
        {/* Contact Form Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 lg:p-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl mb-3 text-slate-900">
                Send us a Message
              </h2>
              <p className="text-slate-600">
                Fill out the form below and we'll get back to you as soon as
                possible
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-slate-900 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-slate-900 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="contact"
                    className="block text-slate-900 mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    placeholder="+61 XXX XXX XXX"
                  />
                </div>

                {/* Preferred Office */}
                <div>
                  <label
                    htmlFor="preferredOffice"
                    className="block text-slate-900 mb-2"
                  >
                    Preferred Office
                  </label>
                  <select
                    id="preferredOffice"
                    name="preferredOffice"
                    value={formData.preferredOffice}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    {locations.map((office, index) => (
                      <option key={index} value={office.name}>
                        {office.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-slate-900 mb-2"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all appearance-none cursor-pointer"
                >
                  <option value="General">General</option>
                  <option value="Services">Services</option>
                  <option value="Projects">Projects</option>
                  <option value="Support">Support</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-slate-900 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us more about your project..."
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-xl hover:bg-slate-800 transition-all duration-200 shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        </Reveal>
      </div>

      <Footer />
    </>
  );
}
                                                                                    