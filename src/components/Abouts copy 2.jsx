import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import http from "../service/http";
import JourneyTimeline from "./JourneyTimeline";

const Abouts = () => {
  const [abouts, setAbouts] = useState([]);
  const [aboutsdeco, setAboutsdeco] = useState([]);
  const [journey, setJourney] = useState(null);

  const fetchData = async () => {
    try {
      const response = await http.get(`/common`);
      console.log("Fetched data:", response.data);
      const Alldata = response.data?.data;
      setAbouts(Alldata?.chairmanmsg[0]);
      setAboutsdeco(Alldata?.lastdecade[0]);
      setJourney(Alldata?.journey?.[0]); // setJourney(Alldata?.journey);
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

      {/* TOP HERO BANNER */}
      <section
        className="relative w-full h-[85vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/about.png')",
        }}
      >
        {/* <div className="absolute inset-0 bg-black/60"></div> */}
      </section>

      {/* SECOND IMAGE */}
      <section className="w-full">
        <img
          src="/img/image.png"
          alt="Contact Banner"
          className="w-full object-cover"
        />
      </section>

      <section className=" w-full hidden lg:flex flex-row">
        {/* LEFT SIDE IMAGE WITH BLUE BACKGROUND */}
        <div className="md:w-1/2 bg-blue-700 flex items-center justify-center p-0 md:h-[800px]">
          <img
            src={abouts?.image_url || "/chairman2.png"}
            alt="Mohammad Jamaluddin"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="md:w-1/2 bg-[#EEF5D7] p-10 md:p-16 flex flex-col justify-center md:h-[800px]">
          <p className="text-green-600 font-semibold tracking-wide mb-2">
            CHAIRMAN
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {abouts?.title}
          </h2>

          <p
            className="text-gray-700 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: abouts?.description }}
          ></p>

          {/* <p className="text-gray-900 font-semibold italic leading-relaxed">
      “I have never looked at the balance sheet of any company I took over.
      It was pure gut-feel and I never went wrong. The moment I ignored the
      gut reaction, I made a mistake.”
    </p> */}
        </div>
      </section>

       <section className="w-full block lg:hidden flex flex-col md:flex-row px-5 bg-[#EEF5D7] ">

        <div className="md:w-1/2 bg-[#EEF5D7] mt-20  flex flex-col justify-center ">
          <p className="text-green-600 font-semibold tracking-wide">
            CHAIRMAN
          </p>

          <h2 className="text-2xl  mb-4">
            {abouts?.title}
          </h2>

          <p
            className="text-gray-700 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: abouts?.description }}
          ></p>

         
        </div>
        <div className="md:w-1/2  flex items-center justify-center p-0 ">
          <img
            src={abouts?.image_url || "/chairman2.png"}
            alt="Mohammad Jamaluddin"
            className="w-full h-[400px] mb-10 object-cover"
          />
        </div>

        {/* RIGHT SIDE CONTENT */}
        
      </section>

      <img src="/img/line.png" className="" />

      <section className="w-full py-16 mx-auto px-5 max-w-6xl">
        {/* Heading */}
        <p className="text-[#98C20B] font-semibold tracking-wide">GROWTH</p>
        <h2 className="text-4xl font-bold mt-2 mb-12">{aboutsdeco?.title}</h2>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-2">
          {/* LEFT BLUE BOX */}
          <div
            className="bg-[#0B5394] text-white p-8 md:p-12 rounded-md flex flex-col justify-center"
            dangerouslySetInnerHTML={{ __html: aboutsdeco?.description }}
          ></div>

          {/* RIGHT IMAGE */}
          <div className="w-full">
            <img
              src="/img/Group 230.png"
              alt="Growth illustration"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </section>

     <JourneyTimeline journey={journey} />



      

      <section className="w-full py-16 mx-auto px-5 max-w-6xl">
        <div
          className=" text-center bg-gradient-to-b
    from-[#FFFFFF]
    to-[#CCCCCC] p-10 px-20"
        >
          <p className="text-lg md:text-lg font-semibold font-weight-600 text-gray-700 leading-relaxed">
            This 25-year journey—from resilient roots to global leadership—is a
            testament to our team’s spirit and our legacy of excellence. As we
            celebrate this milestone, we honor the past and boldly shape the
            next quarter-century.
          </p>
        </div>
      </section>

      {/* Tailwind triangle helper */}
      <style>
        {`
  .clip-path-custom {
  clip-path: polygon(50% 100%, 0 0, 100% 0);
}
  .clip-triangle {
  clip-path: polygon(50% 100%, 0 0, 100% 0);
}


`}
      </style>

      <Footer />
    </>
  );
};

export default Abouts;
