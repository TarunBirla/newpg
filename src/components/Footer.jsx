import { Facebook, Instagram, Linkedin, X, Youtube, Mail } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="w-full relative">
        <img src="/img/line.png" />
        {/* TOP FOOTER WITH BG IMAGE */}
        <div
          className="w-full bg-cover bg-center bg-no-repeat py-16"
          style={{ backgroundImage: 'url("/footer.png")' }}
        >
          <div className="max-w-6xl mb-5 md:mb-20 mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* LEFT LARGE COLUMN - COL 4 */}
            <div className="md:col-span-4 flex flex-col">
              {/* LOGO */}
              <img
                src="/img/Logo.png"
                alt="PG Logo"
                className="h-10 md:h-14 w-auto object-contain mb-2 order-2 md:order-1"
              />

              {/* DESCRIPTION */}
              <p className="text-[#CCCCCC] mb-3 md:mb-0 text-sm leading-relaxed max-w-xs order-1 md:order-2">
                Premier Group unites under a shared vision to drive sustainable
                growth, empower communities, and inspire progress for future
                generations.
              </p>
            </div>

            {/* RIGHT COLUMNS (Quick Links + Legal + Contact) - COL 8 */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-4 gap-10 items-start">
              {/* QUICK LINK */}

              <div className="hidden lg:block">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Quick Link
                </h4>
                <ul className="space-y-2 text-[#CCCCCC] text-sm">
                  <li className="hover:text-[#40BD02] cursor-pointer">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="hover:text-[#40BD02] cursor-pointer">
                    {" "}
                    <Link to="/abouts">About Us</Link>
                  </li>
                  <li className="hover:text-[#40BD02] cursor-pointer">
                    {" "}
                    <Link to="/projects">Projects</Link>
                  </li>

                  <li className="hover:text-[#40BD02] cursor-pointer">
                    {" "}
                    <Link to="/news-updates">Blog</Link>
                  </li>
                  <li className="hover:text-[#40BD02] cursor-pointer">
                    {" "}
                    <Link to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </div>

              {/* LEGAL */}
              <div className="">
                <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-[#CCCCCC] text-sm">
                  <li className="hover:text-[#40BD02] cursor-pointer">
                    <Link to="">Terms & Conditions </Link>
                  </li>
                  <li className="hover:text-[#40BD02] cursor-pointer">
                    Privacy Policy
                  </li>
                </ul>
              </div>

              {/* SOCIAL + SUBSCRIBE */}
              <div className=" flex items-center border-l pl-4 border-[#98C20B]">
                {/* <div className="h-30 w-[1px] bg-[#98C20B] " /> */}

                <div>
                  <h4 className="font-semibold text-white mb-4">
                    Social Media Link
                  </h4>

                  <div className="flex space-x-4 mb-6 text-white">
                    <Facebook size={18} />
                    {/* <Instagram size={18} />
                    <Linkedin size={18} /> */}
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
                    {/* <X size={18} /> */}
                    {/* <Youtube size={18} /> */}

                    {/* <a
                        href="mailto:contact@premiergroup.co"
                        className="hover:text-[#40BD02] transition-colors"
                      >
                        <Mail size={18} />
                      </a> */}
                  </div>

                  <div className="flex border border-[#98C20B] w-80">
                    <input
                      placeholder="Enter your email to subscribe"
                      className="bg-transparent px-3 py-2 text-sm outline-none text-white w-full"
                    />
                    <button className="bg-[#98C20B] px-4 flex items-center justify-center">
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT BAR */}
        <div className="w-full bg-[#0C0C0C] text-center py-4 text-gray-400 text-sm">
          Copyright © 2025{" "}
          <span className="text-[#40BD02] font-semibold cursor-pointer">
            Premier Group
          </span>
          . All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
