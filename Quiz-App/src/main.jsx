import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import * as ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Questions from './QuestionBank.jsx';
import LoginPage  from './Login.jsx';
import Signup from './Signup.jsx'
import NotFound from "./PageNotFound.jsx"
import { Toaster } from 'sonner';

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <div>
      <App/>
    </div>,
  },
  {
    path: "/questions",
    element: 
    <div>
      <Questions />
    </div>,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: 
    <div>
      <LoginPage/>
    </div>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster/>
  </StrictMode>,
)
