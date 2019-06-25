require('dotenv').config();
const express = require('express');
const session = require('express-session');
// const bcrypt = require('bcryptjs');
const massive = require('massive');

// Controllers
const authCtrl = require('./controllers/authController');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express();

app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
    }
}))


massive(CONNECTION_STRING).then(database => {
    app.set('db', database);
    console.log('Database connected');
    app.listen(SERVER_PORT, () => {
        console.log(`Listening on port: ${SERVER_PORT}`);
    })
})

app.post('/auth/register', authCtrl.register);
