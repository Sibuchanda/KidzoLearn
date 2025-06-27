import React from 'react';

export default function ContactUs() {
  return (
    <div
      className="min-h-screen py-16 px-4 bg-cover bg-center "
      style={{ backgroundImage: 'url(/images/bg2.png)' }}
    >
    {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 text-white bg-blue-700 hover:bg-blue-500 p-6 rounded-md shadow-md z-10 cursor-pointer"
        aria-label="Go back"
      >
      <span className="text-2xl">←</span>
      </button>
      
      <h1 className="text-4xl font-bold text-center text-blue-500 drop-shadow-lg">Contact Us</h1>
      <div className="w-24 h-2 bg-blue-500 mx-auto my-6 rounded"></div>

      <form className="max-w-xl mx-auto bg-black/20 backdrop-blur-md rounded-2xl p-8 space-y-6 shadow-lg flex flex-col justify-center">
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-4 rounded-lg outline-none bg-gray-900/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-4 rounded-lg outline-none bg-gray-900/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter your phone"
          className="w-full p-4 rounded-lg outline-none bg-gray-900/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Write your message"
         className="w-full p-4 rounded-lg outline-none bg-gray-900/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-md transition cursor-pointer"
        >
          Send
        </button>
      </form>
    </div>
  );
}
