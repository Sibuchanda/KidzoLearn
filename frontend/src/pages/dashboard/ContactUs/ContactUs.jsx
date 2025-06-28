import React from 'react';

export default function ContactUs() {
  return (
    <div
      className="min-h-screen py-16 px-2 sm:px-4 bg-cover bg-center relative"
      style={{ backgroundImage: 'url(/images/bg2.png)' }}
    >
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="absolute top-6 left-8 bg-blue-700 hover:bg-blue-500 text-white px-4 py-3 text-xl rounded-lg shadow-md z-10 cursor-pointer"
        aria-label="Go back"
        style={{ minWidth: "65px", minHeight: "65px" }}
      >
        ←
      </button>

      {/* Title */}
      <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-center text-blue-500 drop-shadow-lg mt-16">
        Contact Us
      </h1>
      <div className="w-20 sm:w-24 h-2 bg-blue-500 mx-auto my-4 sm:my-6 rounded"></div>

      {/* Form */}
      <form className="max-w-xl mx-auto bg-black/20 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 shadow-lg flex flex-col justify-center">
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-3 sm:p-4 rounded-lg outline-none bg-gray-900/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 sm:p-4 rounded-lg outline-none bg-gray-900/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
        <input
          type="text"
          placeholder="Enter your phone"
          className="w-full p-3 sm:p-4 rounded-lg outline-none bg-gray-900/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
        <textarea
          placeholder="Write your message"
          rows={4}
          className="w-full p-3 sm:p-4 rounded-lg outline-none bg-gray-900/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white font-semibold px-6 sm:px-8 py-3 rounded-md transition cursor-pointer text-sm sm:text-base"
        >
          Send
        </button>
      </form>
    </div>
  );
}
