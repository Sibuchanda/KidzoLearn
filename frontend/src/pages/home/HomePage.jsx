import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGamepad, FaBookOpen, FaHeadphones, FaSmile } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";


// ========== Home page section ============
export default function HomePage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center p-6 flex flex-col items-center"
      style={{ backgroundImage: "url('/images/bg2.png')" }}
    >
     {/* Heading  */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-24 mb-10 px-4"
      >
        <h1 className="text-5xl font-bold text-pink-600 mb-6 font-[Comic Sans MS,cursive]">
          Welcome to <span className="text-blue-500">KiddoSchool</span>
        </h1>
        <p className="text-lg text-gray-700 font-medium max-w-2xl mx-auto">
          A magical world of fun learning for little explorers!
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-16"
      >
        <Link to="/dashboard">
          <button className="bg-blue-700 text-white px-6 py-3 rounded-sm shadow-lg hover:bg-blue-500 transition font-bold text-lg hover:cursor-pointer">
            Get Started
          </button>
        </Link>
      </motion.div>

       {/* === Features Section ==== */}
      <section className="max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-8 text-center mb-20">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <FaGamepad size={40} className="text-purple-500 mx-auto mb-2" />
          <h3 className="font-bold text-pink-600">Fun Games</h3>
          <p className="text-sm text-gray-600">
            Play & learn with fun activities
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <FaBookOpen size={40} className="text-blue-500 mx-auto mb-2" />
          <h3 className="font-bold text-blue-600">Seperate class</h3>
          <p className="text-sm text-gray-600">
            we have interactive lessions for class KG and class One
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <FaHeadphones size={40} className="text-green-500 mx-auto mb-2" />
          <h3 className="font-bold text-green-600">Audio Features</h3>
          <p className="text-sm text-gray-600">
            Learn through audio for non-readers
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <FaSmile size={40} className="text-yellow-500 mx-auto mb-2" />
          <h3 className="font-bold text-yellow-600">All topic</h3>
          <p className="text-sm text-gray-600">Here you can learn English, Math, geography, Science etc</p>
        </motion.div>
      </section>

      {/* === Footer Section ==== */}
      <footer className="w-full bg-white/20 text-gray-800 py-6 mt-10 backdrop-blur-md shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl font-bold">KiddoSchool</h2>
            <p className="text-sm mt-1">
              © {new Date().getFullYear()} KiddoSchool. All rights reserved.
            </p>
          </div>

          <div className="flex gap-6 text-2xl mb-4 md:mb-0">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-blue-600"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-pink-600"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              className="hover:text-red-600"
            >
              <FaYoutube />
            </a>
          </div>
          <div className="text-sm text-center md:text-right">
            <a href="#" className="hover:underline block">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Services
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
