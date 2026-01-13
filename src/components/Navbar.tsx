"use client";

import Image from "next/image";

const Navbar = () => {
  return (
    <nav
      className="
        w-full z-200
        flex items-center justify-between
        px-6 sm:px-10 py-0 mt-4
        "
    >
      {/* LEFT — COLLEGE LOGO */}
      <div className="flex items-center z-10">
        <Image
          src="/logos/mmcoe.jpeg" // 👈 replace
          alt="College Logo"
          width={48}
          height={48}
          priority
          className="opacity-90 rounded-full"
        />
      </div>

      {/* RIGHT — CLUB LOGOS */}
      <div className="flex items-center gap-4 z-10">
        {["neura.jpeg", "cypher.jpeg", "aesa.png"].map((logo, i) => (
          <Image
            key={i}
            src={`/logos/${logo}`} // 👈 replace
            alt={`Club Logo ${i + 1}`}
            width={40}
            height={40}
            className="opacity-70 hover:opacity-100 transition rounded-full"
          />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
