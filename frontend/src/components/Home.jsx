import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";


const features = [
  {
    icon: "🐾",
    title: "Prediksi Akurat",
    desc: "Model AI kami sudah dilatih dengan ribuan gambar untuk hasil terbaik.",
  },
  {
    icon: "⚡",
    title: "Cepat & Responsif",
    desc: "Upload gambar dan dapatkan prediksi dalam hitungan detik.",
  },
  {
    icon: "🔒",
    title: "Privasi Terjaga",
    desc: "Gambar Anda tidak disimpan dan hanya diproses sementara.",
  },
];

const testimonials = [
  {
    name: "Siamese Cat",
    comment: "Salah satu kucing paling elegan dan cerdas, cocok untuk teman keluarga.",
  },
  {
    name: "Persian Cat",
    comment: "Kucing berbulu panjang yang manja dan sangat disukai banyak orang.",
  },
  {
    name: "Maine Coon",
    comment: "Kucing besar dan ramah, jadi favorit untuk peliharaan di rumah.",
  },
  {
    name: "Golden Retriever",
    comment: "Anjing setia dan penyayang, ideal untuk keluarga aktif.",
  },
  {
    name: "Labrador Retriever",
    comment: "Anjing pintar dan mudah dilatih, sangat populer di seluruh dunia.",
  },
  {
    name: "Bulldog",
    comment: "Dengan wajah unik dan sifatnya yang lembut, sangat digemari banyak orang.",
  },
];

export default function Home() {
  const [testiIndex, setTestiIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestiIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-start items-center px-6 bg-gradient-to-br from-[#69DDFF] to-[#DBBADD] pt-16 pb-16 font-poppins">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');

          .text-gradient {
            background: linear-gradient(90deg, #ffffff, #e0eaff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .text-glow {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
          }
        `}
      </style>

      <motion.h1
        className="text-5xl font-extrabold italic text-gradient text-glow tracking-wide drop-shadow-lg text-center max-w-4xl leading-tight"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Selamat Datang di Prediksi Hewan Peliharaan
      </motion.h1>

      <motion.p
        className="text-white text-lg max-w-xl text-center mb-12 drop-shadow-md mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Upload gambar anjing atau kucing, dan dapatkan prediksi secara cepat dan akurat.
      </motion.p>

      <motion.div
  className="flex gap-16 mb-12"
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ delay: 1.6, duration: 0.7, ease: "easeOut" }}
>
  {[
    {
      src: "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=2670&auto=format&fit=crop",
      alt: "kucing",
      rotate: 10,
    },
    {
      src: "https://images.unsplash.com/photo-1558929996-da64ba858215?q=80&w=2673&auto=format&fit=crop",
      alt: "anjing",
      rotate: -10,
    },
  ].map(({ src, alt, rotate }, index) => (
    <motion.div
      key={index}
      className="relative w-52 h-52 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white bg-opacity-10 backdrop-blur-lg transition-transform duration-300"
      whileHover={{ scale: 1.15, rotate }}
      whileTap={{ scale: 0.95, rotate: 0 }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 rounded-full ring-2 ring-white/40 animate-pulse pointer-events-none" />
    </motion.div>
  ))}
</motion.div>


      <Link
        to="/predict"
        className="bg-white text-[#69DDFF] font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-[#96CDFF] hover:text-white transition-colors duration-300 mb-20"
      >
        Mulai Prediksi
      </Link>

      <section className="max-w-5xl w-full mb-20">
        <h2 className="text-3xl font-bold text-white mb-10 text-center drop-shadow-md">
          Kenapa Memilih Kami?
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-12">
          {features.map(({ icon, title, desc }, i) => (
            <motion.div
              key={i}
              className="bg-white bg-opacity-20 rounded-xl p-6 flex flex-col items-center text-center text-white shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 + i * 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-6xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-xl w-full">
        <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-md">
          Top Tier Anjing & Kucing
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={testiIndex}
            className="bg-white bg-opacity-20 rounded-lg p-8 text-white shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <p className="italic mb-4">"{testimonials[testiIndex].comment}"</p>
            <p className="font-semibold">- {testimonials[testiIndex].name}</p>
          </motion.div>
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
}
