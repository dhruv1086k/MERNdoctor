import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="flex flex-col justify-center items-center px-6 bg-white">
      <h2 className="text-center md:text-left text-2xl py-10 font-semibold tracking-wide text-gray-800">
        CONTACT <span className="font-bold">US</span>
      </h2>
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-10">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.contact_image}
            alt="Doctor with patient"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2">
          {/* Office Details */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">OUR OFFICE</h3>
            <p className="text-gray-600 mt-2">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
            <br />
            <p className="text-gray-600 mt-1">Tel: (415) 555-0132</p>
            <p className="text-gray-600">Email: greatstackdev@gmail.com</p>
          </div>

          {/* Careers Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">
              CAREERS AT PRESCRIPTO
            </h3>
            <p className="text-gray-600 mt-2">
              Learn more about our teams and job openings.
            </p>
            <button className="mt-4 px-4 py-2 border-2 border-gray-900 text-gray-900 font-medium rounded-sm hover:bg-gray-900 hover:text-white transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
