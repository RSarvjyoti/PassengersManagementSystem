const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectToDB = require("./src/configs/db");
const userRouter = require("./src/routers/user.router");

const app = express();

const PORT = process.env.PORT || 9080
const DB_URL = process.env.DB_URL

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("This is a home route.")
})
app.use('/api', userRouter);

app.listen(PORT,async ()=> {
    try{
        console.log(`Server is running at http://localhost:${PORT}`);
        await connectToDB(DB_URL);
    }catch(err){
        console.log(err);
    }
})