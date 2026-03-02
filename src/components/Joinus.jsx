import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import GlobalMap from "./GlobalMap";
import http from "../service/http";
import { ChevronDown, Search } from "lucide-react";
import Select from "react-select";
const Joinus = () => {
  const [business, setBusiness] = useState([]);

  const countryOptions = [
    { value: "india", label: "India" },
    { value: "uae", label: "UAE" },
    { value: "usa", label: "USA" },
  ];
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

  const steps = [
    {
      id: "01",
      title: "Apply & Resume Screening",
      color: "bg-[#95C10C]",
      arrow: "border-t-[#95C10C]",
    },
    {
      id: "02",
      title: "Screen with People Team",
      color: "bg-[#0A6FB1]",
      arrow: "border-t-[#95C10C]",
    },
    {
      id: "03",
      title: "Hiring Manager Interview",
      color: "bg-[#95C10C]",
      arrow: "border-t-[#95C10C]",
    },
    {
      id: "04",
      title: "Practical Assignment",
      color: "bg-[#0A6FB1]",
      arrow: "border-t-[#95C10C]",
    },
    {
      id: "05",
      title: "Meet the Team",
      color: "bg-[#95C10C]",
      arrow: "border-t-[#95C10C]",
    },
    {
      id: "06",
      title: "Offer",
      color: "bg-[#0A6FB1]",
      arrow: "border-t-[#95C10C]",
    },
  ];

  const jobs = new Array(6).fill({
    team: "Customer Success",
    title: "Events Marketing Manager",
    location: "Dubai",
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    linkedin: "",
    cv: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // prepare form data for API
    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    console.log("FORM DATA:", form);

    // example API call
    // await fetch("/api/apply", { method: "POST", body: data });
  };

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
              <p className="text-sm text-gray-200">Careers</p>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">JOIN US</h1>

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

      {/* <img src="/img/line.png" /> */}

      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start px-6">
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-5xl font-semibold leading-tight mb-8">
              Our Recruiting <br /> Process In 6 Steps.
            </h2>

            <div className="border-l-2 border-[#0A70B1] ml-6 pl-6 pr-6 text-gray-600 leading-7 max-w-md">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since when an unknown.
              <br />
              <br />
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since when an unknown.
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {/* Card */}
                <div
                  className={`${step.color} text-white px-8 py-6 rounded-sm shadow-md`}
                >
                  <div className="text-xl font-semibold mb-1">
                    Step {step.id}
                  </div>
                  <div className="text-sm opacity-95">{step.title}</div>
                </div>

                {/* Arrow */}
                {i !== steps.length - 1 && (
                  <div
                    className={`absolute left-1/2 -bottom-3 -translate-x-1/2 w-0 h-0
                      border-l-[12px] border-r-[12px] border-t-[12px]
                      border-l-transparent border-r-transparent
                      ${step.arrow}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className=" py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Title */}
          <h2 className="text-5xl font-semibold mb-10">
            Find the right role for you
          </h2>

          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* Teams */}
            <div>
              <div className="text-sm text-gray-500 mb-2">Teams</div>
              <select className="w-full bg-gray-200 px-4 py-4 outline-none">
                <option>All</option>
              </select>
            </div>

            {/* Locations */}
            <div>
              <div className="text-sm text-gray-500 mb-2">Locations</div>
              <select className="w-full bg-gray-200 px-4 py-4 outline-none">
                <option>All</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex items-end">
              <div className="flex w-full bg-gray-200">
                <input
                  placeholder=""
                  className="flex-1 bg-transparent px-4 py-4 outline-none"
                />
                <div className="px-4 flex items-center border-l border-gray-300">
                  <Search size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Count */}
          <div className="text-xl mb-6">7 jobs available</div>

          {/* Jobs List */}
          <div className="flex flex-col">
            {jobs.map((job, i) => (
              <div
                key={i}
                className="py-6 border-b border-gray-400 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs text-[#95C10C] mb-1">{job.team}</div>
                  <div className="text-blue-600 font-medium">{job.title}</div>
                </div>

                <div className="text-blue-600">{job.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1E6A9E] py-24">
        <form
          onSubmit={handleSubmit}
          className="max-w-6xl mx-auto px-6 text-white space-y-6"
        >
          <h2 className="text-5xl font-semibold mb-2">Apply for this job</h2>
          <div className="text-[#C6FF09] text-sm mb-10">
            Indicates a required field
          </div>

          {/* Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              className="bg-transparent border border-white/60 px-5 py-4 outline-none placeholder-[#88D0FF] text-white w-full"
              placeholder="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
            <input
              className="bg-transparent border border-white/60 px-5 py-4 outline-none placeholder-[#88D0FF] text-white w-full"
              placeholder="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <input
            className="bg-transparent border border-white/60 px-5 py-4 outline-none placeholder-[#88D0FF] text-white w-full"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          {/* Country + Phone */}
          <div className="grid md:grid-cols-3 gap-6">
            <Select
              options={countryOptions}
              value={
                countryOptions.find((o) => o.value === form.country) || null
              }
              onChange={(option) =>
                setForm((prev) => ({ ...prev, country: option?.value || "" }))
              }
              placeholder="Country"
              styles={{
                control: (base, state) => ({
                  ...base,
                  background: "transparent",
                  borderColor: "rgba(255,255,255,0.6)",
                  boxShadow: "none",
                  padding: "6px",
                  minHeight: "56px",
                }),

                /* ❌ remove vertical line */
                indicatorSeparator: () => ({
                  display: "none",
                }),

                /* selected value */
                singleValue: (base) => ({
                  ...base,
                  color: "white",
                }),

                /* placeholder */
                placeholder: (base) => ({
                  ...base,
                  color: "#88D0FF",
                }),

                /* dropdown menu background */
                menu: (base) => ({
                  ...base,
                  background: "white",
                  zIndex: 50,
                }),

                /* dropdown options text */
                option: (base, state) => ({
                  ...base,
                  background: state.isFocused ? "#f1f5f9" : "white",
                  color: "black",
                  cursor: "pointer",
                }),
              }}
            />

            <input
              className="md:col-span-2 bg-transparent border border-white/60 px-5 py-4 outline-none placeholder-[#88D0FF] text-white w-full"
              placeholder="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          {/* File Upload */}
          <input
            type="file"
            className="bg-transparent border border-white/60 px-5 py-4 outline-none placeholder-[#88D0FF] text-white w-full"
            name="cv"
            onChange={handleChange}
          />

          {/* LinkedIn */}
          <input
            className="bg-transparent border border-white/60 px-5 py-4 outline-none placeholder-[#88D0FF] text-white w-full"
            placeholder="LinkedIn Profile"
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
          />

          {/* Button */}
          <div className="flex justify-center mt-14">
            <div className="relative">
              <button
                type="submit"
                className="bg-gray-200 text-[#98C20B] px-14 py-4 text-lg font-medium"
              >
                Apply Now
              </button>

              <div
                className="absolute left-1/2 -top-3 -translate-x-1/2 w-0 h-0 
              border-l-[12px] border-r-[12px] border-b-[12px]
              border-l-transparent border-r-transparent border-b-gray-200"
              />
            </div>
          </div>
        </form>
      </section>

      {/* <GlobalMap /> */}

      <Footer />
    </>
  );
};

export default Joinus;
