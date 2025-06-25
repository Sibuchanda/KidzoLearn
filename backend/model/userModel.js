import mongoose from 'mongoose'

//Creating Schema 
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  confirmpassword: {
    type: String,
    required: true,
    select: false
  },
  token: {
    type: String
  },
  points: {
    type: Number,
    default: 0
  },
  activityProgress: {
    type: Map,
    of: [String], // activityName: ["taskKey1", "taskKey2"]
    default: {},
  }
});

//Creating Model of the above Schema
const User = mongoose.model("User",userSchema);

export default User