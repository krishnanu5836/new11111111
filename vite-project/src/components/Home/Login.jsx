import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, loginUser } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        navigate("/quiz");
      }, 1500);

      return () => clearTimeout(timer);
    } else if (!user && window.location.pathname !== '/') {
       navigate('/');
    }
  }, [user, navigate]); 

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        form
      );
      const { user, token } = res.data;

      localStorage.setItem("token", token);
      loginUser(user);

      toast.success(`Welcome back, ${user.name}!`, { theme: "dark" });

      setForm({ email: "", password: "" });
      
      setTimeout(() => {
        navigate("/quiz"); 
      }, 1500);
      
    } catch (error) {
      toast.error(error.response?.data?.msg || "Login failed!", {
        theme: "dark",
      });
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{ backgroundColor: "rgb(18, 25, 45)" }}
    >
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      
      <div 
        className="shadow-2xl rounded-xl p-8 w-full max-w-md"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)", 
          backdropFilter: "blur(15px)", 
          WebkitBackdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.4)", 
        }}
      >
      <h3 className="font-bold text-3xl text-center text-white font-sans mb-8">
  Portal Login
</h3>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Type your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800/70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Type your password"
              required
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="w-3/4 bg-orange-500 text-white text-lg font-semibold rounded-full py-3 px-10 hover:bg-orange-600 transition-all duration-200"
            >
              Secure Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;