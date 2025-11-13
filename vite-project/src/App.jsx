import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Home/Navbar";
import "./App.css";
import Login from "./components/Home/Login";
import Quiz from "./components/Home/quiz";
import { AuthProvider } from "./components/Home/context/user"; 

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/quiz" element={<Quiz/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;