import User from '../model/userModel.js'
import { z } from "zod";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import generateToken from "../jwt/token.js"

//---------------- Validating User Schema using 'Zod'-----------
const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(3, { message: "Username should be at least 3 character long" }).max(35),
    password: z.string().min(8, { message: "Password length should be at least 8 character long" }).max(25, { message: "Password length should be maximum 25 character long" }),
    confirmpassword: z.string().min(8, { message: "Password length should be at least 8 character long" }).max(25, { message: "Password length should be maximum 25 character long" })
})

// ========================Register a new user=====================

export const signup = async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;

        // --- If there is no username or email or password,then there will be error
        if (!username || !email || !password) {
            res.status(400).json({ errors: "All fields are required" });
        }
        // Checking if password and confirm password are same or not
        if (password === confirmpassword) {

            // ---------- safe parsing the userSchema ------------
            const validation = userSchema.safeParse({ username, email, password, confirmpassword });

            //-------If validation is not success(success is a parameter present in the safeparse) then there will be error
            if (!validation.success) {
                // res.status(400).json({errors:validation.error.errors});
                //-------- Without sending the whole error(the above line display the errors array), we display only the error message not all things. For that we use the map method, map method display only a specific item into an array
                const errorMessage = validation.error.errors.map((err) => err.message);
                console.log(errorMessage);
                return res.status(400).json({ errors: errorMessage });
            }

            //---Checking if user(email) is present or not---
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: "User already registered" });
            }

            // -------------------- Creating a new User and Save into the database --------
            //Hashing the password
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashPassword});
            await newUser.save();

            if (newUser) {
                res.status(201).json({ message: "User registered sucessfully", newUser });
            }
        }
        else {
            res.status(400).json({ errors: "Password and Confirm Password should be same" });
        }

    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error occured during User Register" });
    }
}



// ========================Login a user=====================
export const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Here we are checking that the user exists or not
        // Here .select("+password")  is used to get the password from the database
        const user = await User.findOne({ email }).select("+password");
              //Or we can get password from the database like
        // const userPass = await bcrypt.compare(password, user.password);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ errors: "Invalid user details" });
        }

        // Generate token and attach it to the response
        const token = await generateToken(user._id, res);

        // Return the user data along with the token
        res.status(200).json({
            message: "User logged in successfully",
            user: { username: user.username, token }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error occurred during UserLogin" });
    }
};

// ================ Getting email from cookie token ==========
export const getProfile = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ _id: decoded.userId }).select("email username");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ email: user.email, username: user.username });
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(401).json({ message: "Invalid Token" });
  }
};


// ================ Logout ===================
export const logout = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: false,  
    sameSite: "lax",
    path: "/"
  });
  res.status(200).json({ message: "Logged out successfully" });
};
