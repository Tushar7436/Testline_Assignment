import { useEffect, useState } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import LoadingScreen from "../src/components/LoadingScreen.jsx"
import MovingBackground from "../src/components/MovingBackground.jsx"
import Scoreboard from "./Scoreboard.jsx"

const themes = [
  { primary: "green", secondary: "emerald", bg: "from-green-100 to-emerald-200" },
  { primary: "blue", secondary: "sky", bg: "from-blue-100 to-sky-200" },
  { primary: "purple", secondary: "violet", bg: "from-purple-100 to-violet-200" },
  { primary: "red", secondary: "rose", bg: "from-red-100 to-rose-200" },
]

const Questions = () => {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [showLoadingScreen, setShowLoadingScreen] = useState(false)
  const [themeIndex, setThemeIndex] = useState(0)
  const [showScoreboard, setShowScoreboard] = useState(false)
  const [quizResults, setQuizResults] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:8000/fetch-data_questions")
      .then((response) => {
        if (response.data.questions) {
          const filteredQuestions = response.data.questions.map((q) => ({
            id: q.question.id, 
            description: q.question.description, 
            options: q.options.map(({ description, id, photo_url }) => ({
              description,
              id,
              photo_url,
            })), 
          }));
          console.log("Mapped Questions:", filteredQuestions); 
          setQuestions(filteredQuestions);
        } else {
          console.error("No questions found in response");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setError("Failed to load questions. Please try again later.");
        setIsLoading(false);
      });
  }, []);
  

  useEffect(() => {
    if (currentQuestionIndex % 3 === 0) {
      setThemeIndex((prevIndex) => (prevIndex + 1) % themes.length)
    }
  }, [currentQuestionIndex])

  function handleOptionSelect(optionId) {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionId,
    }))
  }

  function handleNextQuestion() {
    if (selectedOptions[currentQuestionIndex] && currentQuestionIndex < questions.length - 1) {
      if ((currentQuestionIndex + 1) % 5 === 0) {
        setShowLoadingScreen(true)
        setTimeout(() => {
          setShowLoadingScreen(false)
          setCurrentQuestionIndex(currentQuestionIndex + 1)
        }, 3000)
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }
    }
  }

  function handlePreviousQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  async function handleSubmit() {
    setIsLoading(true);
    try {

      const submissionData = {
        answers: questions.map((question, index) => ({
          question_id: question.id, 
          selected_option_id: selectedOptions[index] || null, 
        })),
      };
  
      console.log("Submitting Data:", submissionData); // Debugging
  
      // Send POST request to the backend
      const response = await axios.post("http://127.0.0.1:8000/validate-answer", submissionData, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Response from Backend:", response.data); // Debugging response
      setQuizResults(response.data);
      setShowScoreboard(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setError("Failed to submit quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  

  if (isLoading) {
    return <LoadingScreen />
  }

  if (error) {
    return <div className="text-center text-2xl mt-10 text-red-600">{error}</div>
  }

  if (questions.length === 0) {
    return <div className="text-center text-2xl mt-10 text-gray-800">No questions available.</div>
  }

  if (showScoreboard) {
    return <Scoreboard quizResults={quizResults} theme={themes[themeIndex]} />
  }

  const currentQuestion = questions[currentQuestionIndex]
  const currentTheme = themes[themeIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  return (
    <>
      <MovingBackground theme={currentTheme} />
      <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-br ${currentTheme.bg}`}>
        <AnimatePresence>{showLoadingScreen && <LoadingScreen />}</AnimatePresence>
        <div className="max-w-3xl mx-auto">
          <motion.h1
            className={`text-4xl font-extrabold text-center mb-8 text-${currentTheme.primary}-800`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Awesome Quiz
          </motion.h1>

          {/* Progress bar */}
          <div className="w-full bg-white bg-opacity-50 backdrop-blur-sm rounded-full h-2.5 mb-6 overflow-hidden">
            <motion.div
              className={`bg-${currentTheme.primary}-500 h-2.5`}
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg p-8 mb-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{currentQuestion.description || "No question available"}</h2>
            <ul className="space-y-4">
              {currentQuestion.options.map((option) => (
                <motion.li key={option.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button
                    onClick={() => handleOptionSelect(option.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      selectedOptions[currentQuestionIndex] === option.id
                        ? `bg-${currentTheme.primary}-500 bg-opacity-70 text-white`
                        : `bg-white bg-opacity-50 hover:bg-opacity-60 text-gray-800 hover:bg-${currentTheme.secondary}-100`
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="flex-grow">{option.description || "No option text available"}</span>
                      {option.photo_url && (
                        <img
                          src={option.photo_url || "/placeholder.svg"}
                          alt="Option"
                          className="w-16 h-16 object-cover rounded-md ml-4"
                        />
                      )}
                    </div>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="flex justify-between mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-6 py-2 bg-white bg-opacity-80 backdrop-blur-md text-${currentTheme.primary}-800 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Previous
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isLastQuestion ? handleSubmit : handleNextQuestion}
              disabled={!selectedOptions[currentQuestionIndex]}
              className={`px-6 py-2 bg-${currentTheme.primary}-500 bg-opacity-80 backdrop-blur-md text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLastQuestion ? "Submit" : "Next"}
            </motion.button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Questions
