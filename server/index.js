const express = require('express');
const db = require('./config/db');
const cors = require('cors');

const app = express()

const PORT = 3001

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.listen(3001, () => {
    console.log('Server is running');
}); 

app.post('/register', (req, res) => {

    const fullname = req.body.fullname
    const email = req.body.email
    const password = req.body.password
    const address1 = req.body.address1
    const address2 = req.body.address2
    const postcode = req.body.postcode
    const date = new Date()

    db.query("INSERT INTO Users (name, email, password, address1, address2, postcode, created_at) VALUES (?,?,?,?,?,?,?)", 
    [fullname, email, password, address1, address2, postcode, date],
    (err, result) => {
        console.log(err)
    })
})