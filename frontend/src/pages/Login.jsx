import React, { useState } from "react";
import logo from "../assets/NextLogo(Dark).png";
import { IoEyeOutline, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      setLoading(false);
      navigate("/");
      toast.success("Login successfully");
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-4xl bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden"
      >

        {/* LEFT SECTION */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col gap-5 justify-center">

          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm">
              Login to continue learning
            </p>
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-orange-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1 relative">

            <label className="text-sm text-gray-300">Password</label>

            <input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-orange-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {show ? (
              <IoEyeOff
                onClick={() => setShow(false)}
                className="absolute right-3 bottom-2.5 text-gray-400 cursor-pointer"
              />
            ) : (
              <IoEyeOutline
                onClick={() => setShow(true)}
                className="absolute right-3 bottom-2.5 text-gray-400 cursor-pointer"
              />
            )}

          </div>

          {/* LOGIN BUTTON */}
          <button
            className="bg-orange-500 hover:bg-orange-400 text-black font-semibold py-2 rounded-lg flex items-center justify-center mt-2"
            disabled={loading}
            type="submit"
          >
            {loading ? <ClipLoader size={20} color="black" /> : "Login"}
          </button>

          {/* FORGET PASSWORD */}
          <span
            className="text-sm text-gray-400 cursor-pointer hover:text-orange-500"
            onClick={() => navigate("/forget")}
          >
            Forgot password?
          </span>

          {/* SIGNUP */}
          <p className="text-gray-400 text-sm text-center md:text-left">
            Don't have an account?{" "}
            <span
              className="text-orange-500 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </p>

        </div>

        {/* RIGHT SECTION */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-black relative p-10">

          <div className="absolute w-60 h-60 bg-orange-500/20 blur-3xl rounded-full"></div>

          <img
            src={logo}
            alt="NextGen Coders"
            className="w-52 relative z-10"
          />

        </div>

      </form>

    </div>
  );
};

export default Login;
