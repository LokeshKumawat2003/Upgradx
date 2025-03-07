const express = require("express");
const dotenv = require("dotenv");
const getMongo = require("./config/server");
const userRoute = require("./routes/registration");
const taskRoute = require("./routes/Task");
const categoryRoute = require("./routes/category");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api", userRoute);
app.use("/task", taskRoute);
app.use("/category", categoryRoute);

const startServer = async () => {
  try {
    await getMongo();
    app.listen(3000, () => {
      console.log(" Server running  port 3000");
    });
  } catch (error) {
    console.error("Failed  start server:", error);
  }
};

startServer();
