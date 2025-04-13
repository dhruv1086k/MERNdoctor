import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/adminContext";
import { IoCloseSharp } from "react-icons/io5";
import { AppContext } from "../../context/appContext";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div>
      <div className="p-4 w-full mx-auto">
        <h1 className="text-xl font-medium mb-4">All Appointments</h1>
        <div className="border rounded-lg overflow-hidden w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th
                  className="py-4 px-4 text-left font-medium text-gray-700"
                  width="5%"
                >
                  #
                </th>
                <th
                  className="py-4 px-4 text-left font-medium text-gray-700"
                  width="15%"
                >
                  Patient
                </th>
                <th
                  className="py-4 px-4 text-left font-medium text-gray-700"
                  width="8%"
                >
                  Age
                </th>
                <th
                  className="py-4 px-4 text-left font-medium text-gray-700"
                  width="18%"
                >
                  Date & Time
                </th>
                <th
                  className="py-4 px-4 text-left font-medium text-gray-700"
                  width="25%"
                >
                  Doctor
                </th>
                <th
                  className="py-4 px-4 text-left font-medium text-gray-700"
                  width="8%"
                >
                  Fees
                </th>
                <th
                  className="py-4 px-4 text-left font-medium text-gray-700"
                  width="10%"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {appointments.map((appointment, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-4 px-4">{idx + 1}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden mr-3">
                        <img
                          src={appointment.userData.image}
                          alt="Patient"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span>{appointment.userData.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {calculateAge(appointment.userData.dob)}
                  </td>
                  <td className="py-4 px-4">
                    {appointment.slotDate.replaceAll("_", "/")}{" "}
                    {appointment.slotTime}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden mr-3">
                        <img
                          src={appointment.docData.image}
                          alt="Doctor"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span>{appointment.docData.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">${appointment.docData.fees}</td>
                  <td className="py-4 px-4">
                    {appointment.cancelled ? (
                      <p className="text-xs text-red-600 font-medium">
                        Cancelled
                      </p>
                    ) : (
                      <button
                        onClick={() => cancelAppointment(appointment._id)}
                        className="text-red-400"
                      >
                        <IoCloseSharp size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
