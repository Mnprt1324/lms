const express = require("express");
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
const connectToDB = require("./utils/db");
const userRouter=require("./routers/user.router");
const cookieParser = require('cookie-parser')
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

const port=process.env.PORT||5000;
app.listen(port, () => {
    console.log(`server is listening at port :${port}`)
})