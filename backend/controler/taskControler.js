import User from '../model/userModel.js';


// routes/task.js or controller
export const completeTask = async (req, res) => {
  try {
    const { activityName, taskKey } = req.body;

    if (!activityName || !taskKey) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = req.user; // comes from middleware

    if (!user.activityProgress) {
      user.activityProgress = new Map();
    }

    let completedTasks = user.activityProgress.get(activityName) || [];

    if (completedTasks.includes(taskKey)) {
      return res.status(200).json({
        message: "Task already completed",
        points: user.points
      });
    }

    completedTasks.push(taskKey);
    user.activityProgress.set(activityName, completedTasks);
    user.points = (user.points || 0) + 1;

    await user.save();

    return res.status(200).json({
      message: "+1 point earned!",
      points: user.points
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};




export const getUserProgress = async (req, res) => {
  try {
    const user = req.user; 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { username, points, activityProgress } = user;
    res.status(200).json({ username, points, activityProgress });
  } catch (err) {
    console.error("Error fetching progress:", err);
    res.status(500).json({ message: "Server error" });
  }
};
