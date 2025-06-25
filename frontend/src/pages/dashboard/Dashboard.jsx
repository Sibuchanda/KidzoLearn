import { FaTachometerAlt, FaLink, FaComments, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const classIcons = {
  KG: "🧸",
  "Class 1": "✏️",
};

export default function DashboardPage() {
  const navigate = useNavigate();

  function handleUserClick(className) {
    if (className === "KG") {
      navigate("/KGActivities");
    } else if (className === "Class 1") {
      navigate("/ClassOneActivities");
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center font-sans"
      style={{ backgroundImage: "url('/images/bg2.png')" }}
    >
      <div className="flex min-h-screen bg-white/30">
        {/* ==== Sidebar Section ==== */}
        <aside className="w-64 bg-white/10 backdrop-blur-xl text-pink-700 fixed h-full shadow-lg border-r border-white/60">
          <header className="text-center text-3xl font-extrabold py-6 text-blue-600">
            KidzoSchool
          </header>
          <ul className="flex flex-col">
            <SidebarItem icon={<FaTachometerAlt />} text="Dashboard" />
            <SidebarItem icon={<FaLink />} text="Progress" to="/progress"/>
            <SidebarItem icon={<FaComments />} text="Contact us" to="/ContactUs"/>
          </ul>
        </aside>

        {/* =======  Main Contents ======== */}
        <main className="ml-64 w-full px-8 py-6 text-pink-800">
          {/* Navbar */}
          <nav className="flex justify-end items-center mb-6">
            <div className="flex items-center gap-4 bg-blue-500 px-4 py-2 rounded-full backdrop-blur-md shadow text-white font-medium cursor-pointer">
              <span>B</span>
            </div>
          </nav>

          <div>
            <h1 className="text-4xl font-extrabold mb-2 text-pink-600 drop-shadow">
              Welcome, Bheem!
            </h1>
            <p className="text-lg mb-8 text-pink-700 font-medium">
              Choose your class and learn with fun!
            </p>
            <div className="flex flex-col gap-6 p-8">
              {["KG", "Class 1"].map((className) => (
                <div
                  key={className}
                  className="bg-green-100/20 hover:bg-blue-100 border-green-200 p-8 transition-all rounded-3xl shadow-xl border text-center cursor-pointer hover:scale-105 duration-300 backdrop-blur-md transform"
                  onClick={() => handleUserClick(className)}
                >
                  <div className="text-6xl mb-3 text-green-700">
                    {classIcons[className]}
                  </div>
                  <h3 className="text-2xl font-bold text-green-800">
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
      <Link to={to}>
      <div className="flex items-center gap-3 text-pink-800 font-semibold">
        <span className="text-xl">{icon}</span>
        <span>{text}</span>
      </div>
      </Link>
    </li>
  );
}
