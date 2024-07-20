const express = require("express");
const path = require("path");
require("./db/conn");
const Register = require("./models/register");
const hbs = require("hbs");
const {register } = require("module");

const app = express();


const port = process.env.PORT || 9001;
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

const template_path = path.join(__dirname, "../templates/views");
const Partial_path = path.join(__dirname, "../templates/partials");
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(Partial_path);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  try {
    const { FullName, Emailaddress, Username, Password,EmployeeID } = req.body;

    if (!FullName || !Emailaddress || !Username || !Password || !EmployeeID) {
      return res.status(400).send("All fields are required");
    }

    const newUser = new Register({
      FullName,
      Emailaddress,
      Username,
      Password,
      EmployeeID
    });

    await newUser.save();
    res.send("registration successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during registration");
  }
});




app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
