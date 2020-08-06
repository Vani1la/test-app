const { Client } = require("pg");
const uuid = require('uuid')

const client = new Client({
    user: 'postgres', 
    host: 'localhost', 
    database: 'avecoder',
    password: '123456',
    port: '5000'
})
client.connect()

// const query = {
//     text: 'INSERT INTO users(id, name, tell, email, cars) VALUES($1, $2, $3, $4, $5)',
//     values: ['39926b40-d71a-11ea-b316-1f0d131a0aee', 'Василий', '8845553535', 'asdasdawd@gmail.com', {"sd":"39926b41-d71a-11ea-b316-1f0d131a0aee"}],
//   }
// client.query(query, (err, res) => {
//    if (err) {
//      console.log(err.stack)
//    } else {
//      console.log(res)
//    }
//   })

// let x = 0

// client.query('SELECT * FROM users;',(err, res) => {
//     if (err) {
//         console.log(err.stack)
//     } else {
//         console.log(res.rows)
        
//     }
// })

// client.query('SELECT * FROM users;')
// .then(res=>{console.log(res)})

module.exports = client