import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/adminContext";
import { CheckCircle, Circle } from "lucide-react";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-10 my-10">
      {doctors.map((item, idx) => (
        <div
          key={idx}
          className={` ${
            item.available === true
              ? "bg-white cursor-pointer rounded-xl shadow-sm hover:shadow-md transition-all duration-150 p-4 w-64 text-center border border-gray-200 group"
              : "bg-white cursor-pointer rounded-xl shadow-sm hover:shadow-md transition-all duration-150 p-4 w-64 text-center border border-gray-200 group opacity-60"
          }`}
        >
          <img
            src={item.image}
            alt="Doctor"
            className="w-full h-52 mx-auto object-cover bg-gray-100 group-hover:bg-primary transition-all duration-150 rounded-xl"
          />
          <h3 className="mt-3 text-lg font-semibold text-gray-900 text-left">
            {item.name}
          </h3>
          <p className="text-gray-500 text-sm text-left">{item.speciality}</p>
          {/* Availability Checkbox */}
          {/* <input type="checkbox" className="hidden" /> */}
          <div className="flex items-center justify-start mt-3 cursor-pointer">
            <input
              type="checkbox"
              checked={item.available}
              onChange={() => handleAvailabilityChange(item.id)}
              className="hidden"
            />
            <label
              onClick={() => handleAvailabilityChange(item.id)}
              className="cursor-pointer"
            >
              {item.available ? (
                <CheckCircle className="text-green-500 w-4 h-4 border border-black rounded-md" />
              ) : (
                <Circle className="text-gray-400 w-4 h-4 border border-black rounded-md" />
              )}
            </label>

            <span className="ml-2 text-sm font-medium text-gray-700">
              {item.available ? "Available" : "Not Available"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorsList;
