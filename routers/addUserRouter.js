const express = require('express')
const router = express.Router()
const client = require('../models/connect')
const uuid = require('uuid')


router.get('/', (req, res) => {
    res.render('addUser', {
        title: 'Добавить пользователя',
    });
});
router.post('/', async(req, res) => {
    const data = req.body
    try{
        client.query({text: 'INSERT INTO users(id, name, tell, email) VALUES($1, $2, $3, $4)', values: [uuid.v1(), data.name, data.tell, data.email]})
        res.redirect('/')
    }catch(err){
        console.log(err)
        res.redirect('/')
    }
})
router.post('/:id', async (req, res) => {
    const userID = uuid.v1()
    try{
        let car = { '0': req.params.id}
        await client.query({text: 'INSERT INTO users(id, name, tell, email, cars) VALUES($1, $2, $3, $4, $5)', values: [userID, req.body.name, req.body.tell, req.body.email, car]})
        await client.query({text: 'UPDATE cars SET owner = $1 WHERE id = $2;', values: [userID, req.params.id]})
        res.redirect('/')
    }catch(err){
        console.log(err)
        res.redirect('/')
    }
})
module.exports = router