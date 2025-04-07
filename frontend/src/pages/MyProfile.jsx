import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    userData && (
      <div className="min-h-screen py-10">
        <div className="rounded-lg">
          {isEdit ? (
            <label htmlFor="image">
              <div className="inline-block relative cursor-pointer">
                <img
                  className="w-36 rounded opacity-75"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt=""
                />
                <img
                  className="w-10 absolute bottom-12 right-12"
                  src={image ? "" : assets.upload_icon}
                  alt=""
                />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <div className="flex items-center space-x-4">
              <img
                src={userData.image}
                alt="Profile"
                className="w-36 h-26 rounded object-cover"
              />
            </div>
          )}
          <br />
          {isEdit ? (
            <input
              type="text"
              className={`text-2xl font-semibold mt-4 ${
                isEdit && "text-gray-400"
              }`}
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <h2 className="text-2xl font-semibold mt-4">{userData.name}</h2>
          )}
          <hr className="my-4" />
          <div className="text-gray-700 text-sm space-y-2">
            <h3 className="font-semibold text-gray-800">CONTACT INFORMATION</h3>
            <p>
              Email id:{" "}
              <a href="" className="text-blue-600">
                {userData.email}
              </a>
            </p>
            <p>
              Phone:{" "}
              {isEdit ? (
                <input
                  type="number"
                  className={`${isEdit && "text-gray-400"}`}
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <a href="tel:+11234567890" className="text-blue-600">
                  {userData.phone}
                </a>
              )}
            </p>
            <p className="flex">
              Address:{" "}
              {isEdit ? (
                <p>
                  <input
                    type="text"
                    className={`w-80 ${isEdit && "text-gray-400"}`}
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />{" "}
                  <br />
                  <input
                    type="text"
                    className={`w-80 ${isEdit && "text-gray-400"}`}
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />
                </p>
              ) : (
                <p>
                  {" "}
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}{" "}
                </p>
              )}
            </p>
          </div>
          <div className="text-gray-700 text-sm space-y-2 mt-4">
            <h3 className="font-semibold text-gray-800">BASIC INFORMATION</h3>
            <p className="flex">
              Gender:{" "}
              {isEdit ? (
                <select
                  className={`${isEdit && "text-gray-400"}`}
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      gender: e.target.value,
                    }))
                  }
                >
                  <option name="male" value={"Male"} id="male">
                    Male
                  </option>
                  <option name="female" value={"Female"} id="female">
                    Female
                  </option>
                </select>
              ) : (
                <p>{userData.gender}</p>
              )}
            </p>
            <p className="flex">
              Birthday:{" "}
              {isEdit ? (
                <input
                  type="date"
                  className={`${isEdit && "text-gray-400"}`}
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      dob: e.target.value,
                    }))
                  }
                />
              ) : (
                <p>{userData.dob}</p>
              )}
            </p>
          </div>
          <div className="flex space-x-4 mt-6">
            {isEdit ? (
              <button
                onClick={() => updateUserProfileData()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save information
              </button>
            ) : (
              <button
                className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-200"
                onClick={() => setIsEdit(true)}
              >
                Edit Info
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
