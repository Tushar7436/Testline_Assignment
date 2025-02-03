# Awesome Quiz App

## Project Overview
The **Awesome Quiz App** is an interactive and dynamic quiz platform built with **React and FastAPI**. It allows users to answer multiple-choice questions, track progress, and receive immediate feedback on their performance.

## Features
- Fetches quiz questions dynamically from a FastAPI backend.
- Tracks and stores selected answers for each question.
- Displays real-time progress with animated UI components.
- Provides a **Scoreboard** with correct/incorrect answers and explanations after submission.
- Fully responsive UI with smooth transitions using **Framer Motion**.

## Technologies Used
- **Frontend**: React.js, Tailwind CSS, Framer Motion, Axios
- **Backend**: FastAPI, Uvicorn, Pydantic
- **State Management**: React Hooks (`useState`, `useEffect`)
- **HTTP Requests**: Axios

## Setup Instructions
### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/awesome-quiz-app.git
cd Quiz-App
```

### 2. Install Frontend Dependencies
Ensure you have **Node.js** installed, then run:
```sh
npm install
```

### 3. Install Backend Dependencies
Navigate to the backend folder and create a virtual environment:
```sh
cd Quiz-App-backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```

### 4. Configure the Backend API
Modify the **API URL** inside `Questions.jsx` to match your backend server:
```javascript
const API_URL = "http://127.0.0.1:8000/fetch-data_questions";
```
Make sure your FastAPI backend is running before starting the frontend.

### 5. Start the Backend (FastAPI)
Navigate to the `backend` directory and run:
```sh
uvicorn main:app --reload
```
Ensure your backend is running on `http://127.0.0.1:8000/`.

### 6. Start the Frontend (React)
Go back to the `frontend` directory and start the React development server:
```sh
yarn dev  # or npm run dev
```
This will start the frontend at `http://localhost:5173/`.

## Folder Structure
```
awesome-quiz-app-backend/
│── backend/
│   ├── main.py
│   ├── requirements.txt

│── Quiz-App/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MovingBackground.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── signup.jsx
│   │   ├── App.jsx
│   │   ├── QuestionBank.jsx
|   |   ├── PagenotFound.jsx
│   │   ├── Scoreboard.jsx
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│── README.md
```

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| **GET** | `/fetch-data_questions` | Fetches quiz questions |
| **POST** | `/validate-answer` | Validates submitted answers |



## License
This project is licensed under the **MIT License**.

---
Happy Coding! 🚀

