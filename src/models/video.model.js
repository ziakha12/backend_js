import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
  videoFile: {
    type: String, //cloudinary URl
    required: true,
  },
  thumbnail: {
    type: String, //cloudinary Url
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // cloudinary Url
    required: true,
  },
  owner:{
    type : Schema.Types.ObjectId,
    ref : "User"
  }
 },{timestamps : true});

export const Video = mongoose.model("Video", videoSchema);
