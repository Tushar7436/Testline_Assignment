import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <motion.h1
        className="text-6xl font-bold text-white mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Quiz App
      </motion.h1>
      <motion.p
        className="text-xl text-white mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Test your knowledge with our exciting quizzes!
      </motion.p>
      <Link to="/quiz">
        <motion.button
          className="bg-white text-purple-600 font-bold py-3 px-6 rounded-full text-xl shadow-lg hover:bg-purple-100 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Quiz
        </motion.button>
      </Link>
    </div>
  )
}

export default LandingPage

