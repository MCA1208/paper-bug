const { Router } = require("express");
const router = Router();
const pool = require("../conexion/cnn");

router.post("/getsupplier", async (req, res) => {
  let result = { status: true, data: "" };

  try {
    const response = await pool.query(
      `select * from supplier where active = true`
    );
    result.data = response.rows;

    res.json({ result });
  } catch (error) {
    result.status = false;
    result.data = JSON.stringify(error);

    res.json({ result });
  }
});

router.post("/createsupplier", async (req, res) => {
  let result = { status: true, data: "" };
  console.log(
    `entro supplier: ${JSON.stringify(
      req.body
    )} ${new Date().toLocaleDateString()} `
  );
  try {
    const response = await pool.query(
      `insert into supplier(names, activityid, email, countryid, provinceid, address, detail, 
        telephone, active, userid, modifydate) 
            values 
            ('${req.body.name}','${req.body.activityId}','${
        req.body.email
      }', '${req.body.countryId}', '${req.body.provinceId}',
            '${req.body.address}','${req.body.detail}', '${
        req.body.telephone
      }', ${true},' ${req.body.userId}', '${new Date().toLocaleDateString()}')`
    );

    result.data = JSON.stringify(response);

    res.json({ result });
  } catch (error) {
    result.status = false;
    result.data = JSON.stringify(error);

    res.json({ result });
  }
});

router.put("/modifysupplier", async (req, res) => {
  let result = { status: true, data: "" };

  try {
    const response = await pool.query(
      `update supplier set name = '${req.body.name}', activityId = '${req.body.activityId}', email = '${req.body.email}', countryId ='${req.body.countryId}', provinceId = ${req.body.provinceId}, 
            address ='${req.body.address}', detail = '${req.body.detail}',
            telephone, active, userId, modifyDate)`
    );

    result.data = JSON.stringify(response);

    res.json({ result });
  } catch (error) {
    result.status = false;
    result.data = JSON.stringify(error);

    res.json(result);
  }
});

router.delete("/deletesupplier", async (req, res) => {
  let result = { status: true, data: "" };

  try {
    const response = await pool.query(
      `delete supplier where id = ${req.body.id}`
    );

    res.json({ result });
  } catch (error) {
    result.status = false;
    result.data = JSON.stringify(error);

    res.json(result);
  }
});

module.exports = router;
