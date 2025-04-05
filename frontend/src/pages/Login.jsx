import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";

const Login = () => {
  const { token, setToken, backendUrl } = useContext(AppContext);
  const [state, setState] = useState("Sign Up"); // for setting login state

  const navigate = useNavigate();

  //   state variables to handle user login details
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  //   for handling form data
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setEmail("");
          setPassword("");
          setName("");
          setState("Signin");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center py-36">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-gray-800">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-gray-600 mb-4">
          Please {state === "Sign Up" ? "sign up" : "login"} to book appointment
        </p>
        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Full Name"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {state === "Sign Up" ? "Create Account" : "Login"}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p
            className="text-gray-600 text-sm mt-4"
            onClick={() => setState("Login")}
          >
            Already have an account?{" "}
            <a href="#" className="text-blue-600">
              Login here
            </a>
          </p>
        ) : (
          <p
            className="text-gray-600 text-sm mt-4"
            onClick={() => setState("Sign Up")}
          >
            Create a new account?{" "}
            <a href="#" className="text-blue-600">
              Sign Up here
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
