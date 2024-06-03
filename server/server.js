const express = require("express");
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cors = require("cors");
const PORT = 8080;

app.use(cors());

//Routes
app.use(require("./routes/usersRoute"));
app.use(require("./routes/supplierRoute"));
app.use(require("./routes/countryRoute"));
app.use(require("./routes/provinceRoute"));
app.use(require("./routes/activityRoute"));
app.use(require("./routes/clientRoute"));

app.get("/api/home", (req, res) => {
  res.json({ message: "Like this video!", people: ["Harry", "Jack", "barry"] });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
