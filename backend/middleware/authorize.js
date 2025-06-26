import jwt from 'jsonwebtoken';
import User from '../model/userModel.js'

export const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token found' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie('jwt');
    return res.status(401).json({ message: 'Unauthorized, invalid token' });
  }
};
