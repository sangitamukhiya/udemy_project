import express from "express";
import Course from "./course.model.js";
import { courseValidationSchema } from "./course.validation.js";

const router = express.Router();

//add course

router.post("/course/add", async (req, res) => {
  //extract  new  course from req.body
  const newCourse = req.body;

  try {
    await courseValidationSchema.validate(newCourse);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  // console.log(newCourse);

  //save course
  await Course.create(newCourse);

  //send response

  return res.status(200).send({ message: "adding course.." });
});

//get course list

router.get("/course/list");

export default router;
