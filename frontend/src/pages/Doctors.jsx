import React, { useContext, useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600 mt-5">
        Browse through the doctors specialist.
      </p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "General physician"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
          >
            General physician
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""
            }`}
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
          >
            Gynecologist
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""
            }`}
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
          >
            Dermatologist
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""
            }`}
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
          >
            Pediatricians
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""
            }`}
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
          >
            Neurologist
          </p>
          <p
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
              speciality === "Gastroenterologist"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid grid-cols-auto  max-sm:grid-cols-2 gap-4 gap-y-6">
          {filterDoc?.map((doctor, idx) => (
            <div
              className={`${
                doctor.available
                  ? "border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                  : "border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 opacity-70"
              }`}
              key={idx}
              onClick={() =>
                navigate(
                  `${
                    doctor.available ? `/doctors/appointment/${doctor._id}` : ""
                  }`
                )
              }
            >
              <img src={doctor.image} alt="" className="bg-blue-50" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center">
                  {doctor.available ? (
                    <p className="w-2 h-2 bg-green-400 rounded-full"></p>
                  ) : (
                    <p className="w-2 h-2 bg-red-600 rounded-full"></p>
                  )}
                  <p
                    className={`${
                      doctor.available ? "text-green-400" : "text-red-600"
                    }`}
                  >
                    {doctor.available ? "Available" : "Not Available"}
                  </p>
                </div>
                <p className="text-gray-600 text-lg font-medium">
                  {doctor.name}
                </p>
                <p className="text-gray-600 text-sm">{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
