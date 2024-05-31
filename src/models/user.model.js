import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      required: true,
      unique: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary Url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary Url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "video",
      },
    ],
    password : {
        type : String,
        required : [true , "Passwor is required"]
    },
    refreshToken:{
        type : String,
        required : true
    }
  },
  { timestamps: true }
);
userSchema.pre("save" , async function(next){
    if(!this.isModified('password')) return next();

    this.password = bcrypt.hash(this.password , 10)
    next();
})
export const User = mongoose.model("User", userSchema);
