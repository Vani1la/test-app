const express = require('express')
const router = express.Router()
const client = require('../models/connect')


router.get('/', async (req, res) => {
    let users = await client.query('SELECT * FROM users;')
    let cars = await client.query('SELECT * FROM cars;')
    users.rows.forEach(user => {
        if (user.cars){
            user.cars = Object.values(user.cars)
        }
    });
    res.render('main', {
        title: 'Список',
        users: users.rows,
        cars: cars.rows
    });
    
});
module.exports = router