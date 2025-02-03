import PropTypes from "prop-types";
import { motion } from "framer-motion";
import MovingBackground from "../src/components/MovingBackground.jsx";

function Scoreboard({ quizResults, theme }) {
  if (!quizResults || !quizResults.results) {
    console.error("Error: quizResults or quizResults.results is undefined");
    return <div className="text-center text-2xl mt-10 text-gray-800">No results available.</div>;
  }

  const correctAnswers = quizResults.results.filter((result) => result.correct).length;
  const totalQuestions = quizResults.results.length;

  return (
    <>
      <MovingBackground theme={theme} />
      <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-br ${theme.bg}`}>
        <div className="max-w-3xl mx-auto">
          <motion.h1
            className={`text-4xl font-extrabold text-center mb-8 text-${theme.primary}-800`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Quiz Results
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg p-8 mb-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Score</h2>
            <div className="text-4xl font-bold text-center mb-6">
              {correctAnswers} / {totalQuestions}
            </div>
            <div className="text-lg text-center mb-8">
              You answered {correctAnswers} out of {totalQuestions} questions correctly.
            </div>

            <h3 className="text-xl font-bold mb-4 text-gray-800">Question Summary</h3>
            <ul className="space-y-4">
              {quizResults.results.map((result, index) => (
                <li key={index} className="border-b border-gray-200 pb-4">
                  <p className="font-semibold mb-2">Question: {result.question_description || "Description not available"}</p>
                  <p className={`text-sm ${result.correct ? "text-green-600" : "text-red-600"}`}>
                    {result.correct ? "Correct" : "Incorrect"}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Your answer:</span> {result.selected_option_description || "N/A"}
                  </p>
                  {!result.correct && (
                    <p className="text-sm mt-1">
                      <span className="font-medium">Correct answer:</span> {result.correct_option_description || "N/A"}
                    </p>
                  )}
                  <p className="text-sm mt-2 text-gray-600">{result.detailed_solution || "No detailed solution available."}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className={`px-6 py-2 bg-${theme.primary}-500 bg-opacity-80 backdrop-blur-md text-white rounded-lg hover:bg-opacity-90 transition-colors`}
            >
              Restart Quiz
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}

Scoreboard.propTypes = {
  quizResults: PropTypes.shape({
    results: PropTypes.arrayOf(
      PropTypes.shape({
        question_description: PropTypes.string,
        selected_option_description: PropTypes.string,
        correct_option_description: PropTypes.string,
        correct: PropTypes.bool.isRequired,
        detailed_solution: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  theme: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    bg: PropTypes.string.isRequired,
  }).isRequired,
};

export default Scoreboard;
