const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: "string",
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: "string",
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: "string",
    required: true,
    min: 6,
  },
  profilePicture: {
    type: "string",
    default: "",
  },
  coverPicture: {
    type: "string",
    default: "",
  },
  followers: {
    type: Array,
    default: [],
  },
  followins: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  desc:{
      type:String,
      max:50
  },
  city:{
      type: String,
      max:50
  },
  from:{
      type:String,
      max:50
  },
  relationship:{
      type:Number,
      enum:[1,2,3]
  }
});

module.exports = mongoose.model("User", UserSchema);
