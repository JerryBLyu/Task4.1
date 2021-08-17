const express = require("express");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/iService", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(cors());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log(req.body);
  let data = req.body;
  if (data.password !== data.confirmpassword || data.password.length <8) {
    res
      .status(200)
      .send({ successful: false, msg: "The two passwords are mismatch or length <6!" });
  }

  const Model = require(`./Customer`);

  Model.create(data)
    .then((data) => {
      res
        .status(200)
        .send({ successful: true, data, msg: "Saved successfully!" });
    })
    .catch((err) => {
      res.status(200).send({ successful: false, msg: "Saved Failed!" });
    });
});

const port = 5000;
app.listen(port, "127.0.0.1", () => {
  console.log(`Server Listening on ${port}`);
});
