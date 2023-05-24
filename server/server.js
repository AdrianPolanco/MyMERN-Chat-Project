require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const dbConfig = require("./config/dbconfig");
const port = process.env.PORT || 3000;

app.listen(port, () => `Server running on the port ${port}`);
