const { Router } = require("express");
const router = Router();
const pool = require("../conexion/cnn");

router.post("/getorders", async (req, res) => {
  let result = { status: true, data: "" };

  try {
    const response =
      await pool.query(`select id,  detail, stateordersid, clientid, detail, TO_CHAR(startdate, 'dd/mm/yyyy') as startdate ,starthour,
TO_CHAR(enddate, 'dd/mm/yyyy') as enddate,endhour
	from orders`);
    result.data = response.rows;

    res.json({ result });
  } catch (error) {
    result.status = false;
    result.data = JSON.stringify(error);

    res.json({ result });
  }
});

router.post("/getstateorders", async (req, res) => {
  let result = { status: true, data: "" };

  try {
    const response = await pool.query(`select * from stateorders`);
    result.data = response.rows;

    res.json({ result });
  } catch (error) {
    result.status = false;
    result.data = JSON.stringify(error);

    res.json({ result });
  }
});

router.post("/createorders", async (req, res) => {
  let result = { status: true, data: "" };

  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);

    const formattedDate = `${year}-${month}-${day}`;
    console.log(`insert into orders(idclient, stateordersid, detail, startdate, starthour, enddate, endhour , 
         modifyuserid, modifydate) 
            values 
            (${req.body.idClient}, ${req.body.stateOrdersId} ,'${req.body.detail}', '${req.body.startDate}', 
            '${req.body.startHour}','${req.body.endDate}', '${req.body.endHour}',  ${req.body.userId}, '${formattedDate}')`);
    const response = await pool.query(
      `insert into orders(clientid, stateordersid, detail, startdate, starthour, enddate, endhour , 
         modifyuserid, modifydate) 
            values 
            (${req.body.clientId}, ${req.body.stateOrdersId} ,'${req.body.detail}', '${req.body.startDate}', 
            '${req.body.startHour}','${req.body.endDate}', '${req.body.endHour}',  ${req.body.userId}, '${formattedDate}')`
    );

    result.data = "OK";

    res.json({ result });
  } catch (error) {
    result.status = false;
    result.data = JSON.stringify(error);

    res.json({ result });
  }
});

router.put("/modifyclient", async (req, res) => {
  let result = { status: true, data: "" };

  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);

    const formattedDate = `${year}-${month}-${day}`;

    const response = await pool.query(
      `update client set name = '${req.body.name}', activityid = ${req.body.activityId}, email = '${req.body.email}', countryid =${req.body.countryId},  address ='${req.body.address}', detail = '${req.body.detail}',  telephone ='${req.body.telephone}', active = true, userid = ${req.body.userId}, modifydate= '${formattedDate}' where id = ${req.body.id}`
    );

    result.data = JSON.stringify("OK");

    res.json({ result });
  } catch (error) {
    result.status = false;
    result.data = JSON.stringify(error);

    res.json({ result });
  }
});

router.put("/deleteclient", async (req, res) => {
  let result = { status: true, data: "" };

  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);

    const formattedDate = `${year}-${month}-${day}`;
    const response = await pool.query(
      `update client set active = false, userid = ${req.body.userId}, modifydate= '${formattedDate}'  where id = ${req.body.id}`
    );
    result.data = JSON.stringify("Actualización exitosa");
    res.json({ result });
  } catch (error) {
    result.status = false;
    result.data = JSON.stringify(error);

    res.json({ result });
  }
});

module.exports = router;
