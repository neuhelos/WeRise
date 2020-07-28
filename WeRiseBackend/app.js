const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3001;
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const workshopsRoutes = require("./Routes/WorkshopRoutes");
const registered = require("./Routes/RegisterWorks");
const users = require("./Routes/Users");
const userSkills = require("./Routes/userSkills");
const recentPosted = require("./Routes/recentPosted");

app.use("/users", users);
app.use("/workshops", workshopsRoutes);
app.use("/registered", registered);
app.use("/usersSkills", userSkills);
app.use("/recentPosted", recentPosted);


app.listen(port, () => console.log(`server is listening at ${port}`));
