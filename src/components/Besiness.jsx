import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import GlobalMap from "./GlobalMap";
import http from "../service/http";

const Besiness = () => {
  const [business, setBusiness] = useState([]);

  const fetchData = async () => {
    try {
      const response = await http.get(`/common`);
      console.log("Fetched data:", response.data);
      const Alldata = response.data?.data;
      setBusiness(Alldata?.business);
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

      <section
        className="relative w-full h-[50vh] sm:h-[60vh] md:h-[85vh] bg-cover md:bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/besiness.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">
          <div className="max-w-xl text-white">
            <div className="flex items-center gap-2">
              <span className="w-15 h-[2px] bg-[#40BD02]"></span>
              <p className="text-sm text-gray-200">Businesses</p>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">Businesses</h1>

            <div className="flex gap-3 items-start">
              <div className="w-[2px] bg-[#40BD02] h-20 mt-4"></div>

              <p className="text-gray-200 leading-relaxed text-sm md:text-base max-w-md">
                Building upon its international expertise, Premier Group has
                diversified its presence in India across multiple high-growth
                sectors, aligned with its philosophy of purpose-driven progress
                and community upliftment
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <img
          src="/img/image.png"
          alt="Banner"
          className="w-full object-cover"
        />
      </section>

      <section className="w-full py-12 mb-5 mx-auto px-5 max-w-6xl">
        <div className="mb-10">
          <p className="text-[#86C200] font-semibold tracking-wide">BUSINESS</p>
          <h2 className="text-4xl md:text-5xl font-bold">Businesses</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {business.slice(0, 5).map((item, index) => (
              <div
                key={item.id}
                className={`relative group cursor-pointer ${
                  index === 4 ? "sm:col-span-2" : ""
                }`}
              >
                <img
                  src={item.image_url}
                  className="w-full h-48 object-cover"
                  alt={item.title}
                />

                <div className="absolute inset-0 bg-black/20 rounded"></div>

                <p className="absolute bottom-6 left-3 text-white font-semibold text-lg">
                  {item.title}
                </p>

                <div className="absolute left-3 bottom-4 w-[75%] h-[1px] bg-gradient-to-r from-[#C1FF00] to-[#2295CA]"></div>

                <span className="absolute bottom-2 right-3 text-white text-xl">
                  <img src="/img/icon.png" />
                </span>
              </div>
            ))}
          </div>

          {business[5] && (
            <div className="relative h-full cursor-pointer">
              <img
                src={business[5].image_url}
                className="w-full h-full object-cover"
                alt={business[5].title}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

              <p className="absolute bottom-12 left-6 text-white text-2xl font-semibold">
                {business[5].title}
              </p>

              <div className="absolute bottom-10 left-6 flex items-center">
                <div className="w-28 h-[2px] bg-gradient-to-r from-[#C1FF00] to-[#2295CA]"></div>
                <div className="w-[320px] hidden lg:block h-[2px] bg-white ml-1"></div>
                <div className="w-[200px] block lg:hidden h-[2px] bg-white ml-1"></div>
              </div>

              <div className="absolute bottom-3 left-6 flex items-center gap-2 text-white font-semibold text-lg">
                <span>Explore More</span>
                <span className="text-xl">⟶</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <img src="/img/line.png" />

      <section className="w-full py-12 mb-5 mx-auto px-5 max-w-6xl">
        <div className="mb-10">
          <p className="text-[#86C200] font-semibold tracking-wide">CAREERS</p>
          <h2 className="text-4xl md:text-5xl font-bold">JOIN US</h2>
        </div>

        <div className="grid grid-cols-12 gap-3 mt-10">
          <div className="col-span-12 md:col-span-5 h-[220px]">
            <img
              src="/img/b.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="col-span-12 md:col-span-7 h-[220px] bg-[#1E6FB6] text-white p-10  flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-3">Businesses in India</h3>
            <p className="text-sm leading-relaxed max-w-md">
              Building upon its international expertise, Premier Group has
              diversified its presence in India across multiple.
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 h-[220px] bg-[#86C200] "></div>

          <div className="col-span-12 md:col-span-4 h-[220px] bg-[#1E6FB6] text-white flex flex-col items-center justify-center text-center p-6">
            <img src="/img/Group.png" className="w-12 mb-3" />
            <h3 className="text-3xl font-bold">200+</h3>
            <p className="text-sm mt-1">Employees at the Premier Group</p>
          </div>

          <div className="col-span-12 md:col-span-4 h-[220px] bg-[#86C200] text-white p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4">
              Featured Jobs
            </h3>

            <div className="flex gap-4">
              
              {/* Vertical Line */}
              <div className="w-[2px] opacity-80 bg-[#C1FF00]"></div>

              {/* Text */}
              <p className="text-sm leading-relaxed">
                Building upon its <br />
                international expertise, <br />
                Premier Group has <br />
                diversified its presence.
              </p>

            </div>
          </div>

        </div>
      </section>

      {/* <GlobalMap /> */}

      <Footer />
    </>
  );
};

export default Besiness;
