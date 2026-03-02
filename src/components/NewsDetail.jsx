import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Calendar } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

const NewsDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  // Get object from navigation state
  const news = location.state;

  if (!news) {
    return (
      <>
        <Header />
        <div className="pt-40 text-center">
          News not found. Please go back.
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* Hero Banner */}
      <section
        className="hidden md:block relative w-full h-[85vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/img/newupdate.png')" }}
      />

      <section
        className="block md:hidden relative w-full h-[85vh] bg-cover md:bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/news.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">
          <div className="max-w-xl text-white">
            <div className="flex items-center gap-2">
              <span className="w-15 h-[2px] bg-[#40BD02]"></span>
              <p className="text-sm text-gray-200">News & Updates</p>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">News & Updates</h1>

            {/* <div className="flex gap-3 items-start">
              <div className="w-[2px] bg-[#40BD02] h-20 mt-4"></div>

              <p className="text-gray-200 leading-relaxed text-sm md:text-base max-w-md">
               Building a future where progress meets responsibility Premier Group leads with purpose, innovation, and a commitment to sustainable growth.
              </p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <img
          src={news.image_url}
          alt={news.title}
          className="w-full  mb-8"
        />

        <h3 className="font-bold text-2xl leading-snug">
                  {news.title}
                </h3>


        <div
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: news.description }}
        />
        <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                          <Calendar size={16} />{" "}
                          {new Date(news.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
      </section>

      <Footer />
    </>
  );
};

export default NewsDetail;
