import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Signup from "./auth/signup";
import Login from "./auth/login";
import Dashboard from "./pages/dashboard/Dashboard";
import KGActivities from "./pages/KG/KgActivities";
import ColorRecognition from "./pages/KG/ColorRecognition";
import NumberRecognition from "./pages/KG/NumberRecognition";
import AlphabetRecognition from "./pages/KG/AlphabetRecognition";
import AnimalSounds from "./pages/KG/AnimalSounds";

import Demo from './pages/dashboard/demo'

import ClassOneActivities from "./pages/ClassOne/ClassOneActivities";
import LearnWords from "./pages/ClassOne/LearnWords";
import SpellTheWord from "./pages/ClassOne/SpellTheWord";
import BasicMath from "./pages/ClassOne/BasicMath";
import PrepositionPlay from "./pages/ClassOne/PrepositionPlay";
import StatesOfIndia from "./pages/ClassOne/StatesOfIndia";

import ContactUs from "./pages/dashboard/ContactUs/ContactUs";
import Progress from "./pages/dashboard/Progress";

import PrivateRoute from "./authenticate/PrivateRoute";

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
      path: "/demo",
      element: (
        <PrivateRoute>
          <Demo/>
        </PrivateRoute>
      ),
    },
    {
      path: "/KGActivities",
      element: (
        <PrivateRoute>
          <KGActivities />
        </PrivateRoute>
      ),
    },
    {
      path: "/ColorRecognition",
      element: (
        <PrivateRoute>
          <ColorRecognition />
        </PrivateRoute>
      ),
    },
    {
      path: "/NumberRecognition",
      element: (
        <PrivateRoute>
          <NumberRecognition />
        </PrivateRoute>
      ),
    },
    {
      path: "/AlphabetRecognition",
      element: (
        <PrivateRoute>
          <AlphabetRecognition />
        </PrivateRoute>
      ),
    },
    {
      path: "/AnimalSounds",
      element: (
        <PrivateRoute>
          <AnimalSounds />
        </PrivateRoute>
      ),
    },
    {
      path: "/LearnWords",
      element: (
        <PrivateRoute>
          <LearnWords />
        </PrivateRoute>
      ),
    },
    {
      path: "/ClassOneActivities",
      element: (
        <PrivateRoute>
          <ClassOneActivities />
        </PrivateRoute>
      ),
    },
    {
      path: "/SpellTheWord",
      element: (
        <PrivateRoute>
          <SpellTheWord />
        </PrivateRoute>
      ),
    },
    {
      path: "/BasicMath",
      element: (
        <PrivateRoute>
          <BasicMath />
        </PrivateRoute>
      ),
    },
    {
      path: "/PrepositionPlay",
      element: (
        <PrivateRoute>
          <PrepositionPlay />
        </PrivateRoute>
      ),
    },
    {
      path: "/StatesOfIndia",
      element: (
        <PrivateRoute>
          <StatesOfIndia />
        </PrivateRoute>
      ),
    },
    {
      path: "/ContactUs",
      element: (
        <PrivateRoute>
          <ContactUs />
        </PrivateRoute>
      ),
    },
    {
      path: "/progress",
      element: (
        <PrivateRoute>
          <Progress />
        </PrivateRoute>
      ),
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
