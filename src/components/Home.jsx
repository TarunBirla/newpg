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
  const [currentIndex, setCurrentIndex] = useState(0);
  const mainSwiperRef = useRef(null);
  const thumbSwiperRef = useRef(null);

  const sliderRef = useRef(null);
  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  const [hoverTab, setHoverTab] = useState(null);

  const [slides, setSlider] = useState([]);
  const [abouts, setAbouts] = useState([]);
  const [abouts1, setAbouts1] = useState([]);
  const [architech, setArchitech] = useState([]);
  const [section, setSection] = useState([]);
  const [tabsall, setTabsAll] = useState([]);
  const [active, setActive] = useState(null);
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    try {
      const response = await http.get(`/common`);
      console.log("Fetched data:", response.data);
      const Alldata = response.data?.data;
      setNews(Alldata?.news || []);

      setSlider(Alldata?.banners);
      setAbouts(Alldata?.about);
      setAbouts1(Alldata?.chairmanmsg[0]);

      setArchitech(Alldata?.architech);
      setSection(Alldata?.sections[0]);
      setTabsAll(Alldata?.barSections || []);

      // Set first tab active
      if (Alldata?.barSections?.length > 0) {
        setActive(Alldata.barSections[0].id);
      }
    } catch (err) {
      console.error("Error fetching commen data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (mainSwiperRef.current && thumbSwiperRef.current) {
      mainSwiperRef.current.controller.control = thumbSwiperRef.current;
      thumbSwiperRef.current.controller.control = mainSwiperRef.current;
    }
  }, [slides]);
  const sliderRef1 = useRef(null);

  const scrollLeft1 = () => {
    sliderRef1.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight1 = () => {
    sliderRef1.current.scrollBy({ left: 350, behavior: "smooth" });
  };
  // const activeTab = tabsall.find((t) => t.id === active);
  const activeTab = tabsall.find((t) => t.id === (hoverTab ?? active));

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show loader until data arrives
  if (!activeTab) {
    return <div className="text-center py-10">Loading...</div>;
  }

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

const testimonials = [
  {
    image: "/t1.png",

    name: "James Pattinson",
    review:
      "Lobortis leo pretium facilisis amet nisl at nec. Scelerisque risus tortor donec ipsum consequat semper consequat adipiscing ultrices.",
    rating: 5,
  },
  {
    image: "/t2.png",

    name: "Greg Stuart",
    review:
      "Vestibulum, cum nam non amet consectetur morbi aenean condimentum eget. Ultricies integer nunc neque accumsan laoreet.",
    rating: 5,
  },
  {
    image: "/t3.png",
    name: "Trevor Mitchell",
    review:
      "Ut tristique viverra sed porttitor senectus. A facilisis metus pretium ut habitant lorem. Velit vel bibendum eget aliquet sem nec.",
    rating: 4,
  },
   {
    image: "/t2.png",

    name: "Greg Stuart",
    review:
      "Vestibulum, cum nam non amet consectetur morbi aenean condimentum eget. Ultricies integer nunc neque accumsan laoreet.",
    rating: 5,
  },
  {
    image: "/t3.png",
    name: "Trevor Mitchell",
    review:
      "Ut tristique viverra sed porttitor senectus. A facilisis metus pretium ut habitant lorem. Velit vel bibendum eget aliquet sem nec.",
    rating: 4,
  },
];


  return (
    <>
      <Header />

      <section className="relative w-full  h-[50vh] sm:h-[80vh] md:h-[90vh] ">
        {/* MAIN SWIPER */}
        <Swiper
          modules={[Navigation, Pagination, Thumbs, Controller, Autoplay]}
          navigation={false}
          // pagination={false}
          pagination={
            isMobile
              ? {
                  clickable: true,
                }
              : false
          }
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={900}
          onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
          // controller={{ control: thumbSwiperRef.current }}
          // onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id ?? index}>
              <div
                className="relative w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image_url})` }}
              >
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center justify-center px-6">
                  {/* <div className="max-w-xl text-white text-center">
                    <h1
                      className="font-[Syne] font-[400] tracking-[0.01em]
        text-[20px] leading-[46px]
        sm:text-[36px] sm:leading-[38px]
        md:text-[42px] md:leading-[40px]
        lg:text-[42px] lg:leading-[40px]"
                    >
                      {slide.heading}
                    </h1>

                    <div className="flex justify-center gap-4 mt-6">
                      <div>
                        <p
                          className="text-white/90 font-[Poppins] font-[400] tracking-[0.01em]
            text-[10px] leading-[20px]
            sm:text-[18px] sm:leading-[30px]
            md:text-[20px] md:leading-[32px]
            lg:text-[20px] lg:leading-[32px]"
                          dangerouslySetInnerHTML={{
                            __html: slide?.description,
                          }}
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style>
          {`
                  @media (max-width: 768px) {
                  .swiper-pagination-bullet {
                    background: white;
                    opacity: 0.6;
                  }

                  .swiper-pagination-bullet-active {
                    background: #C1FF00;
                    opacity: 1;
                  }
                }

          `}
        </style>
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
    modules={[Navigation, Autoplay]}
    navigation={{
      prevEl: ".custom-prev",
      nextEl: ".custom-next",
    }}
    autoplay={{ delay: 4000 }}
    loop={true}
    className=""
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
                className="w-full h-[350px] object-cover"
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
                
                <button className="bg-[#9FF01C] text-black px-6 py-3 font-semibold hover:scale-105 transition">
                  View Project 
                </button>

                <button className="border border-[#9FF01C] px-6 py-3 font-semibold hover:bg-[#9FF01C] hover:text-black transition">
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
    <div className="grid md:grid-cols-12 gap-8 items-end">

      {/* LEFT BIG CARD */}
      <div className="md:col-span-6 bg-[#0A70B1] rounded-[40px] p-10 relative overflow-hidden min-h-[520px] flex flex-col justify-between">

        <p className="text-white text-lg leading-8 max-w-md">
          Founder and visionary <br/>leader of Premier Group,<br/>
          providing strategic<br/> direction and driving the<br/>
          Group’s mission of<br/> purposeful, sustainable<br/> growth.
        </p>

        <img
          src="/c1.png"
          alt="Founder"
          className="absolute bottom-0 right-0 h-[420px] object-contain"
        />

      </div>

      {/* CENTER CARD */}
      <div className="md:col-span-3 bg-[#0A70B1] rounded-[40px] p-8 relative overflow-hidden min-h-[520px] flex flex-col justify-between">

        <div>
          <p className="text-lime-400 font-medium">
            Managing Director (India)
          </p>
          <h3 className="text-white font-semibold mt-1">
            FARHAN RAZA
          </h3>
        </div>

        <img
          src="/c2.png"
          alt="Director"
          className="absolute bottom-0 right-0 h-[380px] object-contain"
        />

      </div>

      {/* RIGHT CARD */}
      <div className="md:col-span-3 bg-[#0A70B1] rounded-[40px] p-8 relative overflow-hidden min-h-[520px] flex flex-col justify-between">

        <div>
          <p className="text-lime-400 font-medium">
            COO & MD, PG
          </p>
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

    </div>

  </div>
</section>

 <section className="py-20">
  <div className="max-w-6xl mx-auto px-6">

    <p className="text-[#98C20C] font-semibold tracking-widest mb-4">
      TESTIMONIALS
    </p>

    <h2 className="text-4xl md:text-6xl font-semibold text-black mb-16">
     Customer Reviews
    </h2>

    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={1}
      spaceBetween={30}
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

            <div className="flex justify-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-[#98C20C] text-lg">
                  {i < item.rating ? "★" : "☆"}
                </span>
              ))}
            </div>

            <p className="text-gray-600 text-sm leading-6">
              "{item.review}"
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    <div className="flex justify-center items-center gap-6 mt-12 tarun">

      <div className="test-prev cursor-pointer text-gray-600 text-2xl">
        ‹
      </div>

      {/* <div className="test-pagination flex items-center gap-3"></div> */}

      <div className="test-next cursor-pointer text-gray-600 text-2xl">
        ›
      </div>

    </div>

    

  </div>
</section>
<style>
  {
    `
    .custom-dot {
  width: 8px;
  height: 8px;
  background: #d1d5db;
  border-radius: 50%;
  display: inline-block;
}

.custom-dot-active {
  background: #555;
  transform: scale(1.2);
}
    `
  }
</style>


      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* LEFT MAIN POST */}
        <div className="md:col-span-8 space-y-6">
          {/* TOP: FIRST NEWS ITEM AS FEATURED */}
          {news.length > 0 && (
            <div
              onClick={() =>
                navigate(`/news/${news[0]?.id}`, { state: news[0] })
              }
              className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6"
            >
              {/* Left Text Side */}
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

              {/* Right Image Side */}
              <div>
                <img
                  src={news[0]?.image_url}
                  className=" w-full h-70 object-cover"
                />
              </div>
            </div>
          )}

          {/* BOTTOM GRID OF NEWS */}
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

        {/* RIGHT SIDEBAR */}
        <div className="md:col-span-4 space-y-10">
          {/* Search Box */}
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

          {/* Recent News */}
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
