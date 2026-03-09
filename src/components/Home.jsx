import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Swiper
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

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Header from "./Header";
import Footer from "./Footer";
import GlobalMap from "./GlobalMap";
import NewsSection from "./NewsSection";
import http from "../service/http";
import { Calendar, Search } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();


 

  const [slides, setSlider] = useState([]);
  const [projects, serProjects] = useState([]);
 
  const [architech, setArchitech] = useState([]);

  const [news, setNews] = useState([]);
  const [testimonials, setTetimoonials] = useState([]);

  const fetchData = async () => {
    try {
      const response = await http.get(`/common`);
      console.log("Fetched data:", response.data);
      const Alldata = response.data?.data;
      setNews(Alldata?.news || []);
serProjects(Alldata?.project);
      setSlider(Alldata?.banners);
    
setTetimoonials(Alldata?.testimonials);
      setArchitech(Alldata?.architech);

     
    } catch (err) {
      console.error("Error fetching commen data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <>
      <Header />

      <section className="hidden md:flex relative w-full h-[50vh] md:h-[85vh] bg-contain md:bg-cover bg-center bg-no-repeat items-center justify-center">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {slides?.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative w-full h-[55vh] md:h-[90vh] bg-cover bg-center flex items-center justify-center"
                style={{
                  backgroundImage: `url(${slide.image_url})`,
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Text Content */}
                <div className="relative z-10 text-center text-white px-6 max-w-5xl">
                  <h1 className="text-3xl md:text-6xl font-bold mb-4">
                    {slide.heading}
                  </h1>

                  <div
                    className="text-sm md:text-lg opacity-90"
                    dangerouslySetInnerHTML={{ __html: slide.description }}
                  ></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="block md:hidden relative w-full h-[50vh] sm:h-[60vh] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {slides?.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="relative w-full h-[50vh] sm:h-[60vh] bg-cover bg-center flex items-center"
                style={{ backgroundImage: `url(${slide.image_url})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Text */}
                <div className="relative z-10 max-w-6xl mx-auto px-6">
                  <div className="max-w-xl text-white">
                    <h1 className="text-3xl font-bold mb-4">{slide.heading}</h1>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section>
        <img src="/img/image.png" className="w-full  object-cover" />
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-10 py-5">
        <div className="text-center  py-5">
          <h1 className="text-4xl md:text-6xl">Projects</h1>
          <p>Building dreams since 2009</p>
        </div>
      <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  navigation={{
    prevEl: ".custom-prev",
    nextEl: ".custom-next",
  }}
  pagination={{ clickable: true }}
  autoplay={{ delay: 4000 }}
  loop={true}
  className="projectSwiper"
>
          {projects.map((item, index) => (

<SwiperSlide key={index} className="h-full">
  <div className="bg-[#0A70B1] p-4 md:p-5 h-full flex flex-col justify-between">
    <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-center">

      {/* LEFT IMAGE */}
      <div className="md:col-span-6">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-[220px] md:h-[350px] object-cover"
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
            <button className="flex items-center gap-2 bg-[#9FF01C] text-black px-5 py-2 font-semibold hover:scale-105 transition">
              <span>View Project</span>
              <img src="/Vector (1).png" alt="" />
            </button>
          </Link>

          <button className="flex items-center gap-2 border border-[#9FF01C] px-5 py-2 font-semibold hover:bg-[#9FF01C] hover:text-black transition">
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
        {
          `
          .projectSwiper .swiper-pagination {
  margin-top: 20px;
  position: relative;
}
  /* Mobile me dots show */
.projectSwiper .swiper-pagination {
  display: block;
}

/* Desktop me dots hide */
@media (min-width: 768px) {
  .projectSwiper .swiper-pagination {
    display: none;
  }
}
          `
        }
      </style>

      <section className="bg-[#F3F3F3] py-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Top Text */}
          <p className="text-[#98C20C] font-semibold tracking-widest mb-4">
            COMPANY
          </p>

          <h2 className="text-4xl md:text-6xl font-semibold text-black mb-16">
            Architects of Growth
          </h2>

          {/* Cards Grid */}
          {/* <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-6 bg-[#0A70B1] rounded-[40px] p-10 relative overflow-hidden min-h-[520px] flex flex-col justify-between">
              <p className="text-white text-lg leading-8 max-w-md">
                Founder and visionary <br />
                leader of Premier Group,
                <br />
                providing strategic
                <br /> direction and driving the
                <br />
                Group’s mission of
                <br /> purposeful, sustainable
                <br /> growth.
              </p>

              <img
                src="/c1.png"
                alt="Founder"
                className="absolute bottom-0 right-0 h-[420px] object-contain"
              />
            </div>

            <div className="md:col-span-3 bg-[#0A70B1] rounded-[40px] p-8 relative overflow-hidden min-h-[520px] flex flex-col justify-between">
              <div>
                <p className="text-lime-400 font-medium">
                  Managing Director (India)
                </p>
                <h3 className="text-white font-semibold mt-1">FARHAN RAZA</h3>
              </div>

              <img
                src="/c2.png"
                alt="Director"
                className="absolute bottom-0 right-0 h-[380px] object-contain"
              />
            </div>

            <div className="md:col-span-3 bg-[#0A70B1] rounded-[40px] p-8 relative overflow-hidden min-h-[520px] flex flex-col justify-between">
              <div>
                <p className="text-lime-400 font-medium">COO & MD, PG</p>
                <h3 className="text-white font-semibold mt-1">
                  Tanveer Siddiqui
                </h3>
              </div>

              <img
                src="/c3.png"
                alt="COO"
                className="absolute bottom-0 right-0 h-[380px] object-contain"
              />
            </div>
          </div> */}
          <div className="hidden md:grid md:grid-cols-12 gap-8 items-end">

  {architech[0] && (
    <div className="md:col-span-6 bg-[#0A70B1] rounded-[40px] p-10 relative overflow-hidden min-h-[520px] flex flex-col justify-between">

      <div
        className="text-white text-lg leading-8 max-w-md"
        dangerouslySetInnerHTML={{
          __html: architech[0].description,
        }}
      />

      <img
        src={architech[0].image_url}
        alt={architech[0].name}
        className="absolute bottom-0 right-0 h-[420px] object-contain"
      />
    </div>
  )}

  {architech[2] && (
    <div className="md:col-span-3 bg-[#0A70B1] rounded-[40px] p-8 relative overflow-hidden min-h-[520px] flex flex-col justify-between">

      <div>
        <p className="text-lime-400 font-medium">
          {architech[2].designation}
        </p>
        <h3 className="text-white font-semibold mt-1">
          {architech[2].name}
        </h3>
      </div>

      <img
        src={architech[2].image_url}
        alt={architech[2].name}
        className="absolute bottom-0 right-0 h-[380px] object-contain"
      />
    </div>
  )}

  {architech[1] && (
    <div className="md:col-span-3 bg-[#0A70B1] rounded-[40px] p-8 relative overflow-hidden min-h-[520px] flex flex-col justify-between">

      <div>
        <p className="text-lime-400 font-medium">
          {architech[1].designation}
        </p>
        <h3 className="text-white font-semibold mt-1">
          {architech[1].name}
        </h3>
      </div>

      <img
        src={architech[1].image_url}
        alt={architech[1].name}
        className="absolute bottom-0 right-0 h-[380px] object-contain"
      />
    </div>
  )}

</div>
{/* Mobile Slider */}
<div className="block md:hidden">

<Swiper
  modules={[Pagination, Autoplay]}
  pagination={{ clickable: true }}
  autoplay={{ delay: 3500 }}
  loop={true}
  className="architechSwiper"
>

  {architech.map((item, index) => (
    <SwiperSlide key={index}>

      <div className="bg-[#0A70B1] rounded-[30px] p-8 relative overflow-hidden min-h-[420px] flex flex-col justify-between">

        <div>
          <p className="text-lime-400 font-medium">
            {item.designation}
          </p>

          <h3 className="text-white font-semibold mt-1 mb-4">
            {item.name}
          </h3>

          <div
            className="text-white text-sm leading-6"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </div>

        <img
          src={item.image_url}
          alt={item.name}
          className="absolute bottom-0 right-0 h-[260px] object-contain"
        />

      </div>

    </SwiperSlide>
  ))}

</Swiper>

</div>
        </div>
      </section>
      <style>
        {
          `
          .architechSwiper .swiper-pagination {
  position: relative;
  margin-top: 20px;
}

.architechSwiper .swiper-pagination-bullet {
  background: #FFF;
  opacity: 0.5;
}

.architechSwiper .swiper-pagination-bullet-active {
  background: #0A70B1;
  opacity: 1;
}
          `
        }
      </style>


      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#98C20C] font-semibold tracking-widest mb-4">
            TESTIMONIALS
          </p>

          <h2 className="text-4xl md:text-6xl font-semibold text-black mb-16">
            Customer Reviews
          </h2>

        <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  slidesPerView={1}
  spaceBetween={30}
  autoplay={{ delay: 3500 }}
  navigation={{
    prevEl: ".test-prev",
    nextEl: ".test-next",
  }}
  pagination={{
    el: ".test-pagination",
    clickable: true,
    bulletClass: "custom-dot",
    bulletActiveClass: "custom-dot-active",
  }}
  breakpoints={{
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
>
           {testimonials.map((item, index) => (
  <SwiperSlide key={index}>
    <div className="bg-white border border-[#98C20C] p-10 text-center h-full">

      <div className="flex justify-center mb-6">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      <h3 className="text-blue-600 font-semibold text-lg mb-3">
        {item.name}
      </h3>

      {/* Rating */}
      <div className="flex justify-center mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-[#98C20C] text-lg">
            {i < item.rating ? "★" : "☆"}
          </span>
        ))}
      </div>

      {/* Message */}
      <div
        className="text-gray-600 text-sm leading-6"
        dangerouslySetInnerHTML={{ __html: item.message }}
      />

    </div>
  </SwiperSlide>
))}
          </Swiper>
          <div className="test-pagination flex justify-center gap-3 mt-6 md:hidden"></div>

          <div className="hidden md:flex justify-center items-center gap-6 mt-12">
  <div className="test-prev cursor-pointer text-gray-600 text-2xl">
    ‹
  </div>

  <div className="test-next cursor-pointer text-gray-600 text-2xl">
    ›
  </div>
</div>
        </div>
      </section>
      <style>
        {`
    .custom-dot {
  width: 8px;
  height: 8px;
  background: #d1d5db;
  border-radius: 50%;
  display: inline-block;
}

.custom-dot-active {
  background: #0A70B1;
  transform: scale(1.2);
}
    `}
      </style>

      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-8 space-y-6">
          {news.length > 0 && (
            <div
              onClick={() =>
                navigate(`/news/${news[0]?.id}`, { state: news[0] })
              }
              className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6"
            >
              <div>
                <h2 className="text-3xl font-bold leading-snug">
                  {news[0]?.title}
                </h2>

                <div className="flex items-center text-gray-600 gap-2 text-sm">
                  <Calendar size={18} />
                  <span>
                    {new Date(news[0]?.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <p
                  className="text-gray-700 text-[15px] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: news[0]?.description }}
                ></p>
              </div>

              <div>
                <img
                  src={news[0]?.image_url}
                  className=" w-full h-70 object-cover"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-3">
            {news.slice(1, 4).map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/news/${item.id}`, { state: item })}
                className=""
              >
                <img
                  src={item.image_url}
                  className=" mb-3 w-full h-32 object-cover"
                />

                <h3 className="font-semibold text-[15px] leading-snug">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                  <Calendar size={16} />{" "}
                  {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-4 space-y-10">
          <div>
            <h4 className="font-semibold mb-2">Search</h4>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 px-3 py-2"
              />
              <Search
                className="absolute right-3 top-2.5 text-gray-500"
                size={18}
              />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Recent News & Updates</h4>
            <div className="space-y-4">
              {news.slice(0, 3).map((item, index) => (
                <div key={index} className="flex gap-3">
                  <img
                    src={item.image_url}
                    className="w-20 h-16  object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      {item.title}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
