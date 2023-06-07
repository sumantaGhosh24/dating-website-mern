require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const connectDB = require("./lib/connectDb");
const corsOptions = require("./lib/corsOptions");

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));

app.get("/api", (req, res) => {
  return res.json({message: "Dating App MERN API!"});
});

app.use("/api", require("./router/authRouter"));
app.use("/api", require("./router/userRouter"));
app.use("/api", require("./router/messageRouter"));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
