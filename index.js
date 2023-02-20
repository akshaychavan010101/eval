const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./db");
const { UserRouter } = require("./routes/users.routes");
const { PostRouter } = require("./routes/posts.routes");


const app = express();

app.use(express.json());
app.use(cors());
app.use(UserRouter);
app.use(PostRouter)

app.get("/",(req,res)=>{
    res.send('Hello');
})


app.listen(process.env.Port, async () => {
  try {
    await connection;
    console.log("Running and Connected to DB");
  } catch (error) {}
});
