import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import "./App.css"

function App() {
  const navigate = useNavigate()

  const handleStartQuiz = () => {
    navigate("/questions")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden relative">
      {/* Background shapes */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.h1
        className="text-6xl font-bold text-white mb-8 text-center z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Quiz Master
      </motion.h1>
      <motion.p
        className="text-xl text-white mb-12 text-center max-w-md z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Embark on a journey of knowledge and challenge yourself with our exciting quizzes!
      </motion.p>
      <motion.button
        className="bg-white text-purple-600 font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:bg-purple-100 transition duration-300 z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStartQuiz}
      >
        Start Your Adventure
      </motion.button>

      {/* Decorative elements */}
      <motion.svg
        className="absolute top-10 left-10 w-16 h-16 text-white opacity-50"
        viewBox="0 0 24 24"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <path
          fill="currentColor"
          d="M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.41,12.24 4.07,12.67 4,13.66L2.07,13.95L2.28,14.93L4.04,14.67L4.18,15.38L2.61,16.32L3.08,17.21L4.53,16.32C5.68,18.76 8.59,20 12,20C15.41,20 18.32,18.76 19.47,16.32L20.92,17.21L21.39,16.32L19.82,15.38L19.96,14.67L21.72,14.93L21.93,13.95L20,13.66C19.93,12.67 19.59,12.24 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8M9,11A1,1 0 0,1 10,12A1,1 0 0,1 9,13A1,1 0 0,1 8,12A1,1 0 0,1 9,11M15,11A1,1 0 0,1 16,12A1,1 0 0,1 15,13A1,1 0 0,1 14,12A1,1 0 0,1 15,11M12,14L11.25,16.25L12,17L12.75,16.25L12,14Z"
        />
      </motion.svg>
      <motion.svg
        className="absolute bottom-10 right-10 w-16 h-16 text-white opacity-50"
        viewBox="0 0 24 24"
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <path
          fill="currentColor"
          d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z"
        />
      </motion.svg>

      {/* Footer */}
      <div className="absolute bottom-4 text-white text-sm opacity-70">© 2023 Quiz Master. All rights reserved.</div>
    </div>
  )
}

export default App

