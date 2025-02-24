import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="w-full py-10">
      <h2 className="text-center text-4xl uppercase">
        About <span className="font-semibold">Us</span>
      </h2>
      <div className="w-full flex my-10">
        <div className="w-2/5 pr-16">
          <img src={assets.about_image} alt="" className="w-[90%]" />
        </div>
        <div className="w-3/5">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <br />
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <br />
          <span className="font-semibold">Our Vision</span>
          <br />
          <br />
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl mt-16 uppercase">
          Why <span className="font-semibold">Choose Us</span>
        </h2>
        <div className="flex mt-5">
          <div className="border border-gray-500 px-5 py-10">
            <h2 className="text-lg font-medium uppercase">Efficiency:</h2>
            <p className="pt-5">
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>
          <div className="border border-gray-500 px-5 py-10">
            <h2 className="text-lg font-medium uppercase">Convenience:</h2>
            <p className="pt-5">
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>
          <div className="border border-gray-500 px-5 py-10">
            <h2 className="text-lg font-medium uppercase">Personalization:</h2>
            <p className="pt-5">
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
