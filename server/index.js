const express = require('express');
const db = require('./config/db');
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10 

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require ('cookie-session')

const app = express();

const PORT = 3001

app.use(
    cors({
        origin: "https://easy-eats.onrender.com",
        methods: ["GET","POST","PUT"],
        credentials: true
    })
);

app.use('/', express.static('./build'));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "fhfhfhfjkjdkfkjdkfkdkfoinewoinvewinviewnviewinv",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24
    }
})
)

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
    const country = req.body.country
    const date = new Date()

    bcrypt.hash(password,saltRounds, (err, hash) => {

        db.query("INSERT INTO Users (name, email, password, address1, address2, postcode, country, created_at) VALUES (?,?,?,?,?,?,?)", 
        [fullname, email, hash, address1, address2, postcode, country, date],
        (err, result) => {
            console.log(err)
        }
      );
    })
   
})

app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false})
    }
});

app.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    db.query(
        "SELECT * FROM Users WHERE email = ?;",
        email,
        (err, result) => {
            if (err) {
                res.send({err: err})
            } 

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response ) {
                        req.session.user = result
                        console.log(req.session.user)
                        res.send(result)
                    }else{
                        res.send({message: "Incorrect usename/password"})
                    }
                })
            } else {
                res.send({message: "User doesn't exist"})
            }
        }
        
    )
})

app.get('/userDetails/:userId', (req, res) => {

    const id = req.params.userId

    // console.log(`This is the value of ${id}`);

    db.query(
        "SELECT * FROM Users WHERE id = ?", id ,(err, result) => {
            if(err){
                console.log(err);
            }

            res.send(result);
        }
    )
})


app.put('/updateUserDetails/:userId', (req, res) => {

    const id = req.params.userId
    const fullname = req.body.fullname
    const address1 = req.body.address1
    const address2 = req.body.address2
    const postcode = req.body.postcode
    const email = req.body.email

    db.query(
        "UPDATE Users SET name = ?, email = ?, address1 = ?, address2= ?, postcode = ? WHERE id = ?",
        [fullname, email, address1, address2, postcode, id],
    )
})
