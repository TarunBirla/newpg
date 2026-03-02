import React, { useEffect } from "react";

import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import Footer from "./Footer";

import { useState, useRef, forwardRef } from "react";

import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

import {
  Cog,
  Truck,
  Tractor, // instead of Excavator
  Building2,
  Palette, // instead of PaintBucket
  Layers,
  Home,
  Hammer,
  FlaskConical,
  Wrench,
  Construction,
} from "lucide-react";

import { HardHat, Building, PhoneCall } from "lucide-react";
import http from "../service/http";
import { toast } from "react-toastify";

const categories = [
  {
    name: "Custom Home Builder",
    icon: <Cog className="w-12 h-12" />,
    sub: [
      {
        name: "Design & Planning",
        icon: <Layers className="w-12 h-12" />,
        sub: [
          {
            name: "3D Layouts",
            icon: <Hammer className="w-12 h-12" />,
            sub: [
              {
                name: "Material Estimate",
                icon: <Building2 className="w-12 h-12" />,
                sub: null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Sewer & Utility Excavation",
    icon: <Truck className="w-12 h-12" />,
    sub: [
      {
        name: "Drainage Work",
        icon: <Layers className="w-12 h-12" />,
        sub: [
          {
            name: "Site Grading",
            icon: <Tractor className="w-12 h-12" />, // FIXED
            sub: [
              {
                name: "Trench Digging",
                icon: <Hammer className="w-12 h-12" />,
                sub: null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Geotechnical Site Work",
    icon: <FlaskConical className="w-12 h-12" />, // FIXED
    sub: [
      {
        name: "Soil Testing",
        icon: <Layers className="w-12 h-12" />,
        sub: [
          {
            name: "Lab Analysis",
            icon: <Truck className="w-12 h-12" />,
            sub: [
              {
                name: "Report Submission",
                icon: <Cog className="w-12 h-12" />,
                sub: null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Commercial Site Work",
    icon: <Construction className="w-12 h-12" />, // FIXED
    sub: [
      {
        name: "Parking Layout",
        icon: <Truck className="w-12 h-12" />,
        sub: [
          {
            name: "Road Compaction",
            icon: <Hammer className="w-12 h-12" />,
            sub: [
              {
                name: "Asphalt Layer",
                icon: <Layers className="w-12 h-12" />,
                sub: null,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Home Elevation",
    icon: <Home className="w-12 h-12" />,
    sub: [
      {
        name: "Foundation Lifting",
        icon: <Cog className="w-12 h-12" />,
        sub: [
          {
            name: "Hydraulic Jacking",
            icon: <Truck className="w-12 h-12" />,
            sub: [
              {
                name: "Level Adjustment",
                icon: <Layers className="w-12 h-12" />,
                sub: null,
              },
            ],
          },
        ],
      },
    ],
  },
];

const getTimeAgo = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24)); // days diff

  if (diff < 1) return "Today";
  if (diff === 1) return "1 day ago";
  if (diff < 30) return `${diff} days ago`;
  if (diff < 60) return "1 month ago";
  if (diff < 365) return `${Math.floor(diff / 30)} months ago`;
  return `${Math.floor(diff / 365)} years ago`;
};

const InsightsSlider = () => {
  const insights = [
    {
      title: "Top Safety Protocols Every Construction Site Must Follow",
      category: "Safety",
      timeAgo: "1 hour ago",
      image: "/lndp1.png",
    },
    {
      title: "How Modern Machinery is Transforming Construction Efficiency",
      category: "Machinery",
      timeAgo: "3 hours ago",
      image: "/lndp2.png",
    },
    {
      title: "Understanding Soil Testing Requirements for New Projects",
      category: "Civil Engineering",
      timeAgo: "5 hours ago",
      image: "/bannercmpny1.avif",
    },
    {
      title: "Green Building: Sustainable Design for Future Projects",
      category: "Sustainability",
      timeAgo: "1 day ago",
      image: "/bannercmpny2.jpg",
    },
    {
      title: "How to Reduce Construction Delays with Proper Planning",
      category: "Planning",
      timeAgo: "2 hours ago",
      image: "/bannercmpny4.webp",
    },
    {
      title: "Latest Government Regulations on Construction Permits",
      category: "Regulations",
      timeAgo: "4 hours ago",
      image: "/bannercmpny5.jpg",
    },
  ];

  //   const [insights, setInsights] = useState([]);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await http.get("/news/todayactivenews");
  //         if (response.data?.success) {
  //           const data = response.data.today_active_news;

  //           const mapped = data.map((item) => ({
  //             image:
  //               item.sections?.img1 || item.sections?.img2 || item.sections?.img3
  //                 ? `${baseURL}/${
  //                     item.sections.img1 ||
  //                     item.sections.img2 ||
  //                     item.sections.img3
  //                   }`
  //                 : "/default-image.jpg",

  //             title: item.title,
  //             category: item.resource || "News",
  //             timeAgo: getTimeAgo(item.news_date),
  //           }));

  //           setInsights(mapped);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching news:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.cursor = "grabbing";
    // Prevent text selection while dragging
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    if (!sliderRef.current) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;

    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Reduced multiplier for smoother scrolling
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !sliderRef.current) return;

    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
    }
  };

  // Global mouse up handler
  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setIsDragging(false);
      if (sliderRef.current) {
        sliderRef.current.style.cursor = "grab";
      }
    };

    window.addEventListener("mouseup", handleMouseUpGlobal);
    return () => window.removeEventListener("mouseup", handleMouseUpGlobal);
  }, []);

  // Prevent context menu on right click while dragging
  const handleContextMenu = (e) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative w-full px-8 md:px-16 lg:px-[110px] py-4 md:py-8">
      <div
        ref={sliderRef}
        className="overflow-x-auto bg-[#FFFFFF] rounded-[8px] cursor-grab select-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onContextMenu={handleContextMenu}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <div className="flex gap-0 min-w-max">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[300px] cursor-pointer sm:w-[320px] md:w-[350px]"
              // Prevent click events when dragging
              onClick={(e) => {
                if (isDragging) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            >
              <div className="bg-transparent border-r border-gray-200 last:border-r-0 h-full transition-colors hover:bg-gray-50">
                <div className="flex gap-3 p-4">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0">
                    <div className="w-[3.4375rem] h-[3.4375rem] bg-gray-200 rounded-[4px] overflow-hidden">
                      <img
                        src={insight.image}
                        alt={insight.title}
                        className="w-full h-full object-cover pointer-events-none"
                        draggable="false"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => (window.location.href = `/login`)}
                  >
                    <h3 className="text-[13px] font-medium text-[#000000] leading-tight mb-2">
                      {insight.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-[#767676] text-sm font-medium">
                        {insight.category}
                      </span>
                      <span className="w-[0.3rem] h-[0.3rem] bg-[#D9D9D9]" />
                      <span className="text-[#767676] text-sm font-medium">
                        {insight.timeAgo}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HeroSection = ({
  onAboutClick,
  onInsightClick,
  onCompetitorClick,
  onContactClick,
}) => {
  const [active, setActive] = useState("Home");
  const [currentBgSlide, setCurrentBgSlide] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const backgroundImages = [
    "/landingpage12.png",
    "/bannercmpny4.webp",
    "/bannercmpny5.jpg",
    "/bannercmpny6.jpg",
  ];

  const menuItems = ["Home", "About", "Insights", "Competitors", "Contact"];

  const handleMenuClick = (item) => {
    setActive(item);
    setDrawerOpen(false);

    switch (item) {
      case "About":
        onAboutClick();
        break;
      case "Insights":
        onInsightClick();
        break;
      case "Competitors":
        onCompetitorClick();
        break;
      case "Contact":
        onContactClick();
        break;
      case "Home":
      default:
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
    }
  };

  const nextBgSlide = () => {
    setCurrentBgSlide((prev) =>
      prev >= backgroundImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevBgSlide = () => {
    setCurrentBgSlide((prev) =>
      prev <= 0 ? backgroundImages.length - 1 : prev - 1
    );
  };

  const goToBgSlide = (index) => {
    setCurrentBgSlide(index);
  };

  return (
    <section
      className="relative h-[40rem] md:min-h-[63rem] bg-cover w-full bg-center px-4 sm:px-8 md:px-16 lg:px-[124px] text-white transition-all duration-500 ease-in-out"
      style={{ backgroundImage: `url('${backgroundImages[currentBgSlide]}')` }}
    >
      {/* Background Image Dots */}
      <div className="absolute bottom-[180px] md:bottom-[200px] right-[100px] z-40 flex items-end justify-end pr-4">
        <div className="flex items-center gap-2">
          <button
            onClick={prevBgSlide}
            className="w-8 h-8 bg-black/30 cursor-pointer backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-200 mr-3"
          >
            <ChevronLeft size={16} color="#F2C75C" />
          </button>

          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToBgSlide(index)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer duration-200 ${
                currentBgSlide === index
                  ? "bg-[#E3A824]"
                  : "bg-white hover:bg-[#E3A824] "
              }`}
            />
          ))}

          <button
            onClick={nextBgSlide}
            className="w-8 h-8 bg-black/30 cursor-pointer backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-200 ml-3"
          >
            <ChevronRight size={16} color="#F2C75C" />
          </button>
        </div>
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full py-6 px-4 sm:px-8 md:px-16 lg:px-[124px] flex justify-between items-center z-50 text-white">
        <img
          src="/Construction-Logo.jpg"
          className="w-[50px] rounded-full h-[50px] object-cover"
          alt="Logo"
        />

        {/* Desktop menu */}
        <ul className="hidden lg:flex gap-4 sm:gap-8 md:gap-10 text-xs sm:text-sm uppercase">
          {menuItems.map((item) => (
            <li
              key={item}
              onClick={() => handleMenuClick(item)}
              className={`cursor-pointer transition-all duration-200 ${
                active === item
                  ? "text-[#F2C75C] font-semibold"
                  : "text-white font-normal"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>

        {/* <button
          className="hidden lg:flex text-xs sm:text-sm items-center gap-1 cursor-pointer"
          onClick={() => (window.location.href = "/login")}
        >
          Login
        </button> */}

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* <button
            className="text-xs sm:text-sm font-medium underline"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button> */}
          <Menu
            onClick={() => setDrawerOpen(true)}
            className="w-6 h-6 cursor-pointer"
          />
        </div>
      </nav>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-3/4 sm:w-2/3 bg-white text-black z-50 transform transition-transform duration-300">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <X
                className="w-6 h-6 cursor-pointer"
                onClick={() => setDrawerOpen(false)}
              />
            </div>
            <ul className="flex flex-col p-4 gap-6 text-sm uppercase">
              {menuItems.map((item) => (
                <li
                  key={item}
                  onClick={() => handleMenuClick(item)}
                  className={`cursor-pointer transition-all duration-200 ${
                    active === item
                      ? "text-[#E3A824] font-semibold"
                      : "text-black"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col">
        <div className="relative z-10 flex flex-col justify-center mt-[12rem] sm:mt-[14rem] md:mt-[16rem] px-4 sm:px-8 md:px-16 lg:px-44">
          <h1 className="leading-none">
            {/* <p className="text-xs md:text-xl lg:text-2xl leading-none ml-[1rem] md:ml-[3rem] xl:ml-[19rem] font-normal  w-[9rem]  md:w-[17rem] text-end tracking-wider ">
              Global leaders in forecasting
            </p> */}
            <span className="text-[#E3A824] font-extrabold relative text-[2rem] sm:text-[4rem] lg:text-[5rem] inline-block">
              <span className="absolute text-white left-[-0.4rem] sm:left-[-0.75rem] md:left-[-1rem] lg:left-[-1.5rem] top-[-0.75rem] sm:top-[-1rem] md:top-[-1.5rem] lg:top-[-2rem]">
                ‘
              </span>
              Transforming the way the world
            </span>
            <br />
            <span className="text-white font-semibold ml-20 lg:ml-60 flex justify-end text-[2rem] sm:text-[4rem] lg:text-[5rem]">
              moves materials from Port to Home
            </span>

            <div className="ml-[4rem] md:ml-[7rem] xl:ml-[11.5rem] flex gap-1 md:gap-4 items-start">
              {/* <p className="text-xs md:text-xl lg:text-2xl font-normal text-white leading-snug">
                —bringing clarity <br />
                and growth.
              </p> */}
              <span className="text-2xl font-semibold text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[4rem] text-white">
                ‘
              </span>
            </div>
          </h1>
        </div>

        <div className="mt-auto">
          <InsightsSlider />
        </div>
      </div>
    </section>
  );
};

const LandingPage = () => {
  const aboutRef = useRef(null);
  const insightRef = useRef(null);
  const competitorRef = useRef(null);
  const contactRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const scrollToSection = (ref) => {
    const offset = 80; // if navbar is fixed
    const position = ref.current.offsetTop - offset;

    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const [path, setPath] = useState([]);
  const [currentLevel, setCurrentLevel] = useState([]);
  const [levelHistory, setLevelHistory] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await http.get("/categories");
      setCategories(res.data.data);
    } catch (error) {
      console.log("error:-", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setCurrentLevel(categories);
      setLevelHistory([categories]);
    }
  }, [categories]);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      setShowLogin(true);
      setShowPopup(true);
    } else {
      setShowLogin(false);
      setShowPopup(true);
    }
  }, []);

  const [categoryId, setCategoryId] = useState("");
  // Select Category
  const handleSelect = async (item) => {
    setPath((prev) => [...prev, item.name]);
    setCategoryId(item.id);

    if (item.sub && item.sub.length > 0) {
      setLevelHistory((prev) => [...prev, item.sub]);
      setCurrentLevel(item.sub);
    } else {
      console.log("Final Selected:", [...path, item.name]);
    }
  };

  // Back Button
  const handleBack = () => {
    if (levelHistory.length > 0) {
      const updatedHistory = [...levelHistory];
      updatedHistory.pop();
      setCategoryId("");
      setLevelHistory(updatedHistory);
      setCurrentLevel(updatedHistory[updatedHistory.length - 1]);
      setPath(path.slice(0, -1));
    }
  };

  const [loading2, setLoading2] = useState(false);
  const handleSelectCurrent = async () => {
    console.log("Selected Up to This Level:", path);

    try {
      setLoading2(true);
      const res = await http.post(`/send-admin-mail`, {
        name: user.name,
        email: user.email,
        phone: user.phone,

        category: path[0], // First item
        subcategory: path.slice(1), // Array of remaining items
      });

      toast.success(res.data.message);

      setShowPopup(false);

      console.log("response data:-", res.data);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message ||
          error.response.data.error ||
          "Something went wrong!"
      );
    } finally {
      setLoading2(false);
    }
  };

  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await http.post("/login", {
        email: formData.username,
        password: formData.password,
      });

      const data = await res.data;

      if (data.status === true) {
        alert("Login Success!");
        setShowLogin(false);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="relative h-screen ">
      {showPopup &&
        (showLogin ? (
          <LoginModal
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            loading={loading}
            setShowLogin={setShowLogin}
          />
        ) : (
          user && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 ">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px] relative max-h-[80vh] overflow-y-auto">
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl font-bold"
                >
                  ×
                </button>

                <h2 className="text-2xl font-bold text-center text-[#000000] py-3">
                  OUR SERVICES
                </h2>

                {path.length > 0 && (
                  <button
                    onClick={handleBack}
                    className="absolute top-4 left-4 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    ← Back
                  </button>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {currentLevel.map((item) => (
                    <div
                      key={item.id}
                      className="bg-orange-500 text-white rounded-lg p-4 shadow-md flex flex-col items-center justify-center cursor-pointer hover:bg-orange-600"
                      onClick={() => handleSelect(item)}
                    >
                      <div className="w-16 h-16 flex items-center justify-center mb-2">
                        {item.icon ?? "📁"}
                      </div>
                      <p className="text-center font-semibold">{item.name}</p>
                    </div>
                  ))}
                </div>

                {path.length > 0 && (
                  <p className="mt-4 text-sm text-gray-600">
                    Selected:
                    <span className="font-semibold">{path.join(" ➤ ")}</span>
                  </p>
                )}

                {path.length >= 1 && (
                  <button
                    onClick={handleSelectCurrent}
                    disabled={loading2}
                    className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
                  >
                    {loading2 ? "Selecting..." : "Select Up to This Level"}
                  </button>
                )}
                {categoryId && <QuestionPage categoryId={categoryId} />}

                <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-sm border border-gray-200 rounded-xl">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    {user.cmpny_name}
                  </h2>

                  <p className="text-gray-600 leading-relaxed text-[15px]">
                    {user.description}
                  </p>
                </div>
              </div>
            </div>
          )
        ))}

      <HeroSection
        onAboutClick={() => scrollToSection(aboutRef)}
        onInsightClick={() => scrollToSection(insightRef)}
        onCompetitorClick={() => scrollToSection(competitorRef)}
        onContactClick={() => scrollToSection(contactRef)}
      />
      <FeaturesSection />
      <WhyHysterYale ref={aboutRef} />
      <HowWeHelp ref={insightRef} />
      <Competitors ref={competitorRef} />
      <FoundationSection />
      <ProductsBrands />
      <Contact ref={contactRef} />
      <GlobalPresence />

      <Footer />
    </div>
  );
};

export default LandingPage;

const LoginModal = ({
  formData,
  handleInputChange,
  handleSubmit,
  loading,
  setShowLogin,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[9999]">
      <div className="relative z-10 bg-[#1A3F51]/90 text-white p-8 rounded-[8px] shadow w-full max-w-[711px]">
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-3 right-3 text-white text-[20px] hover:text-red-400"
        >
          ✕
        </button>

        <div className="flex flex-col items-center">
          <h2 className="text-[26px] font-semibold text-center">
            EUROCON COMPANY ADMINISTRATION LOGIN!
          </h2>
          <p className="text-[13px] w-[347px] mt-2 text-center mb-4">
            Use a valid username & password to gain access to the administrator
            backend.
          </p>
        </div>

        <div className="flex w-full mt-4">
          <div className="flex justify-center">
            <img
              src="/lockimg.png"
              alt="Lock"
              className="w-[182px] h-[182px]"
            />
          </div>

          <div className="w-[380px]">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-2">
                <label className="text-[12px] font-medium">User name</label>
                <input
                  type="email"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Your user name"
                  className="w-full p-3 rounded bg-white text-black shadow"
                />
              </div>

              <div className="flex flex-col space-y-2 mt-3">
                <label className="text-[12px] font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="********"
                  className="w-full p-3 rounded bg-white text-black shadow"
                />
              </div>

              <div className="text-left text-xs mt-3">
                <a
                  href="/forgotpassword"
                  className="text-yellow-300 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-1 rounded text-lg font-medium ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#63B1BC] text-white hover:bg-teal-600"
                  }`}
                >
                  {loading ? "Signing..." : "login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuestionPage = ({ categoryId }) => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async (catId) => {
    try {
      const response = await http.get(`/questions/bycategory/${catId}`);
      setQuestions(response.data?.data || []);
      console.log("res:-", response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchQuestions(categoryId);
    }
  }, [categoryId]);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div>
        {questions.length === 0 && categoryId && (
          <p className="text-gray-500"></p>
        )}

        {questions?.map((q) => (
          <div
            key={q.id}
            className=" p-6 bg-white shadow-sm border border-gray-200 rounded-xl"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              Category Description
            </h2>

            <p className="text-gray-600 leading-relaxed text-[15px]">
              {q.question}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const WhyHysterYale = forwardRef((props, ref) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const images = document.querySelectorAll(".animated-image");
            const textElements = document.querySelectorAll(".animated-text");

            // Animate images in with staggered timing
            images.forEach((img, index) => {
              setTimeout(() => {
                img.classList.add("animate-in");
                img.classList.remove("animate-out");
              }, index * 200);
            });

            // Animate text elements
            textElements.forEach((text, index) => {
              setTimeout(() => {
                text.classList.add("animate-in");
                text.classList.remove("animate-out");
              }, (index + 1) * 150);
            });
          } else {
            const images = document.querySelectorAll(".animated-image");
            const textElements = document.querySelectorAll(".animated-text");

            // Reset animations when scrolling out
            images.forEach((img) => {
              img.classList.remove("animate-in");
              img.classList.add("animate-out");
            });

            textElements.forEach((text) => {
              text.classList.remove("animate-in");
              text.classList.add("animate-out");
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  //   return (
  //     <>
  //       <style>{`
  //         .animated-image {
  //           opacity: 0;
  //           transform: translateY(80px) scale(0.8) rotate(5deg);
  //           transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  //         }

  //         .animated-image.animate-in {
  //           opacity: 1;
  //           transform: translateY(0) scale(1) rotate(0deg);
  //         }

  //         .animated-image.animate-out {
  //           opacity: 0;
  //           transform: translateY(80px) scale(0.8) rotate(5deg);
  //         }

  //         .animated-image:hover {
  //           transform: translateY(-10px) scale(1.05) rotate(-2deg);
  //           box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  //           z-index: 10;
  //         }

  //         .animated-text {
  //           opacity: 1;
  //           transform: translateX(-50px);
  //           transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  //         }

  //         .animated-text.animate-out {
  //           opacity: 0;
  //         }

  //         .animated-text.animate-in {
  //           opacity: 1;
  //           transform: translateX(0);
  //         }

  //         /* Different animation directions for variety */
  //         .from-left {
  //           transform: translateX(-80px) scale(0.9);
  //         }

  //         .from-right {
  //           transform: translateX(80px) scale(0.9);
  //         }

  //         .from-top {
  //           transform: translateY(-80px) scale(0.9);
  //         }

  //         .from-bottom {
  //           transform: translateY(80px) scale(0.9);
  //         }

  //         .from-left.animate-in,
  //         .from-right.animate-in,
  //         .from-top.animate-in,
  //         .from-bottom.animate-in {
  //           transform: translate(0, 0) scale(1);
  //         }
  //       `}</style>

  //       <div
  //         ref={ref}
  //         className="w-full h-full bg-white mt-[10rem] px-6 md:px-[124px] flex flex-col lg:flex-row justify-between gap-[5rem]"
  //       >
  //         {/* Left Side - Images */}
  //         <div className="relative w-[50%] h-full hidden lg:block">
  //           <img
  //             src="/yhyster2.png"
  //             alt="elevator"
  //             className="animated-image from-left absolute top-0 left-0 w-[379px] h-[320px] object-cover rounded-xl shadow-lg cursor-pointer"
  //           />
  //           <img
  //             src="/yhyster4.png"
  //             alt="window"
  //             className="animated-image from-right absolute top-[8rem] left-[18.5rem] xl:left-[24.6rem] w-[230px] h-[195px] object-cover rounded-xl shadow cursor-pointer"
  //           />
  //           <img
  //             src="/yhyster1.png"
  //             alt="forklift"
  //             className="animated-image from-bottom absolute top-[21rem] left-[6.5rem] w-[201px] h-[170px] object-cover rounded-xl shadow cursor-pointer"
  //           />
  //           <img
  //             src="/yhyster3.png"
  //             alt="warehouse"
  //             className="animated-image from-top absolute top-[21rem] left-[20rem] w-[362px] h-[306px] object-cover rounded-xl shadow-lg cursor-pointer"
  //           />
  //         </div>

  //         {/* Right Side - Text */}
  //         <div className="flex-1">
  //           <div className="flex items-start justify-center gap-2 md:gap-[8rem]">
  //             <h2 className="animated-text text-[2.5rem] md:text-[5rem] font-semibold text-[#373737] leading-[1]">
  //               WHY
  //             </h2>
  //           </div>

  //           <h2 className="animated-text text-4xl text-center md:text-[5rem] font-semibold text-[#373737]">
  //             <span className="">HYSTER–YALE</span>
  //           </h2>

  //           <div className="px-[2rem] md:px-[5rem] mt-[7rem]">
  //             <p className="animated-text text-[#373737] text-sm md:text-base font-normal">
  //               At Hyster-Yale Materials Handling, our goal isn’t just to build
  //               the best lift trucks possible, but to create solutions that enable
  //               our customers to improve the overall efficiency and effectiveness
  //               of their businesses. Product development is informed, on-going and
  //               proactive. Our wide global presence, among the largest of all
  //               material handling manufacturers, enables Hyster-Yale to commit the
  //               resources necessary to ensure our lift trucks are some of the most
  //               innovative in the industry
  //             </p>
  //             <Link to="https://www.hyster-yale.com/hyster-yale-materials-handling-overview">
  //               <button className="animated-text mt-14  bg-[#E3A824] text-[#000000] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#D4961F] transition-all duration-300 hover:scale-105">
  //                 Read more
  //               </button>
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );

  return (
    <>
      <style>{`
      .animated-image {
        opacity: 0;
        transform: translateY(80px) scale(0.8) rotate(5deg);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      .animated-image.animate-in {
        opacity: 1;
        transform: translateY(0) scale(1) rotate(0deg);
      }
      .animated-image.animate-out {
        opacity: 0;
        transform: translateY(80px) scale(0.8) rotate(5deg);
      }
      .animated-image:hover {
        transform: translateY(-10px) scale(1.05) rotate(-2deg);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        z-index: 10;
      }

      .animated-text {
        opacity: 1;
        transform: translateX(-50px);
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      .animated-text.animate-out {
        opacity: 0;
      }
      .animated-text.animate-in {
        opacity: 1;
        transform: translateX(0);
      }

      .from-left { transform: translateX(-80px) scale(0.9); }
      .from-right { transform: translateX(80px) scale(0.9); }
      .from-top { transform: translateY(-80px) scale(0.9); }
      .from-bottom { transform: translateY(80px) scale(0.9); }

      .from-left.animate-in,
      .from-right.animate-in,
      .from-top.animate-in,
      .from-bottom.animate-in {
        transform: translate(0,0) scale(1);
      }
    `}</style>

      <div
        ref={ref}
        className="w-full bg-white mt-20 mb-20 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32
                 flex flex-col lg:flex-row gap-12 lg:gap-20"
      >
        {/* LEFT IMAGES SECTION */}
        {/* LEFT IMAGES SECTION */}
        <div className="relative hidden lg:block w-1/2 min-h-[600px]">
          <img
            src="/bannercmpny1.avif"
            className="animated-image from-left absolute 
               top-[2%] left-[2%]
               w-[38%] max-w-[380px]
               rounded-xl shadow-lg object-cover"
          />

          <img
            src="/bannercmpny2.jpg"
            className="animated-image from-right absolute 
               top-[18%] right-[25%]
               w-[28%] max-w-[240px]
               rounded-xl shadow object-cover"
          />

          <img
            src="/bannercmpny3.jpg"
            className="animated-image from-bottom absolute 
               top-[40%] left-[15%]
               w-[25%] max-w-[200px]
               rounded-xl shadow object-cover"
          />

          <img
            src="/bannercmpny4.webp"
            className="animated-image from-top absolute 
               bottom-[15%] right-[5%]
               w-[48%] max-w-[360px]
               rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* MOBILE / TABLET IMAGES */}
        <div className="lg:hidden grid grid-cols-2 gap-4">
          <img
            src="/yhyster2.png"
            className="animated-image from-left rounded-xl shadow-lg"
          />
          <img
            src="/yhyster4.png"
            className="animated-image from-right rounded-xl shadow"
          />
          <img
            src="/yhyster1.png"
            className="animated-image from-bottom rounded-xl shadow"
          />
          <img
            src="/yhyster3.png"
            className="animated-image from-top rounded-xl shadow-lg col-span-2"
          />
        </div>

        {/* RIGHT TEXT SECTION */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="animated-text text-4xl sm:text-5xl md:text-6xl font-semibold text-[#373737]">
            WHY
          </h2>

          <h2 className="animated-text text-4xl sm:text-5xl md:text-6xl font-semibold mt-2 text-[#373737]">
            EUROCON
          </h2>

          <p className="animated-text mt-10 md:mt-16 text-[#373737] text-sm md:text-lg font-normal leading-relaxed px-2 md:px-10 lg:px-0">
            At Eurocon, we are committed to delivering reliable,
            high-performance industrial solutions that enable businesses to
            operate with greater efficiency, safety, and precision. With
            expertise in material handling, construction equipment, and
            engineering services, Eurocon focuses on providing products and
            support that meet the highest standards of quality and innovation.
            Our customer-first approach ensures that every solution is tailored
            to enhance productivity and long-term operational success.
          </p>

          <Link to="https://www.hyster-yale.com/hyster-yale-materials-handling-overview">
            <button
              className="animated-text mt-10 bg-[#E3A824] text-black px-6 py-3 rounded-full
                             text-sm font-medium hover:bg-[#D4961F] transition-all duration-300 hover:scale-105"
            >
              Read more
            </button>
          </Link>
        </div>
      </div>
    </>
  );
});

const HowWeHelp = forwardRef((props, ref) => {
  return (
    <section
      ref={ref}
      className=" relative px-[2rem] md:px-[4rem] lg:px-[124px] w-full h-[20rem] md:h-[30rem]  lg:h-[57rem] bg-clip-contentr md:bg-contain bg-no-repeat flex flex-col md:flex-row"
      style={{
        backgroundImage: "url('/landingpage23.png')", // dark factory background
      }}
    >
      {/* Overlay */}
      <div className="flex flex-col items-center mt-[1rem] md:mt-[4rem] lg:mt-[6rem]">
        <div className="flex items-center md:gap-[5rem]">
          <h2 className="text-[1.5rem]  text-white md:text-[3rem] lg:text-[5rem] font-semibold leading-[1]">
            HOW
          </h2>
        </div>
        <h2 className="text-2xl text-center md:text-[3rem] lg:text-[5rem] font-semibold text-[#8B8B8B]">
          <span className="">WE HELP</span>
        </h2>
      </div>

      {/* Text Block */}
      <div className=" md:ml-auto space-x-2 md:space-x-7 md:z-20 flex  text-white max-w-sm md:max-w-xl mt-[4rem] lg:mt-[18rem]">
        <span className="inline-block w-1 h-1 md:w-2 md:h-2 lg:w-4 lg:h-4 mt-0.5 md:mt-2  bg-[#F2C75C] rounded-full align-middle" />

        <ul className="space-y-4 lg:space-y-8 text-[10px] md:text-[16px] lg:text-[30px]  text-[#BABABA] md:leading-[33px] font-normal">
          <li>
            <span className="text-[#EEEEEE]">SOLUTIONS & INNOVATIONS</span>
          </li>
          <li className="text-[#EEEEEE]">PATENT</li>
          <Link to="https://www.hyster-yale.com/hyster-yale-materials-handling-overview">
            <button className=" mt-14  bg-[#E3A824] text-[#000000] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#D4961F]">
              Read more
            </button>
          </Link>
          {/* <li className="hover:text-[#EEEEEE]">INVESTMENT STRATEGY</li>
          <li className="hover:text-[#EEEEEE]">
            REGULATORY PLANNING AND SCENARIO ANALYSIS
          </li>
          <li className="hover:text-[#EEEEEE]">BECOMING A THOUGHT LEADER</li> */}
        </ul>
      </div>
    </section>
  );
});

const competitors = [
  { src: "/logo2.png", price: "£10.47", style: "top-25 left-[40%]" },
  { src: "/logo4.png", price: "£355.06", style: "top-20 right-40" },
  { src: "/logo3.png", price: "£45.59", style: "top-36 right-[20%]" },
  { src: "/comlogo1.png", price: "£45.59", style: "top-36 right-[20%]" },
  { src: "/logo1.png", price: "£12.93", style: "top-20 left-40" },
  { src: "/logo5.png", price: "£10.47", style: "bottom-[40%] right-30" },
  { src: "/comlogo2.png", price: "£45.59", style: "top-36 right-[20%]" },
  { src: "/comlogo4.png", price: "£45.59", style: "top-36 right-[20%]" },
  { src: "/comlogo3.png", price: "£45.59", style: "top-36 right-[20%]" },
];

const FeaturesSection = () => {
  const features = [
    {
      icon: <HardHat size={50} />,
      title: "Expert Workers",
      desc: "Our highly trained professionals bring years of hands-on experience to deliver reliable and efficient work on every project.",
      bg: "bg-[#03153A] text-white",
    },
    {
      icon: <Building size={50} />,
      title: "Quality Work",
      desc: "We follow industry standards and use high-grade materials to ensure long-lasting and premium-quality results.",
      bg: "bg-[#F7BA00] text-black",
    },
    {
      icon: <PhoneCall size={50} />,
      title: "24/7 Support",
      desc: "Our dedicated support team is available around the clock to assist you with queries, issues, and urgent requirements.",
      bg: "bg-[#03153A] text-white",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {features.map((item, index) => (
        <div
          key={index}
          className={`p-8 flex flex-col items-start gap-4 ${item.bg}`}
        >
          <div className="text-3xl">{item.icon}</div>
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="text-sm leading-6">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

const Competitors = forwardRef((props, ref) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const logoCards = entry.target.querySelectorAll(".logo-card");

          if (entry.isIntersecting) {
            // Animate in when scrolling into view
            logoCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-in");
                card.classList.remove("animate-out");
              }, index * 100);
            });
          } else {
            // Reset animation when scrolling out of view
            logoCards.forEach((card) => {
              card.classList.remove("animate-in");
              card.classList.add("animate-out");
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .logo-card {
          opacity: 0;
          transform: translateY(60px) scale(0.8);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .logo-card.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .logo-card.animate-out {
          opacity: 0;
          transform: translateY(60px) scale(0.8);
        }

        .logo-card:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .title-container {
          opacity: 0;
          transform: translateY(40px);
          animation: titleSlideIn 0.8s ease-out 0.2s forwards;
        }

        @keyframes titleSlideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <section
        ref={ref}
        className="relative w-full  my-4 md:px-[124px] md:h-screen bg-white"
      >
        {/* Heading */}
        <div className="flex flex-col space-y-20">
          <div className="text-center">
            <div className="flex items-start justify-center">
              <div className="text-center title-container">
                <h2 className="text-[2.5rem] md:text-[5rem] font-semibold leading-none text-[#373737]">
                  OUR <br />
                  <span className="relative inline-block">COMPETITORS</span>
                </h2>
              </div>
            </div>
          </div>

          {/* Logos */}
          <div
            ref={containerRef}
            className="flex flex-wrap justify-center gap-4"
          >
            {competitors?.map((item, idx) => (
              <div
                key={idx}
                className="logo-card bg-[#FBFBFB] rounded-md border-[1.57px] border-[#EEEEEE] shadow px-4 py-2 flex items-center justify-center h-15 w-25 md:h-[74.98577117919922px] md:w-[222.56231689453125px] cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={`logo-${idx}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <button className="mt-6 px-4 py-2 rounded-full bg-[#E3A824] text-[#000000] text-sm font-medium hover:bg-[#D4961F] transition-all duration-300 hover:scale-105">
              Read more
            </button>
          </div>
        </div>
      </section>
    </>
  );
});

const Contact = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const [focusedField, setFocusedField] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.first_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true); // Start loader
    try {
      const response = await http.post("/contactus", formData);

      if (response.data.success) {
        // Reset form
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          message: "",
        });

        setErrors({}); // Clear previous errors if any
      }
    } catch (error) {
      setErrors(
        error.response?.data?.message ||
          "Failed to submit contact form. Please try again."
      );
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const getFieldBorderColor = (fieldName, hasValue) => {
    if (errors[fieldName]) return "border-red-500";
    if (focusedField === fieldName || hasValue) return "border-[#E6A923]";
    return "border-gray-600";
  };

  return (
    <section
      ref={ref}
      className="min-h-screen relative bg-[#001B28] text-white flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16"
      style={{
        backgroundImage: "url('/lndp14.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-[#001B28]/90"></div>

      <div className="relative z-10 w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[5rem] font-bold text-center mb-8 sm:mb-12 md:mb-16 tracking-wider">
          CONTACT
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Row 1 - Name Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-medium text-gray-300">
                First Name <span className="text-[#E6A923]">*</span>
              </div>
              <div className="relative">
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 transition-colors duration-300 ${getFieldBorderColor(
                    "firstName",
                    formData.first_name
                  )}`}
                ></div>
                <input
                  type="text"
                  placeholder="Your first name"
                  value={formData.first_name}
                  onChange={(e) =>
                    handleInputChange("first_name", e.target.value)
                  }
                  onFocus={() => setFocusedField("first_name")}
                  onBlur={() => setFocusedField("")}
                  className={`w-full bg-transparent border-b-2 ${getFieldBorderColor(
                    "first_name",
                    formData.first_name
                  )} border-t-0 border-l-0 border-r-0 pb-2 sm:pb-3 pt-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none transition-colors duration-300`}
                />
              </div>
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-medium text-gray-300">
                Last Name <span className="text-[#E6A923]">*</span>
              </div>
              <div className="relative">
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 transition-colors duration-300 ${getFieldBorderColor(
                    "lastName",
                    formData.last_name
                  )}`}
                ></div>
                <input
                  type="text"
                  placeholder="Your last name"
                  value={formData.last_name}
                  onChange={(e) =>
                    handleInputChange("last_name", e.target.value)
                  }
                  onFocus={() => setFocusedField("last_name")}
                  onBlur={() => setFocusedField("")}
                  className={`w-full bg-transparent border-b-2 ${getFieldBorderColor(
                    "last_name",
                    formData.last_name
                  )} border-t-0 border-l-0 border-r-0 pb-2 sm:pb-3 pt-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none transition-colors duration-300`}
                />
              </div>
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
              )}
            </div>
          </div>

          {/* Row 2 - Email and Phone */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-medium text-gray-300">
                Email <span className="text-[#E6A923]">*</span>
              </div>
              <div className="relative">
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 transition-colors duration-300 ${getFieldBorderColor(
                    "email",
                    formData.email
                  )}`}
                ></div>
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  className={`w-full bg-transparent border-b-2 ${getFieldBorderColor(
                    "email",
                    formData.email
                  )} border-t-0 border-l-0 border-r-0 pb-2 sm:pb-3 pt-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none transition-colors duration-300`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-medium text-gray-300">
                Phone <span className="text-[#E6A923]">*</span>
              </div>
              <div className="relative">
                <div
                  className={`absolute top-0 left-0 w-full h-0.5 transition-colors duration-300 ${getFieldBorderColor(
                    "phone",
                    formData.phone
                  )}`}
                ></div>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField("")}
                  className={`w-full bg-transparent border-b-2 ${getFieldBorderColor(
                    "phone",
                    formData.phone
                  )} border-t-0 border-l-0 border-r-0 pb-2 sm:pb-3 pt-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none transition-colors duration-300`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <div className="text-xs sm:text-sm font-medium text-gray-300">
              Message <span className="text-[#E6A923]">*</span>
            </div>
            <div className="relative">
              <div
                className={`absolute top-0 left-0 w-full h-0.5 transition-colors duration-300 ${getFieldBorderColor(
                  "message",
                  formData.message
                )}`}
              ></div>
              <textarea
                rows="3"
                placeholder="Your message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField("")}
                className={`w-full bg-transparent border-b-2 ${getFieldBorderColor(
                  "message",
                  formData.message
                )} border-t-0 border-l-0 border-r-0 pb-2 sm:pb-3 pt-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 resize-none`}
              />
            </div>
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 sm:pt-6 lg:pt-8">
            <button
              type="submit"
              disabled={loading} // Disable button if loading or errors exist
              className="w-full sm:w-auto bg-[#E6A923] hover:bg-[#d4971f] text-black font-normal px-6 sm:px-8 py-2 sm:py-3 text-sm  rounded-full flex items-center justify-center gap-2 transition-colors duration-300 min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <CircularProgress size={18} sx={{ color: "white" }} />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  Send Request
                  <SubdirectoryArrowRightIcon
                    size={12}
                    className="sm:w-4 sm:h-4"
                  />
                </>
              )}
            </button>
          </div>

          {/* Submit Button */}
          {/* <div className="pt-4 sm:pt-6 lg:pt-8">
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#E6A923] hover:bg-[#d4971f] text-black font-normal px-6 sm:px-8 py-2 sm:py-3 text-sm  rounded-full flex items-center justify-center gap-2 transition-colors duration-300 min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Request
              <SubdirectoryArrowRightIcon size={12} className="sm:w-4 sm:h-4" />
            </button>
          </div> */}
        </form>
      </div>
    </section>
  );
});

const FoundationSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const updateSectionTop = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        setSectionTop(top);
        setIsInitialized(true);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      updateSectionTop();
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleResize();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getCardState = (cardIndex) => {
    if (!isInitialized || sectionTop === 0) {
      return {
        visible: false,
        transform: "translateY(100vh) scale(0.8)",
        opacity: 0,
        zIndex: 1,
      };
    }

    const offset = window.innerHeight * 0.3;
    const relativeScroll = scrollY - sectionTop + offset;

    const cardTriggers = [100, 500, 900];
    const hidePoint = 1400;

    if (relativeScroll < cardTriggers[cardIndex]) {
      return {
        visible: false,
        transform: "translateY(100vh) scale(0.8)",
        opacity: 0,
        zIndex: 1,
      };
    } else if (relativeScroll > hidePoint) {
      const hideProgress = (relativeScroll - hidePoint) / 300;
      const clampedProgress = Math.min(1, Math.max(0, hideProgress));

      return {
        visible: true,
        transform: `translateY(-${100 * clampedProgress}vh) scale(${
          1 - clampedProgress * 0.3
        })`,
        opacity: 1 - clampedProgress,
        zIndex: 10 - cardIndex,
      };
    } else {
      return {
        visible: true,
        transform: "translateY(0) scale(1)",
        opacity: 1,
        zIndex: 10 - cardIndex,
      };
    }
  };

  const cards = [
    {
      title: "VISION",
      image: "/lndp5.png",
      content: (
        <>
          <p className="text-sm sm:text-base text-[#373737] my-2">
            To make a difference, we must follow our Vision:
          </p>
          <p className="text-sm sm:text-base text-[#E3A824] font-medium my-4">
            Transforming the way the world moves materials from Port to Home.
          </p>
          <p className="text-sm sm:text-base text-[#373737]">
            This transformation is focused on reducing the impact of materials
            movement on people, the environment, and the economy, driven by the
            imagination and creativity of our associates.
          </p>
        </>
      ),
    },
    {
      title: "MISSION",
      image: "/lndp6.png",
      content: (
        <>
          <p className="text-sm sm:text-base text-[#373737] my-2">
            The path to success is living in our Mission, which includes two
            customer promises:
          </p>
          <ul className="text-sm sm:text-base text-[#373737] space-y-3 mt-4">
            <li className="flex items-start">
              <span className="text-[#E3A824] mr-2 mt-1 font-bold">•</span>
              <span>
                To understand customers applications and needs and provide
                optimum solutions and productivity at the lowest cost of
                ownership.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#E3A824] mr-2 mt-1 font-bold">•</span>
              <span>
                To invest in research and development to continually increase
                the value of our solution to customers.
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "VALUES",
      image: "/lndp7.png",
      content: (
        <>
          <p className="text-sm sm:text-base text-[#373737] my-2">
            To drive our business forward, we must be authentic to our values.
          </p>
          <p className="text-xl sm:text-2xl font-bold text-[#E3A824] my-4 tracking-widest">
            I C A R E
          </p>
          <p className="text-sm sm:text-base text-[#373737]">
            These values define our culture and drive our success.
          </p>
        </>
      ),
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="bg-[#002639] min-h-[300vh] text-white py-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 relative overflow-hidden"
    >
      {/* Heading */}
      <div className="text-white px-4 sm:px-8 pb-20 relative z-20">
        <div className="max-w-6xl mx-auto relative">
          <div className="absolute top-21 md:top-20 left-4 md:left-16 text-4xl md:text-7xl font-bold text-white/50 select-none pointer-events-none">
            OUR FUTURE
          </div>
          <div className="relative z-10 text-3xl sm:text-4xl md:text-6xl font-bold text-white text-center pt-8 md:pt-4">
            OUR FOUNDATION,
          </div>
        </div>
      </div>

      {/* Cards */}
      {isMobile ? (
        <div className="flex flex-col mt-20 gap-10 relative z-10">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-white text-black rounded-2xl shadow-2xl p-4 w-full max-w-[360px] mx-auto"
            >
              <img
                src={card.image}
                alt={card.title}
                className="rounded-lg mb-4 w-full h-auto object-cover"
              />
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-semibold mb-2">
                {card.title}
              </h3>
              {card.content}
            </div>
          ))}
        </div>
      ) : (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 sm:px-8 md:px-16 z-10 pointer-events-none">
          <div className="flex flex-col md:flex-row flex-wrap gap-6 md:gap-8 items-center justify-center">
            {cards.map((card, i) => {
              const cardState = getCardState(i);
              return (
                <div
                  key={i}
                  className="bg-white text-black rounded-2xl shadow-2xl p-4 w-full sm:max-w-[320px] md:max-w-[360px] lg:w-80 transition-all duration-1000 ease-out relative pointer-events-auto"
                  style={{
                    transform: cardState.transform,
                    opacity: cardState.opacity,
                    zIndex: cardState.zIndex,
                    visibility: cardState.visible ? "visible" : "hidden",
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="rounded-lg mb-4 w-full h-auto object-cover"
                  />
                  <h3 className="text-xl sm:text-3xl lg:text-4xl font-semibold mb-2">
                    {card.title}
                  </h3>
                  {card.content}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const ProductsBrands = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const brands = [
    {
      name: "HYSTER",
      logo: "/lndp8.png",
      untext: "Hyster",
      description:
        "Hyster is a leading global materials handling brand offering lift trucks and robotics for demanding port and industrial applications.",
      linkText: "Learn more about ",
      linkColor: "text-[#E3A824]",
    },
    {
      name: "YALE",
      logo: "/lndp9.png",
      untext: "Yale",
      description:
        "Yale is a leading global materials handling brand focused on innovative forklifts and robotics technologies for warehouses.",
      linkText: "Learn more about ",
      linkColor: "text-[#E3A824]",
    },
    {
      name: "MAXIMAL",
      logo: "/lndp10.png",
      untext: "Maximal",
      description:
        "The Maximal brand provides high-value, cost-effective forklifts for customers requiring fundamental truck performance.",
      linkText: "Learn more about ",
      linkColor: "text-[#E3A824]",
    },
    {
      name: "SUMITOMO",
      logo: "/lndp11.png",
      untext: "Sumitomo",
      description:
        "The Sumitomo brand provides high-performance trucks for standard applications.",
      linkText: "Learn more about ",
      linkColor: "text-[#E3A824]",
    },
    {
      name: "BOLZONI",
      logo: "/lndp12.png",
      untext: "Bolzoni",
      subtitle: "AURAMO",
      description:
        "Bolzoni Auramo and Meyer are leading brands of attachments for industrial materials handling applications offered by Hyster Group.",
      linkText: "Learn more about ",
      linkColor: "text-[#E3A824]",
    },
    {
      name: "NUVERA",
      logo: "/lndp13.png",
      untext: "Nuvera",
      description:
        "Nuvera is a power option brand for fuel cell stacks and engines for mobility applications.",
      linkText: "Learn more about ",
      linkColor: "text-[#E3A824]",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Reset animation state every time the section enters/leaves viewport
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Calculate animation state for each card
  const getCardAnimation = (index) => {
    if (!isVisible) {
      return {
        transform: "translateY(80px) scale(0.9)",
        opacity: 0,
        transition: "none",
      };
    }

    const delay = index * 150; // 150ms delay between each card
    const animationDuration = 800; // 800ms animation duration

    return {
      transform: "translateY(0) scale(1)",
      opacity: 1,
      transition: `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
    };
  };

  return (
    <div
      ref={sectionRef}
      className="bg-[#FFFFFF] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Section Header with Animation */}
      <div className="px-8 mb-20 relative">
        <div className="max-w-6xl mx-auto relative">
          {/* Background text - & BRANDS */}
          <div
            className="absolute top-20 md:left-56 text-5xl md:text-7xl font-bold text-[#373737]/90 select-none transition-all duration-1000 ease-out"
            style={{
              transform: isVisible
                ? "translateX(0) scale(1)"
                : "translateX(-50px) scale(0.9)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: "200ms",
            }}
          >
            & BRANDS
          </div>

          {/* Foreground text - PRODUCTS */}
          <div
            className="relative z-10 text-5xl md:text-7xl font-bold text-[#373737] text-center pt-4 transition-all duration-1000 ease-out"
            style={{
              transform: isVisible
                ? "translateY(0) scale(1)"
                : "translateY(30px) scale(0.95)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: "100ms",
            }}
          >
            PRODUCTS
          </div>
        </div>
      </div>

      {/* Brand Cards Grid */}
      <div className="max-w-7xl mx-auto mt-[12rem] px-4">
        {/* Responsive flex container */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8 mb-8 lg:mb-12">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="w-full sm:w-[48%] lg:w-[23%] bg-white p-6 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              style={getCardAnimation(index)}
            >
              {/* Logo Container with Hover Effect */}
              <div className="mb-6 h-16 flex items-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg flex items-center justify-center p-2 group-hover:from-[#E3A824]/10 group-hover:to-[#E3A824]/5 transition-all duration-300">
                  <div className="mb-6 h-16 flex items-center">
                    <img src={brand.logo} alt={brand.name} />
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#373737] text-sm leading-relaxed mb-6 min-h-[4rem] group-hover:text-gray-800 transition-colors duration-300">
                {brand.description}
              </p>

              {/* Link with Enhanced Hover */}
              <div className="relative">
                <a
                  href="#"
                  className={`${brand.linkColor} text-sm font-medium block group-hover:text-[#d4941f] transition-colors duration-300 relative overflow-hidden`}
                >
                  <span className="relative z-10">
                    {brand.linkText}
                    <span className="underline curser-pointer">
                      {brand.untext}
                    </span>
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GlobalPresence = () => {
  return (
    <div className="relative w-full bg-white text-center py-12 px-4">
      {/* Heading */}

      <div className=" text-[#373737] md:px-8 pb-20 relative ">
        <div className="max-w-6xl mx-auto relative">
          {/* Background text - OUR FUTURE */}
          <div className="absolute top-21 md:top-20 left-12 md:left-36 text-5xl md:text-7xl font-bold text-[#373737] select-none">
            PRESENCE
          </div>

          {/* Foreground text - OUR FOUNDATION */}
          <div className="relative z-10 text-5xl md:text-7xl font-bold text-[#373737] text-center pt-4">
            A WIDE GLOBAL
          </div>
        </div>
      </div>

      {/* Map Image */}
      <div className="relative max-w-6xl mx-auto">
        <img
          src="/lndp16.png" // or "/lndp15.png" if it's in /public
          alt="Global Map"
          className="w-full h-auto "
        />
      </div>

      {/* Caption */}
      <p className="mt-18 px-10 md:px-30 lg:px-62 text-center text-black font-normal  text-base sm:text-lg leading-[26px]">
        With Hyster-Yale locations throughout North America, South America,
        Europe and Asia, employees have options to work abroad. Full-time
        opportunities, rotational programs and training sessions are available
        around the globe as a way to personal and professional growth.
      </p>
    </div>
  );
};
