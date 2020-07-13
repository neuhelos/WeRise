const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 4000;
const app = express()
app.use(cors());
const workshopsRoutes = require("./Routes/WorkshopRoutes")

// app.use("/users");
app.use("/workshops", workshopsRoutes);

app.listen(port,()=>console.log(`server is listening at ${port}`))