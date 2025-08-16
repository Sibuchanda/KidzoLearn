import {
  FaTachometerAlt,
  FaLink,
  FaComments,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
const VITE_BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "../UserContext";

const classIcons = {
  KG: "🧸",
  "Class 1": "✏️",
};

export default function DashboardPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const { user } = useUser(); // Context API

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);


  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleUserClick(className) {
    if (className === "KG") {
      navigate("/KGActivities");
    } else if (className === "Class 1") {
      navigate("/ClassOneActivities");
    }
  }

  async function handleLogout() {
    const val = confirm("Do you want to logout?");
    if (val) {
      try {
        await axios.post(
          `${VITE_BACKEND_URI}/user/logout`,
          {},
          {
            withCredentials: true,
          }
        );
        navigate("/login");
        localStorage.removeItem("username");
        toast.success("Logged out successfully");
      } catch (err) {
        console.error("Logout failed", err);
        toast.error("Logout failed");
      }
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center font-sans"
      style={{ backgroundImage: "url('/images/bg2.png')" }}
    >
      <div className="flex min-h-screen bg-white/30">
        {/* Sidebar */}
        <aside
          className={`fixed z-40 top-0 left-0 h-full w-64 bg-white/10 backdrop-blur-xl text-pink-700 shadow-lg border-r border-white/60 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
        >
          <header className="text-center text-3xl font-extrabold py-6 text-blue-600">
            KidzoSchool
          </header>

          {/* Close icon on mobile */}
          <div className="md:hidden flex justify-end px-4 pt-2">
            <button
              onClick={toggleSidebar}
              className="text-xl text-pink-700 font-bold hover:text-red-600"
            >
              ✕
            </button>
          </div>

          <ul className="flex flex-col">
            <SidebarItem icon={<FaTachometerAlt />} text="Dashboard" />
            <SidebarItem icon={<FaLink />} text="Progress" to="/progress" />
            <SidebarItem
              icon={<FaComments />}
              text="Contact us"
              to="/ContactUs"
            />
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-64 w-full px-2 sm:px-6 py-6 text-pink-800">
          {/* Navbar */}
          <nav className="flex items-center mb-6">
            {/* Hamburger button */}
            <button
              className="md:hidden p-2 rounded bg-white/60 text-pink-700 backdrop-blur shadow mr-2"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? "✕" : "☰"}
            </button>

            {/* Profile on right */}
            <div className="ml-auto relative" ref={profileRef}>
              <div
                className="flex items-center gap-4 bg-blue-500 px-4 py-2 rounded-full backdrop-blur-md shadow text-white font-medium cursor-pointer"
                onClick={toggleProfile}
              >
                <span>{user?.username?.[0]?.toUpperCase() || "U"}</span>
              </div>

              {isProfileOpen && (
                <div className="absolute right-2 mt-2 min-w-[220px] max-w-[90vw] bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 text-sm break-words">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-lg font-semibold text-gray-800">
                      Hello, {user?.username || "User"}
                    </p>
                  </div>
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-gray-500 text-sm" />
                      <p className="text-sm text-gray-600">{user?.email || "john@gmail.com"}</p>
                    </div>
                  </div>
                  <div className="px-4 py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                    >
                      <FaSignOutAlt className="text-sm" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Welcome and class cards */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 text-pink-600 drop-shadow">
              Welcome, {user?.username}
            </h1>
            <p className="text-sm sm:text-base md:text-lg mb-8 text-pink-700 font-medium">
              Choose your class and learn with fun!
            </p>
            <div className="flex flex-col gap-6 p-2 sm:p-4">
              {["KG", "Class 1"].map((className) => (
                <div
                  key={className}
                  className="bg-green-100/20 hover:bg-blue-100 border-green-200 p-4 sm:p-6 transition-all rounded-3xl shadow-xl border text-center cursor-pointer hover:scale-105 duration-300 backdrop-blur-md transform"
                  onClick={() => handleUserClick(className)}
                >
                  <div className="text-5xl sm:text-6xl mb-2 text-green-700">
                    {classIcons[className]}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-green-800">
                    {className}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, text, to }) {
  return (
    <li className="hover:bg-blue-100 px-6 py-4 transition text-md border-b border-white cursor-pointer">
      <Link to={to || "#"}>
        <div className="flex items-center gap-3 text-pink-800 font-semibold">
          <span className="text-xl">{icon}</span>
          <span>{text}</span>
        </div>
      </Link>
    </li>
  );
}
