const express = require('express')
const router = express.Router()
const client = require('../models/connect')


router.get('/:id', async (req, res) => {
    try{
        let car = await client.query({text: 'SELECT * FROM cars WHERE id = $1', values: [req.params.id]})
        const owner = car.rows[0].owner
        if (owner){
            let user = await client.query({text: 'SELECT * FROM users WHERE id = $1', values: [owner]})
            let cars = user.rows[0].cars
            cars = Object.values(cars)
            cars = cars.filter(item => item !== req.params.id)
            cars = { ...cars }
            await client.query({text: 'UPDATE users SET cars = $1 WHERE id = $2', values: [cars, owner]})
        }
        await client.query({text: 'DELETE FROM cars WHERE id = $1', values: [req.params.id]})
        res.redirect('/')
    }catch(err){
        console.log(err)
        res.redirect('/')
    }
    
});
module.exports = router