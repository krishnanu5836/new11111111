import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { javascriptQuizData } from './javascriptQuizData'; 

const quizData = javascriptQuizData;

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  const handleOptionClick = (idx, selected, correct) => {
    if (answered[idx]) return;
    setAnswered(prev => ({ ...prev, [idx]: selected }));

    if (selected === correct) {
      setScore(prev => prev + 1);
      toast.success("✅ Correct!", { theme: "dark" });
    } else {
      toast.error("❌ Wrong!", { theme: "dark" });
    }
  };

  const submitResult = async () => {
    if (Object.keys(answered).length !== quizData.length) {
        toast.warn("Please answer all questions before submitting!", { theme: "dark" });
        return;
    }

    if (!userId) {
      toast.error("User not logged in!");
      return;
    }

    try {
      const finalScore = score;
      const totalQuestions = quizData.length;

      const res = await axios.post("http://localhost:8000/api/exam/submit", {
        userId,
        score: finalScore,
        total: totalQuestions
      });

      toast.success(res.data.msg || "Result submitted! Showing score now.", { autoClose: 1000 });
      
      setSubmitted(true);
      setTimeout(() => {
        setShowResult(true);
      }, 500); 

    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to submit result");
    }
  };
  
  const percentage = quizData.length > 0 ? (score / quizData.length) * 100 : 0;
  let feedback = "Keep practicing!";
  if (percentage >= 80) {
    feedback = "Excellent performance!";
  } else if (percentage >= 50) {
    feedback = "Good job!";
  }
  
  const allAnswered = Object.keys(answered).length === quizData.length;


  return (
    <div className="p-6 max-w-2xl mx-auto mt-10 bg-amber-50 rounded shadow-lg">
      <ToastContainer position="top-right" autoClose={1500} theme="dark"/>
      
      {showResult ? (
        <div className="text-center p-8 bg-black rounded shadow-sm text-white">
          <h1 className="text-3xl font-bold mb-4 text-orange-400">Quiz Results</h1>
          <p className="text-xl mb-2">Total Questions: <span className="font-semibold">{quizData.length}</span></p>
          <p className="text-5xl font-extrabold mb-6">
            {score} / {quizData.length}
          </p>
          <div className="mb-8 p-4 bg-gray-800 rounded">
            <p className="text-3xl font-bold mb-1">{percentage.toFixed(0)}%</p>
            <p className="text-lg text-gray-300">{feedback}</p>
          </div>
          <button 
            onClick={() => navigate('/')} 
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition-colors"
          >
            Go to Home
          </button>
        </div>
      ) : (
        <>
          {quizData.map((q, idx) => (
            <div key={idx} className="mb-6 p-4 bg-black rounded shadow-sm text-white">
              <h3 className="font-semibold mb-3">{idx+1}. {q.question}</h3>
              <div className="flex flex-col gap-2">
                {q.options.map((opt,i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(idx,opt,q.answer)}
                    disabled={!!answered[idx]}
                    className={`py-2 rounded 
                        ${answered[idx] === q.answer ? 'bg-green-600' : ''}
                        ${answered[idx] && answered[idx] !== q.answer && answered[idx] === opt ? 'bg-red-600' : ''}
                        ${!answered[idx] ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-700 cursor-not-allowed'} 
                        text-white
                    `}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          <p className="text-center font-bold mt-6 text-lg">Score so far: {score}/{quizData.length}</p>
          
          <div className="text-center mt-6">
            <button
              onClick={submitResult}
              disabled={submitted || !allAnswered}
              className={`px-6 py-2 rounded font-semibold transition-colors
                ${(submitted || !allAnswered) ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}
              `}
            >
              {submitted ? "Result Submitted" : allAnswered ? "Submit Quiz" : "Answer All Questions"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;