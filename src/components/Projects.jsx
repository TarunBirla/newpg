import React, { useEffect, useState } from "react";
import { Calendar, Search, Instagram, Linkedin } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import http from "../service/http";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Thumbs,
  Controller,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Projects = () => {
  const [slide, setSlider] = useState([]);

  const fetchData = async () => {
    try {
      const response = await http.get(`/common`);
      const Alldata = response.data?.data;
      setSlider(Alldata?.project || []);
    } catch (err) {
      console.error("Error fetching common data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  // const slide = [
  //   {
  //     image: "/slide.jpg", // apni image path
  //     title: "Kalim Premier Pride",
  //     description:
  //       "Premier Realty’s brochure showcases our exclusive real estate projects in Kolkata, featuring modern architecture, premium amenities, and sustainable designs. It reflects our commitment to quality, innovation, and trust — offering elegant living and commercial spaces that redefine urban lifestyles in the heart of the city.",
  //   },
  //   {
  //     image: "/slide.jpg",
  //     title: "Luxury Sky Heights",
  //     description:
  //       "Experience a new era of luxury living with world-class amenities and prime city connectivity designed for comfort and elegance.",
  //   },
  // ];
  return (
    <>
      <Header />

      {/* Hero Banner */}
      {/* <section
        className="hidden md:block relative w-full h-[85vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/Mask group.png')" }}
      /> */}
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
          PROJECTS
        </h1>
      </section>

      <section
        className="block md:hidden relative w-full  h-[50vh] sm:h-[60vh] md:h-[85vh]  bg-cover md:bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Mask group.png')" }}
      >
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">
          <div className="max-w-xl text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Projects</h1>
          </div>
        </div>
      </section>

      {/* Middle Image */}
      <section>
        <img src="/img/image.png" className="w-full  object-cover" />
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-10 py-5">
        <div className="text-center py-5 mb-10">
          <h1 className="text-4xl md:text-6xl font-bold">All Projects</h1>
          <p className="mt-2 text-gray-600">Building dreams since 1985</p>

          {/* Search Input */}
          <div className="mt-6 flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-3 pl-5 pr-12  bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0A70B1]"
              />

              {/* Search Icon */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0A70B1] p-2 rounded-full cursor-pointer hover:scale-105 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m1.6-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="projectSwiper rounded-lg"
        >
          {slide.map((item, index) => (
            <SwiperSlide key={index} className="h-full">
              <div className="bg-[#0A70B1] p-4 md:p-5 h-full flex flex-col justify-between">
                <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-center">
                  {/* LEFT IMAGE */}
                  <div className="md:col-span-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[220px] md:h-[350px] rounded-lg object-cover"
                    />
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className="text-white md:col-span-6 flex flex-col justify-between">
                    <h2 className="text-2xl md:text-4xl font-bold text-lime-400 mb-3">
                      {item.title}
                    </h2>

                    <div
                      // className="text-white/90 leading-relaxed mb-4 text-sm md:text-base"
                      className="text-white/90 leading-relaxed mb-4 min-h-[250px]"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />

                    <div className="flex gap-3 flex-wrap mt-auto">
                      <Link to={`/projectdetails/${item.title}`}>
                        <button className="flex items-center gap-2 bg-[#9FF01C] rounded-lg text-black px-5 py-2 font-semibold hover:scale-105 transition">
                          <span>View Project</span>
                          <img src="/Vector (1).png" alt="" />
                        </button>
                      </Link>

                      <button className="flex items-center gap-2 rounded-lg border border-[#9FF01C] px-5 py-2 font-semibold hover:bg-[#9FF01C] hover:text-black transition">
                        <img src="/Vector (2).png" alt="" />
                        <span>Download Brochure</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Navigation Buttons */}
        <div className="hidden md:flex justify-center items-center gap-2 mt-8">
          <div className="custom-prev w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
            ‹
          </div>

          <div className="custom-next w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
            ›
          </div>
        </div>
      </section>
      <style>
        {`
    .projectSwiper .swiper-pagination {
  position: relative;
  margin-top: 20px;
}

/* Mobile dots show */
.projectSwiper .swiper-pagination {
  display: flex;
  justify-content: center;
}

/* Desktop dots hide */
@media (min-width: 768px) {
  .projectSwiper .swiper-pagination {
    display: none;
  }
}
          `}
      </style>

      <Footer />
    </>
  );
};

export default Projects;
