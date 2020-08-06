const express = require('express')
const router = express.Router()
const client = require('../models/connect')


router.get('/:id', async (req, res) => {
    let car = await client.query({text: 'SELECT * FROM cars WHERE id = $1', values: [req.params.id]})
    car = car.rows[0]
    console.log(car)
    res.render('car', {
        title: 'Список',
        car,
        id: req.params.id
    });
});
router.post('/:id/edit', async (req, res) => {
    console.log(req.body)
    try{
        client.query({text: 'UPDATE cars SET brand = $1, model = $2, year_of_issue = $3 WHERE id = $4;', values: [req.body.brand, req.body.model, req.body.year_of_issue, req.params.id]})
        res.redirect('/car/' + req.params.id)
    }catch(err){
        console.log(err)
        res.redirect('/')
    }
})
module.exports = router