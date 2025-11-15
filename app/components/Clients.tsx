"use client";
import { motion } from "framer-motion";

export default function Clients() {
  const clients = ["ae_smith.png", "air_master.png", "ambient_services.jpg", "amin_group.png","climatech.png", "equilibrium.jpg", "fredon.jpg", "Icon_mechanical_services.png", "jec_airconditioning.jpg","metalair_sheetmetal.png", "precise_air.png", "protech.png", "Icon_mechanical_services.png", "redstar.jpg","seda_services_logo.jpg","varium.png"];

  return (
    <section className="py-20 bg-gradient-to-br from-sky-50 text-center overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Trusted by Industry Leaders
        </h2>
        <p className="text-slate-600 mb-12">
          Partnering with global brands to deliver excellence
        </p>

        {/* Slider Wrapper */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 15,
            }}
          >
            {/* Duplicate the list to create infinite scroll effect */}
            {[...clients, ...clients].map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-40 h-28 rounded-1xl bg-gray-50 shadow-md hover:shadow-lg flex items-center justify-center transition-all"
              >
                <img
                  src={`/img/client/${logo}`}
                  alt={logo.replace(".PNG", "")}
                  className="h-14 object-contain transition"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
