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
  token: {
    type: String
  },
  points: {
    type: Number,
    default: 0
  },
  activityProgress: {
    type: Map,
    of: [String], // Example : "ColorIdentification": ["red", "blue"]
    default: {},
  }
});

//Creating Model of the above Schema
const User = mongoose.model("User",userSchema);

export default User