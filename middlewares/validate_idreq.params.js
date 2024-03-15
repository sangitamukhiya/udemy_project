import mongoose from "mongoose";

export const validateMongoIdFromReqParams = (req, res, next) => {
  //extract student id from parAMS
  const studentId = req.params.id;
  //check validata mongo id
  const isvalidMongoId = mongoose.isValidObjectId(studentId);

  //if not valid,throw error
  if (!isvalidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  //call next function
  next();
};
