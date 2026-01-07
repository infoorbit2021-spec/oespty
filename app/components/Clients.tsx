"use client";
import { motion } from "framer-motion";

export default function Clients() {
  const clients = ["ae_smith.png", "air_master.png", "ambient_services.jpg", "amin_group.PNG","climatech.png", "equilibrium.jpg", "fredon.jpg",  "jec_airconditioning.jpg","metalair_sheetmetal.png", "precise_air.png", "protech.png",  "redstar.jpg","seda_services_logo.jpg","varium.png"];

  return (
    <section className="py-20 bg-white text-center overflow-hidden">
      <div className=" mx-auto px-6">
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
            animate={{ rotate: [0, 360] }}
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
                className="flex-shrink-0 w-40 h-28 rounded-1xl flex items-center justify-center transition-all"
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
