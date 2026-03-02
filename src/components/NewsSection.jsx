import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import http from "../service/http";
import { useNavigate } from "react-router-dom";

export default function NewsSection() {
  const sliderRef = useRef(null);
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    try {
      const response = await http.get(`/common`);
      console.log("Fetched data:", response.data);
      const Alldata = response.data?.data;

      setNews(Alldata?.news);
    } catch (err) {
      console.error("Error fetching commen data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

  const navigate=useNavigate()
 

  return (
    <section className="w-full bg-white py-16  max-w-6xl mx-auto px-5">
      {/* Heading */}
      <div className="mb-12">
        <p className="text-green-600 font-semibold tracking-wide">BLOG</p>
        <h2 className="text-4xl font-bold mt-2">News & Updates</h2>
      </div>

      {/* Slider Row */}
      <div className="relative w-full max-w-7xl mx-auto">
        <div
          ref={sliderRef}
          className="flex gap-2 overflow-x-auto hide-scrollbar scroll-smooth"
        >
          {news.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/news/${item.id}`, { state: item })} 
              className="min-w-[360px] bg-white  transition p-4"
            >
            
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-48 object-cover  mb-4"
              />

              <p className="text-gray-500 text-sm mb-2">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>

              <h3 className="font-bold text-lg mb-3 leading-tight">
                {item.title}
              </h3>
              <div
                className="text-gray-600 text-sm leading-relaxed line-clamp-3"
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-1 mt-6">
          <button
            onClick={scrollLeft}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={scrollRight}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100"
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
  );
}
