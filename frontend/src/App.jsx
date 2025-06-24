import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Signup from "./auth/signup";
import Login from "./auth/login";
import Dashboard from "./pages/dashboard/Dashboard";
import KGActivities from "./pages/KG/KgActivities";
import ColorRecognition from "./pages/KG/ColorRecognition";
import NumberRecognition from './pages/KG/NumberRecognition';
import AlphabetRecognition from './pages/KG/AlphabetRecognition'
import AnimalSounds from './pages/KG/AnimalSounds'

import ClassOneActivities from "./pages/ClassOne/ClassOneActivities";
import LearnWords from "./pages/ClassOne/LearnWords";
import SpellTheWord from "./pages/ClassOne/SpellTheWord";
import BasicMath from "./pages/ClassOne/BasicMath";
import PrepositionPlay from "./pages/ClassOne/PrepositionPlay";
import StatesOfIndia from "./pages/ClassOne/StatesOfIndia";

import ContactUs from "./pages/dashboard/ContactUs/ContactUs";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/KGActivities",
      element: <KGActivities />,
    },
    {
      path: "/ColorRecognition",
      element: <ColorRecognition />,
    },
    {
      path: "/NumberRecognition",
      element: <NumberRecognition />,
    },
    {
      path: "/AlphabetRecognition",
      element: <AlphabetRecognition />,
    },
    {
      path: "/AnimalSounds",
      element: <AnimalSounds />,
    },
    {
      path: "/LearnWords",
      element: <LearnWords />,
    },
    {
      path: "/ClassOneActivities",
      element: <ClassOneActivities />,
    },
    {
      path: "/SpellTheWord",
      element: <SpellTheWord />,
    },
    {
      path: "/BasicMath",
      element: <BasicMath />,
    },
    {
      path: "/PrepositionPlay",
      element: <PrepositionPlay />,
    },
    {
      path: "/StatesOfIndia",
      element: <StatesOfIndia />,
    },
    {
      path: "/ContactUs",
      element: <ContactUs />,
    },
  
  ]);

 return (
  <div className="h-full">
    <ToastContainer position="top-right" />
    <RouterProvider router={router} />
  </div>
);
}

export default App;
