const express = require('express')
const app = express()
const xss = require ('xss')
const html = xss('<script>alert("xss");</script>');
console.log(html);
const bcrypt = require('bcryptjs');



app.use(express.urlencoded({ extended: true }))

require("dotenv").config(); 

app
 .use('/static', express.static('static'))

 .set('view engine', 'ejs')
 .set('views', 'view')

 .get('/songList', song)
 .get('/', onhome)
 .get('/about', onabout)
 .get('/formulier', toonformulier)

 .listen(8000)

app
.post('/form', verwerkformulier)

function toonformulier(req, res){
    res.render('form.ejs')
}
function verwerkformulier(req, res) {
    
    db.collection('users')
    .insertOne(req.body)
    res.send('test')
    console.log(req.body)
}

function onhome(req, res) {
    res.send('<h1>Hello World!</h1> <img src="/static/images/snoopy.jpg" alt="Poster" width="50%"/>')
}

function onabout(req, res) {
    res.send(`<h1>About me!</h1> <img src="/static/images/postermockup.png" alt="Poster" width="50%"/>`)
}


function song(req, res, ) {
    let song = {
        title: 'FAMJAM400',
        description: 'You watched me grow up from a...'
    }
    
    res.render('detail.ejs', {data: song})
}

// Password hashing and salting with bcrypt
async function hashData(data){
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedData = await bcrypt.hash(data, salt)
    return hashedData
  }
  catch(error) {
    console.log("Error hashing password: ", error)
  }
}

// Compare given and stored data
async function compareData(plainTextData, hashedData) {
  try {
      // Compare the plain text data with the hashed data
      const match = await bcrypt.compare(plainTextData, hashedData);
      return match;
  } catch (error) {
      console.error('Error comparing data:', error);
      throw error;
  }
}


const { MongoClient, ObjectId } = require("mongodb");

// Mongo configuratie uit .env bestand 
const uri = process.env.URI;

// nieuwe MongoDB client 
const client = new MongoClient(uri);
const db = client.db(process.env.DB_NAME);
const collection = process.env.USER_COLLECTION;


async function connectDB() {
    try {
        await client.connect()
        console.log("Client connected to database");
    }
    catch (error) {
        console.log(error);
    }
}

connectDB(); 















