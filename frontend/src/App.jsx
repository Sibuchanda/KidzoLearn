import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Dashboard from "./pages/dashboard/Dashboard";
import KGActivities from "./pages/KG/KgActivities";
import ColorRecognition from "./pages/KG/ColorRecognition";
import NumberRecognition from './pages/KG/NumberRecognition';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
