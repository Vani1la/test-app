const express = require('express')
const router = express.Router()
const client = require('../models/connect')
const uuid = require('uuid')


router.get('/', (req, res) => {
    res.render('addCar', {
        title: 'Добавить авто',
    });
});
router.post('/', async(req, res) => {
    const data = req.body
    try{
        client.query({text: 'INSERT INTO cars(id, brand, model, year_of_issue) VALUES($1, $2, $3, $4)', values: [uuid.v1(), data.brand, data.model, data.year_of_issue]})
        res.redirect('/')
    }catch(err){
        console.log(err)
        res.redirect('/')
    }
})
router.post('/:id', async (req, res) => {
    const carID = uuid.v1()
    try{
        await client.query({text: 'INSERT INTO cars(id, brand, model, year_of_issue, owner) VALUES($1, $2, $3, $4, $5)', values: [carID, req.body.brand, req.body.model, req.body.year_of_issue, req.params.id]})
        const user = await client.query({text: 'SELECT * FROM users WHERE id = $1', values: [req.params.id]})
        let cars = user.rows[0].cars
        if (!cars){
            let car = [carID]
            car = { ...car }
            client.query({text: 'UPDATE users SET cars = $1 WHERE id = $2;', values: [car, req.params.id]})
        }else{
            cars = Object.values(cars)
            cars.push(carID)
            cars = { ...cars }
            client.query({text: 'UPDATE users SET cars = $1 WHERE id = $2;', values: [cars, req.params.id]})
        }
        redirect('/')
    }catch(err){
        console.log(err)
        res.redirect('/')
    }
})
module.exports = router