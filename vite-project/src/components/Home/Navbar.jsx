import React, { useContext } from "react";
import SignupModal from "./Signup";
import { AuthContext } from "./context/user";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    setTimeout(() => {
      navigate("/"); 
    }, 1000);   
  };

  return (
  
    <div
      className="fixed top-0 w-full shadow-md z-20"
      style={{ backgroundColor: 'white' }} 
    >
    
      <div className="flex justify-between items-center h-16 px-6"> 
        
        <div className="flex items-center gap-4">
          <img
            src="https://img.freepik.com/premium-vector/exam-icon_1134231-4140.jpg"
            className="h-8 w-8 object-contain" 
            alt="Online Examination Portal Logo"
          />
          <span className="text-xl font-semibold text-black whitespace-nowrap">
            Online Examination Portal
          </span>
        </div>

        <div className="flex items-center">
          {user ? (
            <span className="text-sm flex items-center gap-3">
              <span className="text-gray-700 font-medium">
                 Hello, {user.name}
              </span>
              <button 
                onClick={handleLogout}  
                className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
              >
                Log out
              </button>
            </span>
          ) : (
            <button
              className="bg-orange-500 text-white text-sm px-4 py-2 rounded hover:bg-orange-600 transition-colors"
              onClick={() => document.getElementById("my_modal_register").showModal()}
            >
              Student Register
            </button>
          )}
        </div>
      </div>

      <SignupModal />
    </div>
  );
};

export default Navbar;