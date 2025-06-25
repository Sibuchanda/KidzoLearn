import User from '../model/userModel.js';


export const completeTask = async (req, res) => {
  try {
    const { email, activityName, taskKey } = req.body;

    if (!email || !activityName || !taskKey) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Initializing activityProgress map if it does not  exists
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
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: "Email required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json({
    username: user.username,
    points: user.points,
    activityProgress: Object.fromEntries(user.activityProgress || []),
  });
};