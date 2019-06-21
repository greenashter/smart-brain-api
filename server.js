const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');


const register = require('./controllers/register');
const sign_in = require('./controllers/sign_in');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });

// db.select('*').from('users').then(data => console.log(data));

const app = express();

app.use(bodyParser.json(), cors());

app.get('/', (req,res) => {
    db.select('*').from('users')
    .then(users => res.json(users));
})

app.post('/sign_in', sign_in.handleSignIn(db, bcrypt))

app.post('/register', (req, res) => {register.handleRegister(req ,res, db, bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req,res) => {image.handleImage(req, res, db)});
app.post('/image_url', (req,res) => {image.handleClarifaiCall(req, res)});

app.listen(3000, () => {
    console.log('server is running');
});




/*
/ -> res = this is working
/signin -> POST = success/fail
/register -> POST = user
/profile/:id -> GET = user
/image -> PUT = user
*/