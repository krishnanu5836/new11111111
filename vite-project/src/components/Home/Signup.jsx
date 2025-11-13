import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const SignupModal = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const res=await axios.post('http://localhost:8000/api/auth/signup',form);
      console.log(res.data);
      toast.success('Account created');
    } catch (error) {
      toast.error("Signup failed!");
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  return (
    <dialog id="my_modal_register" className="modal modal-bottom sm:modal-middle">
      <ToastContainer/>
      <div className="modal-box bg-amber-50 border-r-0 relative">

        <button
          className="absolute top-3 right-3 cursor-pointer"
          onClick={() => document.getElementById("my_modal_register").close()}
        >
          ✖
        </button>

        <h3 className="font-bold text-lg text-black font-serif">
          Enrol now to learn LIVE
        </h3>

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">What is your name?</legend>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input bg-amber-50 text-black w-full"
              placeholder="Type here"
              required
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">Email</legend>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="input bg-amber-50 text-black w-full"
              placeholder="Type here"
              required
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">Password</legend>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="input bg-amber-50 text-black w-full"
              placeholder="Type here"
              required
            />
          </fieldset>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 text-white rounded-4xl py-2 px-10 cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>


       

       
      </div>
    </dialog>
  );
};

export default SignupModal;
