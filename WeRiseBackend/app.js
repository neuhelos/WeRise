const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3001;
const app = express();
app.use(cors());
const workshopsRoutes = require("./Routes/WorkshopRoutes");
const registered = require("./Routes/RegisterWorks");
const users = require("./Routes/Users");

app.use("/users", users);
app.use("/workshops", workshopsRoutes);
app.use("/registered", registered);

app.listen(port, () => console.log(`server is listening at ${port}`));
