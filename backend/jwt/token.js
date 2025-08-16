import jwt from 'jsonwebtoken';
import User from '../model/userModel.js'


const generateToken = async (userId, res) => {

    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d"
        // expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 day expiry time
    })
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    // Here we store the token to the token field in the user schema model
    await User.findByIdAndUpdate(userId,{token})
    return token;

};


export default generateToken;