const { Router } = require("express");
const router = Router();

const pool = require("../conexion/cnn");
const { getUsers } = require('../service/service');

router.get('/users', getUsers);

router.get('/users/:id', async (req , res)  => { 

    const response = await pool.query('SELECT * FROM users');
    const resultfilter = response.rows.filter(user => user.id == req.params.id);
    console.log(resultfilter);

    res.json(resultfilter);

});


module.exports = router;