import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/adminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  // state variables to handle data
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  //   fucntion to handle data onsubmit
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();
      formData.append("image", docImg); // use field name used while creating backend with value
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees)); // Number - will convert fees from string to number
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      ); // we can only send string so we wil convert this json data to string using stringify method

      //   logging formdata
      //   formData.forEach((value, key) => {
      //     console.log(`${key}: ${value}`);
      //   });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } } // while api call aToken will become atoken but it will work because we have provided atoken check in out authmiddleware file
      );
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white p-8 border rounded w-full max-w-4xl overscroll-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} //will generate temporary url to showcase image on web
              alt=""
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload Doctor <br /> Picture
          </p>
          <br />
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-1 flex-col gap-1">
              <p>Doctor name</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p>Doctor Email</p>
              <input
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p>Doctor password</p>
              <input
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p>Experience</p>
              <select
                className="border rounded px-3 py-2"
                name=""
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <p>Fees</p>
              <input
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Fees"
                required
                onChange={(e) => setFees(e.target.value)}
                value={fees}
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-1 flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p>Education</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p>Address</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 1"
                required
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
              />
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 2"
                required
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            className="w-full px-4 pt-2 border rounded"
            placeholder="Write about doctor"
            rows={5}
            required
            onChange={(e) => setAbout(e.target.value)}
            value={about}
          />
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
