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
          `http://localhost:8000/task/progress?email=${email}`
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-lg text-slate-600 font-medium">Loading your progress...</p>
        </div>
      </div>
    );
  }

  if (!userProgress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Could not load progress</h2>
          <p className="text-slate-600">Please try refreshing the page or check your connection.</p>
        </div>
      </div>
    );
  }

  const { username, points, activityProgress } = userProgress;
  const totalTasks = Object.values(activityProgress).reduce((sum, tasks) => sum + tasks.length, 0);
  const sectionCount = Object.keys(activityProgress).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                Welcome back, <span className="text-blue-600">{username}</span>
              </h1>
              <p className="text-slate-600 text-lg">
                Here's a summary of your learning journey and earned points
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Points Section */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-6 text-center text-white shadow-lg mb-8 overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full mr-3">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white/90">Your Total Achievement</h2>
            </div>

            <div className="mb-4">
              <p className="text-5xl md:text-6xl font-black mb-3 text-white">
                {points}
              </p>
              <p className="text-lg font-semibold text-white/90 mb-2">POINTS EARNED</p>
              <p className="text-sm text-white/70 max-w-xl mx-auto">
                Outstanding achievement! You've earned these points through dedication and consistent learning.
              </p>
            </div>

            <div className="flex justify-center space-x-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 min-w-[100px]">
                <p className="text-2xl font-bold text-yellow-300">{totalTasks}</p>
                <p className="text-xs text-white/80">Tasks Done</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 min-w-[100px]">
                <p className="text-2xl font-bold text-green-300">{sectionCount}</p>
                <p className="text-xs text-white/80">Sections</p>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-emerald-100 text-sm font-medium">Tasks Completed</p>
              </div>
            </div>
            <p className="text-4xl font-bold mb-2">{totalTasks}</p>
            <p className="text-emerald-100 text-sm">Successfully finished across all sections</p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-purple-100 text-sm font-medium">Active Sections</p>
              </div>
            </div>
            <p className="text-4xl font-bold mb-2">{sectionCount}</p>
            <p className="text-purple-100 text-sm">Learning topics with progress</p>
          </div>
        </div>

        {/* Section-wise Summary Title */}
        <div className="flex items-center justify-between mb-4 mt-6">
          <h2 className="text-2xl font-bold text-slate-900">Section-wise Task Summary</h2>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Each completed task = +1 point</span>
          </div>
        </div>

        {/* ✅ Transaction-Style List */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="p-6">
            {/* Table Header */}
            <div className="grid grid-cols-3 text-sm font-semibold text-slate-600 border-b border-slate-200 pb-2 mb-4">
              <div>Section</div>
              <div>Task Name</div>
              <div className="text-right">Points</div>
            </div>

            {/* Table Body */}
            <div className="space-y-3">
              {Object.entries(activityProgress).flatMap(([section, tasks]) =>
                tasks.map((task, index) => (
                  <div
                    key={`${section}-${index}`}
                    className="grid grid-cols-3 items-center text-sm bg-slate-50 hover:bg-slate-100 transition rounded-lg px-4 py-2"
                  >
                    <div className="text-slate-800 font-medium">{section}</div>
                    <div className="text-slate-700">{task}</div>
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
