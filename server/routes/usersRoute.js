const { Router } = require("express");
const router = Router();
const pool = require("../conexion/cnn");
const { getUsers } = require("../service/service");
const CryptoJS = require("crypto-js");

const encryp = (data, key) => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

const decryp = (data, key) => {
  var wA = CryptoJS.AES.decrypt(data, key);
  return wA.toString(CryptoJS.enc.Utf8);
};

router.get("/users", getUsers);

router.get("/users/:id", async (req, res) => {
  const response = await pool.query("SELECT * FROM user");
  const resultfilter = response.rows.filter((user) => user.id == req.params.id);
  console.log(resultfilter);

  res.json(resultfilter);
});

router.get("/encrip/:password", async (req, res) => {
  let encrip = CryptoJS.SHA1(req.params.password).toString();
  let name = "gabriel@gmail.com";
  const getuserByID = await pool.query(
    `select password from users where email = '${name}'`
  );
  console.log(`COUNT ${getuserByID.rowCount}`);

  console.log(`encrip ${encrip}`);

  //console.log(`descrip ${decrypted.toString(CryptoJS.enc.Hex)}`);

  res.json(req.params.password);
});

router.post("/createusers", async (req, res) => {
  let result = { status: true, data: "" };

  try {
    const getuserByID = await pool.query(
      `select password from users where email ='${req.body.email}'`
    );

    if (getuserByID.rowCount > 0) {
      result.status = false;
      result.data = JSON.stringify("El email ingresado esta repetido");
      res.json({ result });
    } else {
      const date = new Date();
      const year = date.getFullYear();
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const day = `0${date.getDate()}`.slice(-2);

      const formattedDate = `${year}-${month}-${day}`;

      const passwordHash = CryptoJS.SHA1(req.body.password).toString();

      const response = await pool.query(
        `insert into users(name, email, password, createDate, active) values ('${req.body.name}','${req.body.email}', '${passwordHash}', '${formattedDate}', true)`
      );

      result.data = JSON.stringify(response);

      res.json({ result });
    }
  } catch (error) {
    result.status = false;
    result.data = JSON.stringify(error);

    res.json(result);
  }
});

router.post("/login", async (req, res) => {
  let result = { status: true, data: "" };

  try {
    const getuserByID = await pool.query(
      `select id,email, password from users where email ='${req.body.email}'`
    );
    const passwordHash = CryptoJS.SHA1(req.body.password).toString();

    let passwordUser = getuserByID.rows[0]["password"];

    if (passwordUser == passwordHash) {
      const dataUser = [
        {
          id: getuserByID.rows[0]["id"],
          email: getuserByID.rows[0]["email"],
        },
      ];
      result.data = dataUser;
      res.json({ result });
    } else {
      result.status = false;
      result.data = "No coincide la contraseña";
      res.json({ result });
    }
  } catch (error) {
    result.status = false;
    result.data = error.toString();

    res.json({ result });
  }
});

module.exports = router;
