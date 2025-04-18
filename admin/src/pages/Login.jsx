import { useContext, useState } from "react";
import { AdminContext } from "../context/adminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        }); // sending a post request on our backend url with email and password to get the token from backend route

        if (data.success) {
          localStorage.setItem("aToken", data.token); //if user reloads the webpage then token will be taken from local storage
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token); //if user reloads the webpage then token will be taken from local storage
          setDToken(data.token);
          console.log(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {}
  };

  return (
    <>
      <form
        className="min-h-[80vh] flex items-center"
        onSubmit={onSubmitHandler}
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-xl font-semibold m-auto">
            <span className="text-primary">{state}</span> Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-primary w-full py-2 rounded-md text-base"
          >
            Login
          </button>
          {state === "Admin" ? (
            <p>
              Doctor Login?{" "}
              <span
                className="cursor-pointer text-primary underline"
                onClick={() => setState("Doctor")}
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{" "}
              <span
                className="cursor-pointer text-primary underline"
                onClick={() => setState("Admin")}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </>
  );
}
