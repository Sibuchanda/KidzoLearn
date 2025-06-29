import { useEffect, useState } from "react";
import axios from "axios";
import { Award, CheckCircle, TrendingUp, Target, Star } from "lucide-react";

export default function Progress() {
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data } = await axios.get(
          "https://kidzoschool.onrender.com/task/progress",
          { withCredentials: true }
        );
        setUserProgress(data);
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, [email]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url(/images/bg2.png)" }}
      >
        <div className="text-center p-4">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Loading your progress...
          </p>
        </div>
      </div>
    );
  }

  if (!userProgress) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url(/images/bg2.png)" }}
      >
        <div className="text-center bg-white p-6 sm:p-8 rounded-2xl shadow-lg mx-2">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">
            Could not load progress
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Please try refreshing the page or check your connection.
          </p>
        </div>
      </div>
    );
  }

  const { username, points, activityProgress } = userProgress;
  const totalTasks = Object.values(activityProgress).reduce(
    (sum, tasks) => sum + tasks.length,
    0
  );
  const sectionCount = Object.keys(activityProgress).length;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 bg-cover bg-center"
      style={{ backgroundImage: "url(/images/bg2.png)" }}
    >
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8">
          <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Back Button */}
            <button
              onClick={() => window.history.back()}
              className="text-white bg-blue-700 hover:bg-blue-500 px-4 py-3 text-xl rounded-lg shadow-md z-10 cursor-pointer"
              aria-label="Go back"
              style={{ minWidth: "65px", minHeight: "65px" }}
            >
              ←
            </button>

            {/* Welcome Text */}
            <div className="ml-0 sm:ml-4 mt-2 sm:mt-0 w-full">
              <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-1 break-words">
                Welcome back, <span className="text-blue-600">{username}</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg">
                Here's a summary of your learning journey and earned points
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Points Section */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-4 sm:p-6 text-center text-white shadow-lg mb-8">
          <div className="relative z-10">
            <div className="flex flex-col items-center justify-center mb-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
              <div className="bg-white/20 p-2 sm:p-3 rounded-full">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h2 className="text-base sm:text-xl font-bold text-white/90">
                Your Total Achievement
              </h2>
            </div>

            <div className="mb-4">
              <p className="text-4xl sm:text-5xl md:text-6xl font-black mb-2">
                {points}
              </p>
              <p className="text-sm sm:text-lg font-semibold text-white/90">
                POINTS EARNED
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 min-w-[80px]">
                <p className="text-xl font-bold text-yellow-300">
                  {totalTasks}
                </p>
                <p className="text-xs text-white/80">Tasks</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 min-w-[80px]">
                <p className="text-xl font-bold text-green-300">
                  {sectionCount}
                </p>
                <p className="text-xs text-white/80">Sections</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <div className="flex justify-between mb-4">
              <div className="bg-white/20 p-2 sm:p-3 rounded-full">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="text-emerald-100 text-xs sm:text-sm font-medium text-right">
                Tasks Completed
              </p>
            </div>
            <p className="text-3xl sm:text-4xl font-bold mb-2">{totalTasks}</p>
            <p className="text-xs sm:text-sm text-emerald-100">
              Finished across all sections
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <div className="flex justify-between mb-4">
              <div className="bg-white/20 p-2 sm:p-3 rounded-full">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="text-purple-100 text-xs sm:text-sm font-medium text-right">
                Active Sections
              </p>
            </div>
            <p className="text-3xl sm:text-4xl font-bold mb-2">
              {sectionCount}
            </p>
            <p className="text-xs sm:text-sm text-purple-100">
              Learning topics with progress
            </p>
          </div>
        </div>

        {/* Section Summary */}
        <div className="flex flex-col sm:flex-row sm:justify-between mb-4 mt-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Section-wise Task Summary
          </h2>
          <div className="flex items-center space-x-1 text-xs sm:text-sm text-slate-600 mt-2 sm:mt-0">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Each task = +1 point</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto">
          <div className="p-4 sm:p-6 min-w-[300px]">
            {/* Table Header */}
            <div className="grid grid-cols-3 text-sm font-semibold text-slate-600 border-b border-slate-200 pb-2 mb-4">
              <div>Section</div>
              <div>Task</div>
              <div className="text-right">Points</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-2">
              {Object.entries(activityProgress).flatMap(([section, tasks]) =>
                tasks.map((task, index) => (
                  <div
                    key={`${section}-${index}`}
                    className="grid grid-cols-3 items-center text-sm bg-slate-50 hover:bg-slate-100 transition rounded-lg px-2 py-1 sm:px-4 sm:py-2"
                  >
                    <div className="text-slate-800 font-medium text-xs sm:text-sm">
                      {section}
                    </div>
                    <div className="text-slate-700 text-xs sm:text-sm">
                      {task}
                    </div>
                    <div className="text-right">
                      <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full text-xs">
                        +1
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
