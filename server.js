const express = require('express')
const app = express()
const { MongoClient, ObjectId } = require("mongodb");
app.use(express.urlencoded({ extended: true }))

require("dotenv").config(); 

app
 .use('/static', express.static('static'))

 .set('view engine', 'ejs')
 .set('views', 'views')

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

connectDB()

app.get('/create-test-profile', async (req, res) => {
    try {
        const userCollection = db.collection(collection);
        const result = await userCollection.insertOne({
            location: "Amsterdam",
            tags: ["museum", "wandelen"],
            gender: "vrouw"
        });
        res.send(`✅ Testprofiel aangemaakt! ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("❌ Er ging iets mis bij het aanmaken van een testprofiel.");
    }
});

app.get('/profile/:id', async (req, res) => {
    const userCollection = db.collection(collection);
    const profile = await userCollection.findOne({ _id: new ObjectId(req.params.id) });
    const editing = req.query.edit === 'true';
    res.render('profile', { profile, editing });
});

app.post('/profile/:id', async (req, res) => {
    const userCollection = db.collection(collection);
    const { name, location, tags, languages, bio } = req.body;

    await userCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        {
            $set: {
                name,
                location,
                bio,
                tags: tags.split(',').map(s => s.trim()),
                languages: languages.split(',').map(s => s.trim())
            }
        }
    );
    res.redirect(`/profile/${req.params.id}`);
});



















