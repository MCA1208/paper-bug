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

router.post('/createusers', async (req , res)  => { 

    let result = ({"status":"ok", "data":""});

    try {

        const date = new Date();
        const year = date.getFullYear();
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const day = `0${date.getDate()}`.slice(-2);

        const formattedDate = `${year}-${month}-${day}`;

        const response = await pool.query(`insert into users(name, email, password, createDate, active) values ('${req.body.name}','${req.body.email}', '${req.body.password}', '${formattedDate}', true)`);

        // const response = `insert into users(name, email, password, createDate, active) '+
        // 'values ('${req.body.name}','${req.body.email}', '${req.body.password}', '${formattedDate}', true)`;

        // const response = await pool.query('INSERT INTO users(name, email, password, createDate, active) VALUES ($1, $2)'
        // , [req.body.name , req.body.email ,  req.body.password ,  '2024-02-26' , true ]);

        result.data = JSON.stringify(response)

        res.json({ result });
    } catch (error) {

        result.status = false;
        result.data = JSON.stringify(error)

        res.json(result);
    }

});


module.exports = router;