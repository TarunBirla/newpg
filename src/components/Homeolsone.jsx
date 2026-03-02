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

  const fetchData = async () => {
    try {
      const response = await http.get(`/common`);
      console.log("Fetched data:", response.data);
      const Alldata = response.data?.data;
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

  // Show loader until data arrives
  if (!activeTab) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <>
      <Header />

      <section className="relative w-full  h-[65vh] sm:h-[80vh] md:h-[90vh] ">
        {/* MAIN SWIPER */}
        <Swiper
          modules={[Navigation, Pagination, Thumbs, Controller, Autoplay]}
          navigation={false}
          pagination={false}
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

                <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">
                  <div className="max-w-xl text-white">
                    {/* <h1 className="text-4xl md:text-6xl font-bold ">
                      {slide.heading}
                    </h1> */}

                    <h1
                      className="text-white font-[Syne] font-[700] tracking-[0.01em]
                        text-[42px] leading-[46px]
                        sm:text-[56px] sm:leading-[58px]
                        md:text-[72px] md:leading-[70px]
                        lg:text-[72px] lg:leading-[70px]"
                    >
                      {slide.heading}
                    </h1>

                    <div className="flex items-start gap-4 ml-8 mt-6 ">
                      {/* Green vertical line */}
                      <div className="w-[3px] bg-[#C1FF00] self-stretch"></div>

                      {/* Right content (text + button) */}
                      <div className="flex flex-col">
                        <p
                          className="text-white/90 font-[Poppins] font-[400] tracking-[0.01em]
                            text-[16px] leading-[26px]
                            sm:text-[18px] sm:leading-[30px]
                            md:text-[20px] md:leading-[32px]
                            lg:text-[20px] lg:leading-[32px]"
                          dangerouslySetInnerHTML={{
                            __html: slide?.description,
                          }}
                        />

                        <Link
                          to="/business"
                          className="mt-6 inline-block w-fit px-6 py-2 text-sm font-semibold text-white
                 bg-gradient-to-r from-[#40BD02] to-[#37B8E1]
                 hover:scale-105 transition"
                        >
                          Know More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className=" hidden md:flex absolute bottom-20 left-2/5 -translate-x-1/2 z-20 flex items-center gap-5">
          <div className="w-[200px] h-[2px] bg-white/80"></div>

          <button
            onClick={() => mainSwiperRef.current.slidePrev()}
            className="w-10 h-10 flex items-center justify-center 
                border border-white/60 
               text-white hover:bg-white/20 transition"
          >
            <FaChevronLeft size={16} />
          </button>

          <button
            onClick={() => mainSwiperRef.current.slideNext()}
            className="w-10 h-10 flex items-center justify-center 
                bg-[#C1FF00] 
               text-black hover:scale-105 transition"
          >
            <FaChevronRight size={16} />
          </button>
        </div>

        <div className="hidden lg:block absolute bottom-8 right-[-5px] w-[520px] z-20">
          <Swiper
            modules={[Navigation, Thumbs, Controller]}
            slidesPerView={3}
            spaceBetween={18}
            onSwiper={(swiper) => (thumbSwiperRef.current = swiper)}
            // controller={{ control: mainSwiperRef.current }}
            watchSlidesProgress
            slideToClickedSlide
          >
            {slides.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  onClick={() => mainSwiperRef.current.slideTo(index)}
                  className={` transition cursor-pointer
            ${
              currentIndex === index
                ? " p-[2px]  bg-[#C1FF00] "
                : "border border-white/40"
            }`}
                >
                  <img
                    src={item.image_url}
                    alt=""
                    className="w-full h-[110px] object-cover "
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* SECOND IMAGE SECTION */}
      <section className="w-full">
        <img
          src="/img/image.png"
          alt="Banner"
          className="w-full object-cover"
        />
      </section>

      {/* Abouts SECTION */}
      {/* desktop */}

      <section className="w-full hidden lg:block py-20  max-w-6xl mx-auto px-5  relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-0 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <p className="text-[#40BD02] font-semibold text-sm tracking-widest">
              ABOUT US
            </p>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {abouts?.title?.split(" ")?.map((word, index) =>
                (index + 1) % 3 === 0 ? (
                  <>
                    {word} <br />
                  </>
                ) : (
                  word + " "
                ),
              )}
            </h2>
          </div>

          <div className="flex flex-col justify-center">
            <p
              className="text-gray-600 text-base leading-relaxed mt-4 max-w-lg"
              dangerouslySetInnerHTML={{ __html: abouts?.summary }}
            ></p>
          </div>

          {/* LEFT SIDE IMAGE */}
          <div>
            <img
              src={abouts?.image_url || "/img/Free Assessment.png"}
              alt="About"
              className="shadow-lg w-full h-[400px] object-cover"
            />
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="flex flex-col justify-center">
            {/* STATS */}
            <div className="flex items-center gap-10 mb-6">
              <div>
                <h3 className="text-3xl font-bold">
                  {abouts?.companies_count}
                  <span className="text-[#40BD02]">+</span>
                </h3>
                <p className="text-gray-500 text-sm">COMPANIES</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">
                  {abouts?.employee_count}
                  <span className="text-[#40BD02]">+</span>
                </h3>
                <p className="text-gray-500 text-sm">Employees</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">
                  {abouts?.nations_count}
                  <span className="text-[#40BD02]">+</span>
                </h3>
                <p className="text-gray-500 text-sm">Nations strong</p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p
              className="text-gray-700 text-sm md:text-base leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: abouts?.description }}
            ></p>

            {/* BUTTON */}
            <button
              onClick={() => navigate("/abouts")}
              className="bg-gradient-to-r from-[#40BD02] to-[#37B8E1] hover:bg-[#2FA000] text-white px-6 py-3  text-sm font-semibold w-fit shadow-md transition"
            >
              READ MORE
            </button>
          </div>
        </div>
      </section>
      {/* mobile */}

      <section className="w-full block lg:hidden py-10   mx-auto px-5  relative">
        <div className="max-w-6xl mx-auto  lg:px-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col justify-center">
            <p className="text-[#40BD02] font-semibold text-sm tracking-widest">
              ABOUT US
            </p>

            <h2 className=" text-3xl font-semibold  leading-tight">
              {abouts?.title?.split(" ")?.map((word, index) =>
                (index + 1) % 3 === 0 ? (
                  <>
                    {word} <br />
                  </>
                ) : (
                  word + " "
                ),
              )}
            </h2>
          </div>

          <div className="flex flex-col justify-center">
            <p
              className="text-gray-600 text-base leading-relaxed  max-w-lg"
              dangerouslySetInnerHTML={{ __html: abouts?.summary }}
            ></p>
          </div>

          <div className="flex flex-col justify-center">
            {/* STATS */}
            <div className="flex items-center gap-10 mb-6">
              <div>
                <h3 className="text-3xl ">
                  {abouts?.companies_count}
                  <span className="text-[#0A70B1]">+</span>
                </h3>
                <p className="text-gray-500 text-sm">COMPANIES</p>
              </div>

              <div>
                <h3 className="text-3xl ">
                  {abouts?.employee_count}
                  <span className="text-[#0A70B1]">+</span>
                </h3>
                <p className="text-gray-500 text-sm">Employees</p>
              </div>

              <div>
                <h3 className="text-3xl ">
                  {abouts?.nations_count}
                  <span className="text-[#0A70B1]">+</span>
                </h3>
                <p className="text-gray-500 text-sm">Nations strong</p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p
              className="text-gray-700 text-sm md:text-base leading-relaxed mb-6"
              dangerouslySetInnerHTML={{ __html: abouts?.description }}
            ></p>

            {/* BUTTON */}
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/abouts")}
                className="bg-gradient-to-r from-[#40BD02] to-[#37B8E1] hover:bg-[#2FA000] 
               text-white px-6 py-3  text-sm font-semibold 
               shadow-md transition"
              >
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS SECTION */}
      {/* desktop */}
      <section className="w-full hidden lg:block bg-white">
        {/* HEADER */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 gap-12">
          <div>
            <p className="text-[#7ED321] font-semibold tracking-[3px] text-sm mb-4">
              BUSINESS
            </p>

            <h2 className="text-5xl font-semibold leading-tight text-black">
              {section?.title}
            </h2>
          </div>

          <div className="flex items-center">
            <p
              className="text-gray-500 max-w-md text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section?.description }}
            />
          </div>
        </div>

        {/* IMAGE + TABS AREA */}
        <div className="relative w-full h-[560px] overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url(${activeTab?.image_url})`,
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/35" />

          {/* CONTENT */}
          <div className="relative z-10 flex h-full  mx-auto">
            {/* LEFT STRIPS */}
            <div className="flex h-full">
              {tabsall?.map((tab, index) => {
                const isActive = (hoverTab ?? active) === tab.id;

                return (
                  <div
                    key={tab.id}
                    onClick={() => setActive(tab.id)}
                    onMouseEnter={() => setHoverTab(tab.id)}
                    onMouseLeave={() => setHoverTab(null)}
                    className={`w-[95px] h-full cursor-pointer flex flex-col justify-between
                      border-t border-b   border-white border-3
                      
                      transition-all duration-500 ease-out
                      ${
                        isActive
                          ? "bg-transparent"
                          : "bg-gradient-to-b from-[#7ED321] via-[#46B5C7] to-[#1E6FA3]"
                      }`}
                  >
                    {/* CENTER VERTICAL TEXT */}
                    <div className="flex justify-center mb-2 border-b-3 pb-2 px-2 border-white  items-end flex-1">
                      <div
                        className="text-white font-medium text-[15px] tracking-wide text-center"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {tab.title}
                      </div>
                    </div>

                    {/* NUMBER */}
                    <div className="mb-6 flex justify-center ">
                      <span
                        className={`text-xs px-3 py-1  text-white
                    ${isActive ? "bg-white/30" : "bg-black/40"}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT DESCRIPTION BOX */}
            <div className="flex-1 flex items-end p-12">
              <div
                className="
                bg-black/55 
                backdrop-blur-md 
                text-white 
                p-7 
                max-w-md 
                border border-white/10
                shadow-xl
              "
              >
                <p
                  className="text-sm leading-relaxed text-white/90"
                  dangerouslySetInnerHTML={{
                    __html: activeTab?.description,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* mobile */}
      <section className="w-full block lg:hidden bg-white">
        {/* HEADER */}
        <div className="px-5 pt-10 pb-6">
          <p className="text-[#40BD02] font-semibold tracking-widest text-sm mb-2">
            BUSINESS
          </p>

          <h2 className="text-3xl  leading-snug mb-3">
            {section?.title?.split(" ").map((word, i) => (
              <span key={i}>
                {(i + 1) % 3 === 0 ? (
                  <>
                    {word} <br />
                  </>
                ) : (
                  word + " "
                )}
              </span>
            ))}
          </h2>

          <p
            className="text-gray-600 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: section?.description }}
          />
        </div>

        {/* GRID CARDS */}
        <div className="grid grid-cols-2 gap-3 px-5 pb-10">
          {tabsall.map((item, index) => (
            <div
              key={item.id}
              className={`relative  overflow-hidden ${
                index === tabsall.length - 1 ? "col-span-2" : ""
              }`}
            >
              {/* IMAGE */}
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-40 object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 flex items-end">
                <p className="text-white text-sm font-semibold p-3">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chairman's Message */}
      {/* desktop */}
      <section className="w-full hidden lg:block bg-white  pb-20 relative">
        {/* Background subtle vertical lines */}
        <div className="absolute inset-0 pointer-events-none bg-[url('/img/vertical-lines.png')] opacity-20"></div>

        {/* TOP BLUE BAR */}
        <div className=" w-full bg-[#0A5A9C]">
          <div className="max-w-6xl mx-auto py-10 px-2">
            <h2 className="text-white text-3xl md:text-[32px] font-bold tracking-wide uppercase">
              CHAIRMAN’S MESSAGE
            </h2>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="relative max-w-6xl mx-auto px-4 mt-14 grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* LEFT SIDE TEXT */}
          <div className="flex flex-col justify-center">
            <p
              className="text-[#4A4A4A] text-[17px] leading-[30px]"
              dangerouslySetInnerHTML={{ __html: abouts1?.description }}
            ></p>

            {/* GREEN LINE */}

            <div className="flex items-center gap-4 mt-8">
              {/* GREEN LINE + ANGLE */}
              <div className="relative">
                <div className="h-[6px] w-[110px] bg-[#8CC900]"></div>

                {/* angled edge */}
                <div
                  className="absolute right-[-10px] top-0 
                 border-t-[6px] border-t-[#8CC900]
                 border-r-[10px] border-r-transparent"
                ></div>
              </div>

              {/* NAME */}
              <p className="text-[22px] font-[Syne] font-semibold tracking-wide text-[#000000]">
                {abouts1?.title}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="flex justify-center md:justify-end">
            <div className="  -mt-[35px] md:-mt-[140px]  ">
              <img
                src={abouts1?.image_url || "/chairman2.png"}
                alt="Chairman"
                className="w-[420px] h-auto object-cover "
              />
            </div>
          </div>
        </div>
        <img src="/img/line.png" className=" mt-10" />
      </section>

      {/* mobile */}

      <section className="w-full bg-white block lg:hidden pb-10 relative">
        {/* Background subtle vertical lines */}
        <div className="absolute inset-0 pointer-events-none bg-[url('/img/vertical-lines.png')] opacity-20"></div>

        {/* TOP BLUE BAR */}
        <div className=" px-5">
          <div className=" bg-[#0A5A9C] py-4 ">
            <h2 className="text-white text-xl text-center font-bold tracking-wide uppercase">
              CHAIRMAN’S MESSAGE
            </h2>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="relative  mx-auto px-5  mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4">
            {/* GREEN LINE + ANGLE */}
            <div className="relative">
              <div className="h-[8px] w-[150px] bg-[#8CC900]"></div>

              {/* angled edge */}
              <div
                className="absolute right-[-10px] top-0 
                 border-t-[6px] border-t-[#8CC900]
                 border-r-[10px] border-r-transparent"
              ></div>
            </div>

            {/* NAME */}
            <p className="text-[12px] font-semibold tracking-wide text-[#000000]">
              {abouts1?.title}
            </p>
          </div>
          {/* LEFT SIDE TEXT */}
          <div className="flex flex-col justify-center">
            <p
              className="text-[#4A4A4A] text-[17px] leading-[30px]"
              dangerouslySetInnerHTML={{ __html: abouts1?.description }}
            ></p>

            {/* GREEN LINE */}
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="flex justify-center ">
            <div className=" ">
              <img
                src={abouts1?.image_url || "/chairman2.png"}
                alt="Chairman"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
          </div>
        </div>
        <img src="/img/line.png" className=" mt-10" />
      </section>
      {/* Architects of Growth */}

      <section className="w-full hidden lg:block bg-white py-6 max-w-6xl mx-auto px-5">
        {/* Heading */}
        <div className="mb-12">
          <p className="text-green-600 font-semibold tracking-wide">COMPANY</p>
          <h2 className="text-4xl font-bold mt-2">Architects of Growth</h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Block 1 */}
          {architech?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row bg-white shadow-lg"
            >
              {/* LEFT IMAGE */}
              <img
                src={item?.image_url || "/img/image1.png"}
                alt={item?.name}
                className="w-full md:w-1/2 object-cover"
              />

              {/* RIGHT SIDE CONTENT */}
              <div
                className={`p-6 text-white flex flex-col justify-center
    ${
      index === 0 || index === 3
        ? "bg-[#0a70b1]"
        : index === 1 || index === 2
          ? "bg-[#85AC02]"
          : "bg-gray-900"
    }
  `}
              >
                {/* DESCRIPTION (HTML from API) */}
                <div
                  className="text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></div>

                {/* DESIGNATION */}
                {/* <p className="mt-4 font-bold text-green-400">
                  {item?.designation}
                </p> */}

                <p
                  className={`mt-4 font-bold text-sm 
    ${
      index === 0 || index === 3
        ? "text-[#CAFF00]"
        : index === 1 || index === 2
          ? "text-[#034570]"
          : "text-gray-900"
    }
  `}
                >
                  {item?.designation}
                </p>

                {/* NAME */}
                <p className="font-semibold mt-1 uppercase">{item?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full block lg:hidden  bg-white py-6  mx-auto px-5">
        {/* Heading */}
        <div className="mb-5">
          <p className="text-green-600 font-semibold tracking-wide">COMPANY</p>
          <h2 className="text-3xl  mt-2">Architects of Growth</h2>
        </div>

        {/* Slider Row */}
        <div className="relative w-full max-w-7xl mx-auto">
          <div
            ref={sliderRef1}
            className="flex gap-2 overflow-x-auto hide-scrollbar scroll-smooth"
          >
            {architech.map((item, index) => (
              <div
                key={item.id}
                className="min-w-[360px] bg-white  transition p-4"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-48 object-cover  mb-4"
                />

                <div
                  className={`p-6 text-white flex flex-col justify-center
    ${
      index === 0 || index === 3
        ? "bg-[#0A70B1]"
        : index === 1 || index === 2
          ? "bg-[#85AC02]"
          : "bg-gray-900"
    }
  `}
                >
                  {/* DESCRIPTION (HTML from API) */}
                  <div
                    className="text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  ></div>

                  {/* DESIGNATION */}
                  <p className="mt-4 font-bold text-green-400">
                    {item?.designation}
                  </p>

                  {/* NAME */}
                  <p className="font-semibold mt-1 uppercase">{item?.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={scrollLeft1}
              className="w-10 h-10 flex items-center justify-center  border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={scrollRight1}
              className="w-10 h-10 flex items-center justify-center  border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <style>
          {`
            /* Hide scrollbar for Chrome, Safari, Edge */

              .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }


            `}
        </style>
      </section>

      {/* New Update */}
      <NewsSection />

      <GlobalMap />

      <Footer />
    </>
  );
};

export default Home;
