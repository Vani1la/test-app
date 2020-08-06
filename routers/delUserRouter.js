const express = require('express')
const router = express.Router()
const client = require('../models/connect')


router.get('/:id', async (req, res) => {
    const query = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [req.params.id],
  }
    try{
        let user = await client.query(query)
        console.log(user.rows[0].cars)
        if (user.rows[0].cars){
            let cars = Object.values(user.rows[0].cars)
            cars.forEach(car =>{
                client.query({text: 'UPDATE cars SET owner = NULL WHERE id = $1', values: [car]})
            })
        }
        await client.query({text: 'DELETE FROM users WHERE id = $1', values: [req.params.id]})
        res.redirect('/')
    }catch(err){
        console.log(err)
        res.redirect('/')
    }
});
module.exports = router