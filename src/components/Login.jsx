import React, { useState } from "react";

import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../service/http";
// import ContactUsModal from "../components/landingpage/ContactUsPage";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // State to store the user ID
  const [userId, setUserId] = useState(null);

  // Handle change in form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true); // Start loader

    try {
      const response = await http.post("/auth/login", {
        email: formData.username,
        password: formData.password,
      });

      const data = response.data;
      console.log("user:-", data.user);

      toast.success(data.message);

      localStorage.setItem("token", data?.token);
      localStorage.setItem("userData", JSON.stringify(data?.user));
      localStorage.setItem("asAdmin", 1);

      navigate("/dashboard");
    } catch (error) {
      console.error("There was an error!", error);
      toast.error(error.response.data.message || "Something went wrong!");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header */}
      {/* <header
        onClick={() => setOpen2(true)}
        className="fixed pl-15 lg:pl-[125.15px] top-0 left-0 w-full bg-[#0E3744] h-[38px] flex items-center justify-between px-6 text-white text-sm z-10"
      >
        <span>Contact Us</span>
      </header> */}

      <div
        className="relative flex flex-grow flex-col items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/bgimg.png')" }}
      >
        {/* Logo */}
        <div className="absolute top-15 left-12 lg:left-[110px]">
          <img
            src="/img/Logo.png"
            alt="Logo"
            className="h-[50px] w-full object-contain"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0  bg-opacity-40"></div>

        {/* Login Box */}
        <div className="relative z-10 bg-[#1A3F51]/90 text-white p-8 rounded-[8px] shadow w-full max-w-[711.770751953125px]">
          <div className="flex flex-col items-center">
            <h2 className="text-[26px] font-semibold text-center">
              PREMIER GROUP ADMINISTRATION LOGIN!
            </h2>
            <p className="text-[13px] w-[347.16650390625px] mt-2 font-normal text-center mb-4">
              Use a valid username & password to gain access to the
              administrator backend.
            </p>
          </div>

          {/* Lock Icon */}
          <div className="flex w-full mt-4">
            <div className="flex justify-center">
              <img
                src="/lockimg.png"
                alt="Lock"
                className="w-[182.5721435546875px] h-[182.5721435546875px]"
              />
            </div>

            {/* Login Form */}
            <div className="w-[380.6470031738281px] h-full">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-2">
                  <label className="block  text-[12.61px] text-[#FFFFFF] font-medium">
                    User name
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Your user name"
                    className="w-full p-3 focus:outline-none text-[12.33px] font-normal placeholder-[#B1B1B1] rounded-[7.05px] bg-[#FFFFFF] text-black shadow"
                  />
                </div>

                <div className="flex flex-col space-y-2 mt-3">
                  <label className="block  text-[12.61px] text-[#FFFFFF] font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="********"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-3 focus:outline-none text-[12.33px] font-normal placeholder-[#B1B1B1] rounded-[7.05px] bg-[#FFFFFF] text-black shadow"
                  />
                </div>

                {/* Forgot Password */}
                <div className="text-left text-xs mt-3 font-normal">
                  <a
                    href="/forgotpassword"
                    className="text-yellow-300 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Login Button */}
                <div className="flex justify-end mt-3">
                  {/* <button
                    type="submit"
                    className="w-fit flex text-lg font-medium items-center bg-[#63B1BC] hover:bg-teal-600 text-[#FFFFFF] px-6 py-1 rounded-[7.66px]"
                  >
                    login
                  </button> */}
                  <button
                    type="submit"
                    disabled={loading} // Disable button if loading or errors exist
                    className={`w-fit flex text-lg font-medium items-center   px-6 py-1 rounded-[7.66px]
                            ${
                              loading
                                ? "bg-gray-400 cursor-not-allowed text-white"
                                : "bg-[#63B1BC] text-[#FFFFFF] hover:bg-teal-600"
                            }`}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={18} sx={{ color: "white" }} />
                        <span>Signing...</span>
                      </>
                    ) : (
                      "login"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full text-center bg-[#0E3744] text-white text-xs py-2">
        5875 Landerbrook Drive, Suite 300 | Cleveland, Ohio| &copy; 2025 Premier
        Group, Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
