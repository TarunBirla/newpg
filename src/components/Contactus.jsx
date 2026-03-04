import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import GlobalMap from "./GlobalMap";
import { Facebook, Instagram, Linkedin, X, Youtube, Mail } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const Contactus = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // VALIDATION FUNCTION
  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";

    // PHONE VALIDATION – Exactly 10 digits only
    if (!/^[0-9]{10}$/.test(form.phone_number)) {
      newErrors.phone_number = "Phone number must be exactly 10 digits";
    }

    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // No errors → valid
  };

  // SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("https://test.imanglobal.net/api/contacus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Message sent successfully!");
        setForm({ name: "", email: "", phone_number: "", message: "" });
      } else {
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      alert("Network error!");
    }
  };

  return (
    <>
      <Header />

      {/* TOP BANNER */}
      {/* <section
        className="hidden md:block relative w-full h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/Mask group.png')" }}
      ></section> */}

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
  CONTACT US
  </h1>

</section>

      <section
        className="block md:hidden relative w-full  h-[50vh] sm:h-[60vh] md:h-[85vh]  bg-cover md:bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Mask group.png')" }}
      >
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">
          <div className="max-w-xl text-white ">
            

            <h1 className="text-3xl md:text-5xl font-bold mb-4">Contact Us</h1>

           
          </div>
        </div>
      </section>

      <section className="w-full">
        <img src="/img/image.png" className="w-full" alt="Banner" />
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-4">
          <div>
            <img src="/img/Needhelp.png" className=" shadow-lg" />
          </div>

          <div>
            <h2 className="text-4xl  mb-3">Need more help?</h2>
            <p className="text-gray-600 mb-8">
              We’d love to hear from you! Whether you’re looking to buy, sell, or invest in real estate, our team is here to guide you every step of the way.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* NAME */}
              <h5 className="text-2xl  tracking-widest mb-2">
                Get in touch with us.
              </h5>
              <div className="grid grid-cols-2 gap-4  ">
              <div>
                <label className="block text-sm mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="p-[2px]  bg-gradient-to-r from-[#37B8E1] to-[#40BD02]">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full bg-white px-4 py-2  outline-none"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="p-[2px]  bg-gradient-to-r from-[#37B8E1] to-[#40BD02]">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-white px-4 py-2  outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="p-[2px]  bg-gradient-to-r from-[#37B8E1] to-[#40BD02]">
                  <input
                    type="tel"
                    name="phone_number"
                    maxLength="10"
                    value={form.phone_number}
                    onChange={(e) => {
                      // Allow only numbers
                      if (/^[0-9]*$/.test(e.target.value)) handleChange(e);
                    }}
                    placeholder="10 Digit Number"
                    className="w-full bg-white px-4 py-2  outline-none"
                  />
                </div>
                {errors.phone_number && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone_number}
                  </p>
                )}
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="p-[2px]  bg-gradient-to-r from-[#37B8E1] to-[#40BD02]">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Message..."
                    className="w-full bg-white px-4 py-2  outline-none h-[80px]"
                  />
                </div>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="px-6 py-2 text-white font-semibold  bg-gradient-to-r from-[#37B8E1] to-[#40BD02] hover:scale-105 transition"
              >
                SUBMIT
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-8">

              {/* LEFT — Email Section */}
              <div className="flex items-center gap-4">
                
                {/* Circle Icon */}
                <div className="w-12 h-12 rounded-full border-2 border-[#37B8E1] flex items-center justify-center">
                  <Mail className="text-[#37B8E1]" size={22} />
                </div>

                {/* Email Text */}
                <div>
                  <h4 className="font-semibold text-lg">Email Address</h4>
                  <p className="text-gray-600">contact@premiergroup.co</p>
                </div>
              </div>

              {/* RIGHT — Social Icons */}
              <div>
                <h4 className="text-lg font-semibold mb-3 md:text-right">
                  Connect with us
                </h4>

                <div className="flex md:justify-start gap-5">
                  <Facebook size={18} />
                    <a
                      href="https://www.instagram.com/premiergroup.co?igsh=MTlkM2FsYzJpdTdsMg%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#40BD02] transition-colors"
                    >
                      <Instagram size={18} />
                    </a>

                    <a
                      href="https://www.linkedin.com/company/premiergroup-co/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#40BD02] transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

    <section className="w-full">
        <img src="/image 104.png" className="w-full" alt="Banner" />
      </section>
      <Footer />
    </>
  );
};

export default Contactus;
