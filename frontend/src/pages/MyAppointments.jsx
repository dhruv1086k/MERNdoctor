import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  return (
    <div>
      <div className="mt-10 mb-5">
        <h1 className="text-2xl">My appointments</h1>
        <hr className="mt-3" />
      </div>
      <div className="flex flex-col gap-5 items-center">
        {doctors?.slice(0, 2).map((doc) => (
          <div className="w-full">
            <div className="flex items-center bg-white rounded-lg p-6 w-full max-w-7xl">
              {/* Doctor Image */}
              <img
                src={doc.image}
                alt={doc.name}
                className="w-40 h-40 rounded-md object-cover border border-gray-300"
              />

              {/* Doctor Details */}
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{doc.name}</h2>
                <p className="text-gray-600">{doc.speciality}</p>
                <p className="mt-2 text-gray-500">
                  <span className="font-semibold">Address:</span>
                  <br />
                  {doc.address.line1} <br />
                  {doc.address.line2}
                </p>
                <p className="mt-2 text-gray-500">
                  <span className="font-semibold">Date & Time:</span> 25, July,
                  2024 | 8:30 PM
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col space-y-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Pay here
                </button>
                <button className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition-all duration-200">
                  Cancel appointment
                </button>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
