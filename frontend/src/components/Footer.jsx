import React from "react";

export default function Footer() {
  return (
    <footer className="mt-20 w-full text-center text-white text-sm opacity-90 font-poppins px-4 pb-6">
      <p className="mb-1">
        Dibuat dengan ❤️ menggunakan React, Tailwind CSS & Framer Motion.
      </p>
      <p className="mb-1">
        Aplikasi ini bertujuan untuk mengenali jenis hewan peliharaan dari gambar
        menggunakan teknologi AI.
      </p>
      <p>
        Punya pertanyaan atau saran?{" "}
        <a
          href="mailto:ihksanbalany@gmail.com"
          className="underline hover:text-[#96CDFF] transition-colors"
        >
          Hubungi saya
        </a>
      </p>
    </footer>
  );
}
