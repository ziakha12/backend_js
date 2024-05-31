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
    fullName: {
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
    next()
})
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password)
}
userSchema.method.createAccessToken = function(){
    return jwt.sign(
        {
        _id : this._id,
        username : this.username,
        fullName : this.fullName,
        email : this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
)
}
userSchema.method.createRefreshToken = function(){
    return jwt.sign(
        {
        _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
)
}
export const User = mongoose.model("User", userSchema);
