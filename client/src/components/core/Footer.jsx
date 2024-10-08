import React from "react";
import { FaGlobe, FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import { FaPinterest } from "react-icons/fa";
import madeInIndia from "../../assets/footer-made-in-india-icon.svg";
import assuredQuality from "../../assets/footer-quality-icon.svg";
import securePayment from "../../assets/footer-secure-payment-icon.svg";
import empoveringWeavers from "../../assets/footer-customer-icon.svg";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-screen text-orange-50">
      <div className="flex w-full justify-evenly flex-wrap text-orange-950 border-t">
        <div className="flex flex-col items-center justify-center gap-4 px-20 py-10">
          <img src={madeInIndia} />
          <p>MADE IN INDIA</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 px-20 py-10">
          <img src={assuredQuality} />
          <p>ASSURED QUALITY</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 px-20 py-10">
          <img src={securePayment} />
          <p>SECURE PAYMENT</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 px-20 py-10">
          <img src={empoveringWeavers} />
          <p>EMPOVERING WEAVERS</p>
        </div>
      </div>

      <div className=" bg-amber-950  p-10">
        <div className="pb-10">
          <Link to={"/"}>
            <p className="text-red-600 text-2xl font-bold sm:block">
              Mansuri<span className="text-white">Mart</span>
            </p>
          </Link>
        </div>

        <div className="flex text-sm leading-7 flex-wrap justify-center py-5 border-b border-t border-yellow-900">
          <div className=" w-[279px]">
            <h1 className="font-semibold py-5">CATEGORIES</h1>
            <p>Kurta Pajama</p>
            <p>Kurta Jacket Set</p>
            <p>Nehru Jackets</p>
            <p>Indo Western</p>
            <p>Sherwani</p>
            <p>Lehenga</p>
            <p>Saree</p>
            <p>Kidswear</p>
            <p>Accessoreis</p>
          </div>
          <div className=" w-[279px]">
            <h1 className="font-semibold py-5">SUPPORT</h1>
            <p>Track Order</p>
            <p>Contact Us</p>
            <p>My Account</p>
          </div>

          <div className=" w-[279px]">
            <h1 className="font-semibold py-5">QUICK LINKS</h1>
            <p>About Us </p>
            <p>Brand Story</p>
            <p>Blogs</p>
            <p>Careers</p>
            <p>Book a Video Call</p>
            <p>Store Locator</p>
          </div>

          <div className=" w-[279px]">
            <h1 className="font-semibold py-5">OUR POLICIES</h1>
            <p>FAQs</p>
            <p>Shipping Detail</p>
            <p>Return, Exchange and Refund Policy</p>
            <p>Terms of Use</p>
            <p>Privacy Policy</p>
            <p>Cookies Policy</p>
          </div>

          <div className=" w-[279px]">
            <h1 className="font-semibold py-5">CONTACT</h1>
            <p>
              <span className=" font-normal text-sm underline">
                care@mansurimart.com
              </span>
            </p>
            <p>
              Call Us at:1800 120 000 500 (India)/+919674373838(Inernational)
            </p>
            <p>10 am-7 pm, Monday-Saturday</p>
            <p>For Buld/Institutional orders, contact +9181450044119</p>
            <div>
              <h1 className="font-semibold pt-5">KEEP IN TOUCH</h1>
              <div className=" w-6/12 flex text-orange-600 py-2 justify-between">
                <FaFacebookF />

                <FaTwitter />

                <FaInstagram />

                <FaLinkedinIn />

                <TfiYoutube />

                <FaPinterest />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-around items-center flex-wrap py-5 ">
          <div className="flex items-center gap-2">
            <FaGlobe />
            <span>India</span>
          </div>
          <p className="text-center">
            © 2024 Mansuri Fashions Ltd. All rights reserved.
          </p>
          <p className="text-center">100% Secure Payments</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
