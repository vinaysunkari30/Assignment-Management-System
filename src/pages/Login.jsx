import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { PiHandWaving } from "react-icons/pi";
import { IoIosArrowRoundForward } from "react-icons/io";

import FormField from "../components/FormField";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onLogin = (formData) => {
    const admins = JSON.parse(localStorage.getItem("admins"));
    const students = JSON.parse(localStorage.getItem("students"));

    const users = [...admins, ...students];

    const user = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password,
    );

    if (!user) {
      toast.error("Invalid Email or Password...!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    navigate(user.role === "admin" ? "/admin/dashboard" : "/student/dashboard");
  };

  return (
    <div className="px-5 flex flex-col items-center justify-center gap-3 h-screen bg-slate-950">
      <div className="flex flex-col justify-center items-center gap-1">
        <img
          className="h-16 rounded-3xl hover:bg-blue-300"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVzekCREOaXfCYooO5z07ReEP6OBtX8JuuLShu0nVO9A&s=10"
        />
        <h1 className="bg-gradient-to-br from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent font-syne font-bold text-[26px] tracking-wide">
          Assignment Tracker
        </h1>
      </div>
      <div className="rounded-3xl w-full max-w-sm bg-slate-900 p-7 flex flex-col justify-center items-center">
        <h1 className="text-center font-roboto font-bold text-white text-3xl mb-2 flex gap-2">
          Welcome Back...! <PiHandWaving className="shake-hand text-yellow-300" />
        </h1>
        <p className="text-white/80 font-roboto text-[15px] text-center mb-5">
          Sign in to your Assignment Tracker
          <br />
          to continue again....
        </p>
        <form
          onSubmit={handleSubmit(onLogin)}
          className="w-full text-white placeholder-slate-400"
        >
          <FormField
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register("email", {
              required: "Email is required",
            })}
            error={errors.email}
          />
          <FormField
            label="Password"
            type="password"
            placeholder="Enter your Password"
            register={register("password", {
              required: "Password is required",
            })}
            error={errors.password}
          />
          <div className="flex justify-center mb-1">
            <button className="flex justify-center items-center gap-1 p-2.5 bg-gradient-to-br from-[#2563eb] to-[#7c3aed] transition-all duration-300 ease-in-out cursor-pointer w-full rounded-xl text-white font-inter font-semibold text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1">
              Sign In to Dashboard <IoIosArrowRoundForward size={30} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
