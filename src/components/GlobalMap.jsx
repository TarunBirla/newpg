import React, { useEffect, useState } from "react";
import http from "../service/http";

const GlobalMap = () => {
  const [globalPresence, setglobalPresence] = useState(null);

  const fetchData = async () => {
    try {
      const response = await http.get(`/common`);
      const Alldata = response.data?.data;

      setglobalPresence(Alldata?.globalPresence?.[0]);
    } catch (err) {
      console.error("Error fetching commen data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section
        className="
          w-full 
          py-16 md:py-24 
          px-6 md:px-20 
          text-center 
          bg-gradient-to-b 
          from-[#DBF1FF] 
          to-[#FFFFFF]
        "
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          {globalPresence?.title}
        </h1>

        <div
          className="max-w-3xl mx-auto text-gray-700 leading-relaxed mb-10 line-clamp-4"
          dangerouslySetInnerHTML={{ __html: globalPresence?.description }}
        ></div>

        <img
          src={globalPresence?.image_url || "/img/mapimage.png"}
          alt="Global Map"
          className="mx-auto w-full max-w-4xl"
        />
      </section>
    </>
  );
};

export default GlobalMap;
