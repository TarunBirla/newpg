import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import http from "../service/http";
import JourneyTimeline from "./JourneyTimeline";

const Abouts = () => {
  return (
    <>
      <Header />

      {/* <section
        className=" hidden md:block relative w-full h-[50vh] md:h-[85vh] bg-contain md:bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Mask group.png')",
        }}
      ></section> */}
      <section
  className="hidden md:flex relative w-full h-[50vh] md:h-[85vh] bg-contain md:bg-cover bg-center bg-no-repeat items-center justify-center"
  style={{
    backgroundImage: "url('/Mask group.png')",
  }}
>

  {/* Overlay optional */}
  <div className="absolute inset-0 bg-black/10"></div>

  {/* Center Text */}
  <h1 className="relative text-white text-5xl md:text-6xl font-bold tracking-wide">
    ABOUT Us
  </h1>

</section>

 <section
        className="block md:hidden relative w-full  h-[50vh] sm:h-[60vh] md:h-[85vh]  bg-cover md:bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Mask group.png')" }}
      >
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">
          <div className="max-w-xl text-white ">
            

            <h1 className="text-3xl md:text-5xl font-bold mb-4">About US</h1>

           
          </div>
        </div>
      </section>
      <section>
        <img src="/img/image.png" className="w-full  object-cover" />
      </section>

      <section>
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 mt-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <p className="text-lime-500 font-semibold tracking-widest mb-2">
              PHILOSOPHY
            </p>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Building Dreams,
              <br />
              Shaping Skylines
            </h2>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <p className="text-gray-800 text-lg leading-relaxed italic">
              “Transforming West Bengal into a hub of education and empowerment,
              Premier Knowledge City is designed to inspire progress and elevate
              lifestyles.”
            </p>
          </div>
        </div>
        <div className="relative max-w-6xl mx-auto px-6 mb-12">
          <p className="text-gray-700 leading-relaxed">
            At Premier Realty, we don’t just build structures—we create
            landmarks that define lifestyles. As one of the most trusted names
            in real estate in Kolkata, Premier Realty is dedicated to delivering
            exceptional homes and commercial spaces that reflect quality,
            integrity, and innovation.
          </p>
          <p className="mt-6 text-gray-700 leading-relaxed">
            With a strong legacy of excellence under the Premier Group, we
            combine decades of industry experience with a forward-thinking
            approach to redefine modern living. Every project we undertake is a
            testament to our unwavering commitment to craftsmanship, customer
            satisfaction, and sustainability.
          </p>
        </div>
      </section>
      <section className=" py-16 ">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
           {/* ========== VISION BLOCK ========== */}
    <div className="flex items-stretch gap-10">

      {/* ================= RIBBON ================= */}
      <div className="relative w-[80px] flex-shrink-0">

        {/* Blue Back Depth Layer */}
        <div
          className="absolute left-3 top-0 w-full h-full bg-[#0A70B1]"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 10%, 100% 90%, 50% 100%, 0% 90%, 0% 10%)",
          }}
        ></div>

        {/* Green Main Ribbon */}
        <div
          className="relative bg-[#95C10C] h-full flex items-center justify-center"
          style={{
            minHeight: "300px",
            clipPath:
              "polygon(50% 0%, 100% 10%, 100% 90%, 50% 100%, 0% 90%, 0% 10%)",
          }}
        >
          {/* White Vertical Line */}
          <div className="absolute top-12 bottom-12 left-1/2 w-[2px] bg-white -translate-x-1/2 opacity-70"></div>

          {/* Vertical Text */}
          <span className="rotate-[-90deg] text-black font-semibold text-2xl tracking-wide whitespace-nowrap">
            Our Vision
          </span>
        </div>
      </div>

      {/* ================= CONTENT BOX ================= */}
      <div className="bg-[#0A70B1] text-white p-12 rounded-2xl shadow-2xl flex-1">
        <p className="text-lg leading-relaxed">
          Our vision is to be the most trusted and preferred real estate
          developer in Kolkata, creating spaces that inspire lifestyles,
          empower communities, and stand the test of time. We aim to blend
          innovation, sustainability, and quality to shape the city’s skyline
          with integrity and lasting value.
        </p>
      </div>

    </div>

          {/* ========== MISSION ========== */}
          <div className="relative flex items-center">
            {/* Ribbon */}
            <div className="relative z-10">
              <div className="w-16  bg-lime-500 py-10 flex items-center justify-center shadow-lg relative">
                {/* Top Triangle */}
                <div className="absolute -top-6 left-0 w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-b-[24px] border-b-blue-700"></div>

                {/* Bottom Triangle */}
                <div className="absolute -bottom-6 left-0 w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-t-[24px] border-t-blue-700"></div>

                <span className="rotate-[-90deg] text-black font-semibold tracking-wide text-lg whitespace-nowrap">
                  Our Mission
                </span>
              </div>
            </div>

            {/* Content Box */}
            <div className=" bg-[#1f6fa5] text-white p-10 rounded-xl shadow-xl w-full">
              <ul className="space-y-4 list-disc pl-6 text-lg">
                <li>
                  To design and deliver world-class residential and commercial
                  projects.
                </li>
                <li>
                  To integrate innovation and sustainability into every stage of
                  development.
                </li>
                <li>
                  To ensure transparency, trust, and long-term value for every
                  client.
                </li>
                <li>
                  To contribute to Kolkata’s urban transformation with modern,
                  responsible development.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative w-full h-[250px] md:h-[350px] mb-12 bg-contain bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('/bgimghappy.png')", // yaha apni image path dalo
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Stats Content */}
        <div className="relative max-w-6xl mx-auto w-full px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center text-white gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold">10+</h2>
              <p className="uppercase tracking-widest text-sm mt-2">
                Projects Ongoing
              </p>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold">1,200+</h2>
              <p className="uppercase tracking-widest text-sm mt-2">
                Happy Clients
              </p>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold">85+</h2>
              <p className="uppercase tracking-widest text-sm mt-2">
                Team Members
              </p>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold">6</h2>
              <p className="uppercase tracking-widest text-sm mt-2">
                Awards Won
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Abouts;
