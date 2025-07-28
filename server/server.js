const express = require("express");
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
const connectToDB = require("./utils/db")
const cookieParser = require('cookie-parser');


const userRouter=require("./routers/user.router");
const courseRouter=require("./routers/course.router");
const mediaRouter=require("./routers/media.routes")

dotenv.config();



app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
}));
connectToDB();

app.get('/', (req, res) => {
    res.send(`hello from server`)
})


app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/media",mediaRouter)

const port=process.env.PORT||5000;
app.listen(port, () => {
    console.log(`server is listening at port :${port}`)
})