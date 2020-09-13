const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT;
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const workshopsRoutes = require("./Routes/WorkshopRoutes");
const registered = require("./Routes/RegisteredWorkshopRoutes");
const users = require("./Routes/UsersRoutes");
const usersSkills = require("./Routes/UsersSkillsRoutes");
const recentlyPosted = require("./Routes/RecentlyPostedRoutes");
const { sendEmail } = require("./Middleware/Mailgun");

app.use("/users", users);
app.use("/workshops", workshopsRoutes);
app.use("/registered", registered);
app.use("/usersSkills", usersSkills);
app.use("/recentPosted", recentlyPosted);

app.post("/email", sendEmail);

app.listen(port, () => console.log(`server is listening at ${port}`));
