import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const ProjectDetails = () => {
  return (
    <>
      <Header />

         <section
  className="hidden md:flex relative w-full h-[50vh] md:h-[85vh] bg-contain md:bg-cover bg-center bg-no-repeat items-center justify-center"
  style={{
    backgroundImage: "url('/Mask group.png')",
  }}
>

  {/* Overlay optional */}
  <div className="absolute inset-0 bg-black/10"></div>

  {/* Center Text */}
  <h1 className="relative text-[#9FF01C] text-5xl md:text-6xl font-bold tracking-wide uppercase ">
   Kalim Premier Pride
  </h1>

</section>
      <section>
        <img src="/img/image.png" className="w-full  object-cover" />
      </section>

     <section className="py-16 bg-white">
  {/* Heading */}
  <h2 className="text-center text-4xl font-bold mb-12">Overview</h2>

  <div className="space-y-8">

    {/* ===== BLUE ARROW ===== */}
    <div className="w-full">
      <div
        className="bg-[#0A6FB1] text-white px-16 py-8"
        style={{
          clipPath: "polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%)",
        }}
      >
        <p className="text-lg leading-relaxed max-w-6xl">
          Premier Realty stands as one of Kolkata’s most trusted and progressive
          real estate developers, known for shaping the city’s skyline with
          excellence, innovation, and integrity. With a strong foundation built
          on quality craftsmanship and customer trust, Premier Realty has been
          consistently delivering projects that blend<br/> modern architecture with
          sustainable living.
        </p>
      </div>
    </div>

    {/* ===== GREEN ARROW ===== */}
    <div className="w-full">
      <div
        className="bg-[#95C10C] text-black px-16 py-8"
        style={{
          clipPath: "polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%)",
        }}
      >
        <p className="text-lg leading-relaxed max-w-6xl">
          Each development is thoughtfully designed to provide a perfect balance
          of luxury, functionality, and connectivity – offering residents and
          investors spaces that truly enhance their lifestyle and long-term
          value. From premium residential complexes to cutting-edge commercial
          spaces, every project reflects meticulous<br/> attention to detail and a
          commitment to excellence.
        </p>
      </div>
    </div>

    {/* ===== BLUE ARROW ===== */}
    <div className="w-full">
      <div
        className="bg-[#0A6FB1] text-white px-16 py-8"
        style={{
          clipPath: "polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%)",
        }}
      >
        <p className="text-lg leading-relaxed max-w-6xl">
          Driven by a vision to redefine urban living in Kolkata, Premier Realty
          integrates advanced design practices, green building concepts, and
          contemporary amenities to create communities that inspire growth and
          well-being. Our focus on transparency, on-time delivery, and customer
          satisfaction continues to position us as a preferred choice for
          homebuyers and investors seeking trusted real estate solutions in
          Kolkata.
        </p>
      </div>
    </div>

  </div>
</section>

      <section className=" py-16 ">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 px-6 items-center">
          {/* ================= LEFT MAP IMAGE ================= */}
          <div className="flex justify-center">
            <img
              src="/mapimg.png" // apni image path yaha daalo
              alt="Project Map"
              className="w-full max-w-md object-contain"
            />
          </div>

          {/* ================= RIGHT FORM CARD ================= */}
          <div className="bg-[#1f6fa5] text-white p-10 rounded-2xl ">
            <p className="text-sm opacity-80">Get In Touch</p>

            <h2 className="text-3xl font-bold mb-4">Let's Discuss Projects</h2>

            <p className="text-sm opacity-80 mb-8">
              Have a question for us? Drop us a message and we'll be in touch.
            </p>

            <form className="space-y-6">
              {/* Name */}
              <div>
                <label className="text-sm opacity-80">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-transparent border-b border-white/40 py-2 focus:outline-none focus:border-lime-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm opacity-80">Email</label>
                <input
                  type="email"
                  placeholder="abc@gmail.com"
                  className="w-full bg-transparent border-b border-white/40 py-2 focus:outline-none focus:border-lime-400"
                />
              </div>

              {/* Dropdown Row */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm opacity-80">Project Type</label>
                  <select className="w-full bg-transparent border-b border-white/40 py-2 focus:outline-none focus:border-lime-400">
                    <option className="text-black">Residential</option>
                    <option className="text-black">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm opacity-80">Select Budget</label>
                  <select className="w-full bg-transparent border-b border-white/40 py-2 focus:outline-none focus:border-lime-400">
                    <option className="text-black">10L - 50L</option>
                    <option className="text-black">50L - 1Cr</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm opacity-80">Message</label>
                <textarea
                  rows="3"
                  className="w-full bg-transparent border-b border-white/40 py-2 focus:outline-none focus:border-lime-400"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-white text-lime-600 font-semibold py-3  hover:bg-lime-400 hover:text-black transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProjectDetails;
