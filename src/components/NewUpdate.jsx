import React, { useEffect, useState } from "react";
import { Calendar, Search, Instagram, Linkedin } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import http from "../service/http";
import { useNavigate } from "react-router-dom";

const NewUpdate = () => {
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

   const navigate=useNavigate();
  return (
    <>
      <Header />

      {/* Hero Banner */}
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
   BLOGS
  </h1>

</section>

      <section
        className="block md:hidden relative w-full  h-[50vh] sm:h-[60vh] md:h-[85vh]  bg-cover md:bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Mask group.png')" }}
      >
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">
          <div className="max-w-xl text-white">
            

            <h1 className="text-3xl md:text-5xl font-bold mb-4">News & Updates</h1>

           
          </div>
        </div>
      </section>


      {/* Middle Image */}
      <section>
        <img src="/img/image.png" className="w-full  object-cover" />
      </section>

      {/* Main Blog Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">

        {/* LEFT MAIN POST */}
        <div className="md:col-span-8 space-y-6">

          {/* TOP: FIRST NEWS ITEM AS FEATURED */}
          {news.length > 0 && (
            <div 
             onClick={() => navigate(`/news/${news[0]?.id}`, { state: news[0] })}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">

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
              <div key={index}  onClick={() => navigate(`/news/${item.id}`, { state: item })} className="">
                <img src={item.image_url} className=" mb-3 w-full h-32 object-cover" />

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
              <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
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
                    <p className="text-sm font-medium leading-tight">{item.title}</p>
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

export default NewUpdate;
