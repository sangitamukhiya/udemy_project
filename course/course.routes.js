import express from "express";
import mongoose from "mongoose";
import Course from "./course.model.js";
import {
  courseValidationSchema,
  paginationDataValidationSchema,
} from "./course.validation.js";

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

//edit course
router.put("/course/edit/:id", async (req, res) => {
  // extract course id from req.params
  const courseId = req.params.id;

  // check for valid mongo id
  const isValidMongoId = mongoose.isValidObjectId(courseId);

  // if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find course by id
  const course = await Course.findOne({ _id: courseId });

  // if not course, throw error
  if (!course) {
    return res.status(404).send({ message: "course does not exist." });
  }

  // extract new values from req.body
  const newValues = req.body;

  // validate new values
  try {
    await courseValidationSchema.validate(newValues);
  } catch (error) {
    // if validation fails, throw error

    return res.status(400).send({ message: error.message });
  }

  // edit course
  await Course.updateOne(
    { _id: courseId },
    {
      $set: { ...newValues },
    }
  );

  // send response

  return res.status(200).send({ message: "course is edited successfully." });
});

//delete course

router.delete("/course/delete/:id", async (req, res) => {
  // extract course id from req.params
  const courseId = req.params.id;

  // check for valid mongo id
  const isValidMongoId = mongoose.isValidObjectId(courseId);

  // if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongose id." });
  }

  // find course by id
  const course = await Course.findOne({ _id: courseId });

  // if not course, throw error
  await Course.deleteOne({ _id: courseId });

  //send respons
  return res.status(200).send({ message: "course is deleted successfully." });
});

//get course list

router.get("/course/list", async (req, res) => {
  // extract pagination data from req.body

  const paginationData = req.body;
  console.log(paginationData);
  console.log("hello");
  // validate pagination data
  let validatedData;
  try {
    validatedData = await paginationDataValidationSchema.validate(
      paginationData
    );
    console.log(validatedData);
  } catch (error) {
    // if validation fails,throw error

    return res.status(400).send({ message: error.message });
  }

  //calculate skip

  const skip = (validatedData.page - 1) * validatedData.limit;

  // find courses
  const course = await Course.aggregate([
    { $match: {} },
    {
      $skip: skip,
    },
    { $limit: validatedData.limit },
    {
      $project: {
        name: 1,
        Price: 1,
        duration: 1,
        tutorName: 1,
      },
    },
  ]);
  //

  // send response
  return res.status(200).send({ message: "success", courseList: course });
});

export default router;
