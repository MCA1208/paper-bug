const { Router } = require("express");
const router = Router();
const pool = require("../conexion/cnn");

//#region  METODOS POST
router.post("/getprovince", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM province");

    res.json(response);
  } catch (error) {
    result.status = false;
    result.data = JSON.stringify(error);

    res.json(result);
  }
});
//#endregion

//#region METODOS PUT
//#endregion

module.exports = router;
