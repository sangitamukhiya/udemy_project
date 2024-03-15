import express from "express";

import connectDB from "./connectdb.js";

import courseRoutes from "./course/course.routes.js";
import studentRoutes from "./student/student.route.js";
const app = express();

app.use(express.json());

//connect database
connectDB();

//register
app.use(courseRoutes);
app.use(studentRoutes);
//server and port

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is listening in this ${PORT}`);
});
