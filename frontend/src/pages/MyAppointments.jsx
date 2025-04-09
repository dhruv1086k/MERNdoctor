import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-razorpay",
            response,
            { headers: { token } }
          );

          if (data.success) {
            getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (err) {
          console.log(err);
          toast.error(err.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open(); // for popup of rzp
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="px-4 md:px-10">
      <div className="mt-10 mb-5 text-center md:text-left">
        <h1 className="text-2xl">My appointments</h1>
        <hr className="mt-3" />
      </div>
      <div className="flex flex-col gap-5 items-center w-full">
        {appointments.map((doc) => (
          <div className="w-full max-w-3xl md:max-w-7xl">
            <div className="flex flex-col md:flex-row items-center bg-white rounded-lg p-4 md:p-6 w-full shadow-md">
              {/* Doctor Image */}
              <img
                src={doc.docData.image}
                alt={doc.docData.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-md object-cover border border-gray-300"
              />

              {/* Doctor Details */}
              <div className="flex-1 mt-4 md:mt-0 md:ml-4 text-center md:text-left">
                <h2 className="text-lg font-semibold">{doc.docData.name}</h2>
                <p className="text-gray-600">{doc.docData.speciality}</p>
                <p className="mt-2 text-gray-500">
                  <span className="font-semibold">Address:</span>
                  <br />
                  {doc.docData.address.line1} <br />
                  {doc.docData.address.line2}
                </p>
                <p className="mt-2 text-gray-500">
                  <span className="font-semibold">Date & Time: </span>
                  {doc.slotDate.replaceAll("_", "/")} &nbsp;
                  {doc.slotTime}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col space-y-2 mt-4 md:mt-0">
                {!doc.cancelled && doc.payment && (
                  <button
                    onClick={() => appointmentRazorpay(doc._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-md w-full md:w-auto"
                  >
                    Paid
                  </button>
                )}
                {!doc.cancelled && !doc.payment && (
                  <button
                    onClick={() => appointmentRazorpay(doc._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full md:w-auto"
                  >
                    Pay Online
                  </button>
                )}
                {!doc.cancelled && (
                  <button
                    onClick={() => cancelAppointment(doc._id)}
                    className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition-all duration-200 w-full md:w-auto"
                  >
                    Cancel appointment
                  </button>
                )}
                {doc.cancelled && (
                  <button className="cursor-default border border-red-500 px-4 py-2 rounded-md text-red-500  transition-all duration-200 w-full md:w-auto">
                    Appointment cancelled
                  </button>
                )}
              </div>
            </div>
            <hr className="my-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
