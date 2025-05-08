const express = require('express')
const app = express()
app.use(express.urlencoded({ extended:true}))

app
    .set('view engine', 'ejs')
    .set('views', 'view')

function movie(req, res, next){
    let movie = {
        title:'The Shawshank Redemption',
        description: 'Andy Dufresne is young and'
    }
    res.render('detail.ejs', {data: movie})
}

app
    .use('/static', express.static('static'))
    .get('/', onhome)
    .listen(8000)



function onhome(req, res ){
    res.send(
    "<img src='static/images/coverfoto13.jpg'></img>"

    )
}

app.get('/login', movie)
function onlogin(req,res){
    res.send("<img src='static/images/1.jpg'></img>")
}


app.get('/form', loginForm);
app.post("/form", verwerkForm);

function verwerkForm(req, res){
    console.log("body: ", req.body);
}

function loginForm(req, res){
    res.render('form.ejs')
}



async function fetchData() {
    const response = await fetch(
      "https://www.amiiboapi.com/api/amiibo/?gameseries=Super%20Mario"
    );
    const data = await response.json();
    const ulElement = document.querySelector("ul")
    
    
    data.amiibo.forEach ((amiibo) => {
      const liElement = document.createElement("li")
      liElement.textContent = amiibo.character
      ulElement.appendChild(liElement)
      
      const imgElement = document.createElement("img")
      console.log(imgElement)
      imgElement.src = amiibo.image
      imgElement.alt = amiibo.character
      liElement.appendChild(imgElement)
    
      ulElement.appendChild(imgElement)
    })
    
    
   
  
  }
  
  fetchData();