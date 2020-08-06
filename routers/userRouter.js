const express = require('express')
const router = express.Router()
const client = require('../models/connect')


router.get('/:id', async (req, res) => {
    let user = await client.query({text: 'SELECT * FROM users WHERE id = $1', values: [req.params.id]})
    user = user.rows[0]
    res.render('user', {
        title: 'Список',
        user,
        id: req.params.id
    });
});
router.post('/:id/edit', async (req, res) => {
    console.log(req.body)
    client.query({text: 'UPDATE users SET email = $1, name = $2, tell = $3 WHERE id = $4;', values: [req.body.email, req.body.name, req.body.tell, req.params.id]})
    res.redirect('/user/' + req.params.id)
})
module.exports = router