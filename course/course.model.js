import mongoose from "mongoose";

//set rules

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 45,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    duration: {
      type: Number,
      min: 1, //day
      requuired: true,
    },
    tutorName: {
      type: String,
      required: false,
      maxlength: 45,
      trim: true,
    },
  },

  {
    timestamps: true,
  }
);

//creat tables
const Course = mongoose.model("Course", courseSchema);

export default Course;
