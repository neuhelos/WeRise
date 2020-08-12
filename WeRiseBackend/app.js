const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const port = 3001;
const app = express();
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: true }))

const workshopsRoutes = require("./Routes/WorkshopRoutes");
const registered = require("./Routes/RegisterWorks");
const users = require("./Routes/Users");
const userSkills = require("./Routes/userSkills");
const recentPosted = require("./Routes/recentPosted");
const { sendEmail } = require("./Middleware/Mailgun")


app.use("/users", users);
app.use("/workshops", workshopsRoutes);
app.use("/registered", registered);
app.use("/usersSkills", userSkills);
app.use("/recentPosted", recentPosted);

app.post("/email", sendEmail)


app.listen(port, () => console.log(`server is listening at ${port}`));
