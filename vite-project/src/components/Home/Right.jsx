import React from 'react'
import { useNavigate } from 'react-router-dom'

const Right = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/quiz')
  }
  return (
    <div className="flex justify-center items-center h-screen from-blue-500 to-blue-800">
      <button
        onClick={handleClick}
        className="px-10 py-4 text-lg font-semibold text-white bg-red-600 rounded-full shadow-lg hover:shadow-blue-400/80 transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-700 glow"
      >
        Get Started
      </button>
    </div>
  )
}

export default Right
