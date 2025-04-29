import { FaTachometerAlt, FaLink, FaComments, FaBell } from 'react-icons/fa';
import ColorRecognition from '../KG/ColorRecognition';
import { Link, useNavigate } from 'react-router-dom';


const classIcons = {
  KG: '🧸',
  'Class 1': '✏️',
  'Class 2': '🎨',
  'Class 3': '📚',
  'Class 4': '🌍',
};

export default function DashboardPage() {
  const navigate = useNavigate();

 function handleUserClick(className){
     if(className==='KG'){
     navigate('/KGActivities');
     }
 }

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-pink-400 to-pink-500 text-white fixed h-full shadow-xl">
        <header className="text-center text-2xl font-bold py-6 bg-pink-600 shadow">
          <a href="#" className="text-white no-underline">KiddoLearn</a>
        </header>
        <ul className="flex flex-col">
          <SidebarItem icon={<FaTachometerAlt />} text="Dashboard" />
          <SidebarItem icon={<FaLink />} text="Progress" />
          <SidebarItem icon={<FaComments />} text="Contact us" />
        </ul>
      </aside>

      {/* Main content */}
      <main className="ml-64 w-full bg-yellow-50 min-h-screen">
        {/* Navbar */}
        <nav className="bg-white shadow px-6 py-4 flex justify-end items-center">
          <div className="flex items-center gap-4">
            <a href="#" className="text-pink-500 text-xl">
              <FaBell />
            </a>
            <span className="font-semibold text-gray-700">Test User</span>
          </div>
        </nav>

        {/* Content */}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-4">Welcome, Bheem</h1>
          <p className="text-gray-700 text-lg mb-6">
           Choose your class and leran with fun.
          </p>

          {/* Class Cards */}
          <div>
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">📚 Select Your Class</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["KG", "Class 1", "Class 2", "Class 3", "Class 4"].map((className) => (
                <div
                  key={className}
                  className="bg-white hover:scale-105 hover:bg-pink-100 transition-all p-8 rounded-2xl shadow-lg border border-pink-200 text-center cursor-pointer group"
                  onClick={()=>handleUserClick(className)}
                >
                  <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {classIcons[className]}
                  </div>
                  <h3 className="text-xl font-bold text-pink-600 group-hover:text-pink-700">
                    {className}
                  </h3>
                </div>
              ))}
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, text }) {
  return (
    <li className="hover:bg-pink-600 transition px-6 py-4 text-sm border-b border-pink-400">
      <a href="#" className="flex items-center gap-3 text-white">
        <span className="text-lg">{icon}</span>
        <span>{text}</span>
      </a>
    </li>
  );
}