import React, { useEffect, useState } from "react";
import { Calendar, Search, Instagram, Linkedin } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import http from "../service/http";
import { useNavigate } from "react-router-dom";
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
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    try {
      const response = await http.get(`/common`);
      const Alldata = response.data?.data;
      setNews(Alldata?.news || []);
    } catch (err) {
      console.error("Error fetching common data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

   const slide = [
  {
    image: "/slide.jpg", // apni image path
    title: "Kalim Premier Pride",
    description:
      "Premier Realty’s brochure showcases our exclusive real estate projects in Kolkata, featuring modern architecture, premium amenities, and sustainable designs. It reflects our commitment to quality, innovation, and trust — offering elegant living and commercial spaces that redefine urban lifestyles in the heart of the city.",
  },
  {
    image: "/slide.jpg",
    title: "Luxury Sky Heights",
    description:
      "Experience a new era of luxury living with world-class amenities and prime city connectivity designed for comfort and elegance.",
  },
];
  return (
    <>
      <Header />

      {/* Hero Banner */}
      <section
        className="hidden md:block relative w-full h-[85vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/Mask group.png')" }}
      />

      <section
        className="block md:hidden relative w-full  h-[50vh] sm:h-[60vh] md:h-[85vh]  bg-cover md:bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/news.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">
          <div className="max-w-xl text-white">
            <div className="flex items-center gap-2">
              <span className="w-15 h-[2px] bg-[#40BD02]"></span>
              <p className="text-sm text-gray-200">News & Updates</p>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              News & Updates
            </h1>

            {/* <div className="flex gap-3 items-start">
              <div className="w-[2px] bg-[#40BD02] h-20 mt-4"></div>

              <p className="text-gray-200 leading-relaxed text-sm md:text-base max-w-md">
               Building a future where progress meets responsibility Premier Group leads with purpose, innovation, and a commitment to sustainable growth.
              </p>
            </div> */}
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
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="rounded-lg"
        >
          {slide.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[#0A70B1] p-4 md:p-5 ">
                
                <div className="grid md:grid-cols-12 gap-10 items-center">
      
                  {/* LEFT IMAGE */}
                  <div className="md:col-span-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[350px] object-cover rounded-md"
                    />
                  </div>
      
                  {/* RIGHT CONTENT */}
                  <div className="text-white md:col-span-6">
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-lime-400 mb-4">
                      {item.title}
                    </h2>
      
                    <p className="text-white/90 leading-relaxed mb-6">
                      {item.description}
                    </p>
      
                    <div className="flex gap-4 flex-wrap">
                      
                      <button className="bg-[#9FF01C] rounded-md text-black px-6 py-3 font-semibold hover:scale-105 transition">
                        View Project 
                      </button>
      
                      <button className="border rounded-md border-[#9FF01C] px-6 py-3 font-semibold hover:bg-[#9FF01C] hover:text-black transition">
                        Download Brochure
                      </button>
      
                    </div>
      
                  </div>
      
                </div>
      
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Navigation Buttons */}
        <div className="flex justify-center items-center gap-2 mt-8">
          
          <div className="custom-prev w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
            ‹
          </div>
      
          <div className="custom-next w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
            ›
          </div>
      
        </div>
      
      </section>

      <Footer />
    </>
  );
};

export default Projects;
