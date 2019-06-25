require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

// CONTROLLERS
const authCtrl = require('./controllers/authController');
const treasureCtrl = require('./controllers/treasureController');

// MIDDLEWARE
const auth = require('./middleware/authMiddleware');

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

// AUTH ENDPOINTS
app.post('/auth/register', authCtrl.register); // REGISTERS A USER
app.post('/auth/login', authCtrl.login); // LOGS IN A USER
app.get('/auth/logout', authCtrl.logout); // LOGS OUT A USER

// TREASURE ENDPOINTS
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure); // GETS DRAGON TREASURE
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure); // GETS USER TREASURE
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure); // ADDS USER TREASURE
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure); // GETS ALL TREASURE