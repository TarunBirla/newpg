
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import http from "../service/http";


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
          backgroundImage: "url('/img/about.png')"
        }}
      >
        {/* <div className="absolute inset-0 bg-black/60"></div> */}
      </section>

      {/* SECOND IMAGE */}
      <section className="w-full">
        <img src="/img/image.png" alt="Contact Banner" className="w-full object-cover" />
      </section>


     

      <section className="w-full flex flex-col md:flex-row mt-10">
  {/* LEFT SIDE IMAGE WITH BLUE BACKGROUND */}
  <div className="md:w-1/2 bg-blue-700 flex items-center justify-center p-0 md:h-[800px]">
    <img
      src={ abouts?.image_url ||"/chairman2.png"}
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

    <p className="text-gray-700 leading-relaxed mb-6"
    dangerouslySetInnerHTML={{ __html: abouts?.description }}>
     
    </p>

    {/* <p className="text-gray-900 font-semibold italic leading-relaxed">
      “I have never looked at the balance sheet of any company I took over.
      It was pure gut-feel and I never went wrong. The moment I ignored the
      gut reaction, I made a mistake.”
    </p> */}
  </div>

</section>
    <img src="/img/line.png" className=""/>


    <section className="w-full py-16 mx-auto px-5 max-w-6xl">
      {/* Heading */}
      <p className="text-[#98C20B] font-semibold tracking-wide">GROWTH</p>
      <h2 className="text-4xl font-bold mt-2 mb-12">
        {aboutsdeco?.title}
      </h2>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-2">
        
        {/* LEFT BLUE BOX */}
        <div className="bg-[#0B5394] text-white p-8 md:p-12 rounded-md flex flex-col justify-center"
        dangerouslySetInnerHTML={{ __html: aboutsdeco?.description }}>
       

         
        </div>

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





{journey && (
<section className="w-full py-16 mx-auto px-5 max-w-6xl">

  {/* HEADING */}
  <p className="text-[#98C20B] font-semibold tracking-wide">JOURNEY</p>
  <h2 className="text-4xl font-bold mt-2 mb-12">
    {journey.title}
  </h2>

  {/* TIMELINE */}
  <div className="w-full flex justify-between items-center relative mb-20">
    <div className="absolute top-16 left-0 w-full border-t border-dashed border-gray-400"></div>

    {journey.steps.slice(0, 3).map((step, index) => (
      <div
        key={step.id}
        className={`flex flex-col items-center ${
          index === 0 ? "ml-[130px]" : index === 2 ? "mr-[130px]" : ""
        }`}
      >
        <img src="/img/iconb.png" alt="ribbon" className="w-20 mb-4" />
        <div
          className={`w-4 h-4 rounded-full ${
            index === 1 ? "bg-[#96B80A]" : "bg-[#0789D3]"
          }`}
        />
      </div>
    ))}
  </div>

  {/* CARDS */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

    {journey.steps.slice(0, 3).map((step, index) => {
      const isGreen = index === 1;

      return (
        <div
          key={step.id}
          className={`relative text-white rounded-xl pb-20 pt-24 px-6 ${
            isGreen ? "bg-[#96B80A]" : "bg-[#0789D3]"
          }`}
        >

          {/* NOTCH */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="relative w-36 h-24">
              <div className="absolute inset-0 bg-white clip-triangle shadow-lg"></div>
              <p className="absolute top-10 left-1/2 -translate-x-1/2 text-black font-bold text-xl">
                {String(step.step_number).padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <h3 className="text-xl font-semibold mb-3 mt-10">
            {step.title}
          </h3>

          <div
            className="text-sm opacity-90 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: step.description }}
          />

          {/* BOTTOM ICON */}
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
            <div
              className={`w-14 h-14 rounded-full bg-white flex items-center justify-center text-xl font-bold ${
                isGreen ? "text-[#96B80A]" : "text-[#0789D3]"
              }`}
            >
              ⌄
            </div>
          </div>

        </div>
      );
    })}
  </div>
</section>
)}

{journey && (
<section className="w-full py-10 mx-auto px-5 max-w-6xl">

  

  {/* TIMELINE */}
  <div className="w-full flex justify-between items-center relative mb-20">
    <div className="absolute top-16 left-0 w-full border-t border-dashed border-gray-400"></div>

    {journey.steps.slice(3, 6).map((step, index) => (
      <div
        key={step.id}
        className={`flex flex-col items-center ${
          index === 0 ? "ml-[130px]" : index === 2 ? "mr-[130px]" : ""
        }`}
      >
        <img src="/img/iconb.png" alt="ribbon" className="w-20 mb-4" />
        <div
          className={`w-4 h-4 rounded-full ${
            index === 1 ? "bg-[#96B80A]" : "bg-[#0789D3]"
          }`}
        />
      </div>
    ))}
  </div>

  {/* CARDS */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

    {journey.steps.slice(3, 6).map((step, index) => {
      const isGreen = index === 1;

      return (
        <div
          key={step.id}
          className={`relative text-white rounded-xl pb-20 pt-24 px-6 ${
            isGreen ? "bg-[#96B80A]" : "bg-[#0789D3]"
          }`}
        >

          {/* NOTCH */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="relative w-36 h-24">
              <div className="absolute inset-0 bg-white clip-triangle shadow-lg"></div>
              <p className="absolute top-10 left-1/2 -translate-x-1/2 text-black font-bold text-xl">
                {String(step.step_number).padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <h3 className="text-xl font-semibold mb-3 mt-10">
            {step.title}
          </h3>

          <div
            className="text-sm opacity-90 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: step.description }}
          />

          {/* BOTTOM ICON */}
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
            <div
              className={`w-14 h-14 rounded-full bg-white flex items-center justify-center text-xl font-bold ${
                isGreen ? "text-[#96B80A]" : "text-[#0789D3]"
              }`}
            >
              ⌄
            </div>
          </div>

        </div>
      );
    })}
  </div>
</section>
)}

<section className="w-full py-16 mx-auto px-5 max-w-6xl">
  <div className=" text-center bg-gradient-to-b
    from-[#FFFFFF]
    to-[#CCCCCC] p-10 px-20">
    <p className="text-lg md:text-lg font-semibold font-weight-600 text-gray-700 leading-relaxed">
      This 25-year journey—from resilient roots to global leadership—is a testament
      to our team’s spirit and our legacy of excellence. As we celebrate this
      milestone, we honor the past and boldly shape the next quarter-century.
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



<Footer/>
    </>

    )
    ;
};

export default Abouts;