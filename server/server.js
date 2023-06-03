require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const dbConfig = require("./config/dbconfig");
const port = process.env.PORT || 3000;
const userRoute = require("./routes/usersRoute");

app.use(express.json);
app.use("/api/users", userRoute);

app.listen(port, () => `Server running on the port ${port}`);
