const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))

require("dotenv").config(); 

app
 .use('/static', express.static('static'))

 .set('view engine', 'ejs')
 .set('views', 'view')

 .get('/songList', song)

 .get('/', onhome)
 .get('/about', onabout)

 .listen(8000)

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















