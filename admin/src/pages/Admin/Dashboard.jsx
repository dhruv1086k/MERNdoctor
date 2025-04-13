import React, { useContext, useEffect } from "react";
import {
  FaUserMd,
  FaClipboardList,
  FaUser,
  FaFileAlt,
  FaTimes,
} from "react-icons/fa";
import { AdminContext } from "../../context/adminContext";

const Dashboard = () => {
  const { aToken, cancelAppointment, adminDashboard, dashboard } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      adminDashboard();
    }
  }, [aToken]);

  return (
    <div className="min-h-screen p-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center p-6 bg-white shadow rounded-xl">
          <FaUserMd className="text-blue-500 text-3xl mr-4" />
          <div>
            <p className="text-2xl font-semibold">{dashboard.doctors}</p>
            <p className="text-gray-600">Doctors</p>
          </div>
        </div>
        <div className="flex items-center p-6 bg-white shadow rounded-xl">
          <FaClipboardList className="text-purple-500 text-3xl mr-4" />
          <div>
            <p className="text-2xl font-semibold">{dashboard.appointments}</p>
            <p className="text-gray-600">Appointments</p>
          </div>
        </div>
        <div className="flex items-center p-6 bg-white shadow rounded-xl">
          <FaUser className="text-indigo-500 text-3xl mr-4" />
          <div>
            <p className="text-2xl font-semibold">{dashboard.patients}</p>
            <p className="text-gray-600">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointment Section */}
      <div className="bg-white shadow rounded-xl">
        <div className="flex items-center border-b px-6 py-4">
          <FaFileAlt className="text-blue-500 mr-2 text-3xl" />
          <h2 className="font-semibold text-lg">Latest Appointment</h2>
        </div>
        <div>
          {dashboard.latestAppointments?.map((appt, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center px-6 py-4 border-b last:border-b-0 hover:bg-gray-50 transition"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={appt.docData.image}
                    alt="doctor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{appt.docData.name}</p>
                  <p className="text-gray-500 text-sm">
                    Booking on{" "}
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {appt.cancelled ? (
                <p className="text-xs text-red-600 font-medium">Cancelled</p>
              ) : (
                <button
                  onClick={() => cancelAppointment(appt._id)}
                  className="p-2 bg-red-100 hover:bg-red-200 rounded-full"
                >
                  <FaTimes className="text-red-500" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
