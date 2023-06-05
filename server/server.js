require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const dbConfig = require("./config/dbconfig");
const port = process.env.PORT || 5173;
const userRoute = require("./routes/usersRoute");

app.use(express.json());
//To any request that will be coming to to /api/users, will check if it is login or register and will do the logic we have built in there before
app.use("/api/users", userRoute);

app.listen(port, () => console.log(`Server running on the port ${port}`));
