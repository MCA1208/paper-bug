const { Router } = require("express");
const router = Router();
const pool = require("../conexion/cnn");

//#region  METODOS GET
router.post("/getactivity", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM activity");

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
