const express = require("express");
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/companyDB', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we're connected..");
});

const associateSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobileNumber: Number,
    privilege: String,
    username: String,
    password: String
});

const associate = mongoose.model('associate', associateSchema)



const app = express();
const port = 8000;

// EXPRESS SPECIFIC STUFF:
app.use('/static', express.static('static')); //For serving the static files
app.use(express.urlencoded());


// PUG SPECIFIC STUFF:
app.set('view engine', 'pug'); //Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); //Set the views directory


// ENDPOINTS
app.get('/', (req, res)=>{
    const cont = "Connect Keys website"
    const params = {
        'title': 'Connect Keys | Home',
        'content': cont,
    };
    res.status(200).render('home.pug', params);
})




app.get('/services', (req, res)=>{
    const cont = "Connect Keys website"
    const params = {
        'title': 'Connect Keys | Services',
        'content': cont,
    };
    res.status(200).render('services.pug', params);
})




app.get('/login', (req, res)=>{
    const cont = "Connect Keys website"
    const params = {
        'title': 'Connect Keys | Login',
        'content': cont,
    };
    res.status(200).render('login.pug', params);
})


app.get('/register-associates', (req, res)=>{
    const cont = "Connect Keys website"
    const params = {
        'title': 'Connect Keys | Register',
        'content': cont,
    };
    res.status(200).render('registerAssociates.pug', params);
})



app.get('/partner-dashboard', (req, res)=>{
    const cont = "Connect Keys website"
    const params = {
        'title': 'Connect Keys | Partner',
        'content': cont,
    };
    res.status(200).render('partnerLanding.pug', params);
})


app.get('/employee-dashboard', (req, res)=>{
    const cont = "Connect Keys website"
    const params = {
        'title': 'Connect Keys | Employee',
        'content': cont,
    };
    res.status(200).render('employeeLanding.pug', params);
})

app.get('/client-dashboard', (req, res)=>{
    const cont = "Connect Keys website"
    const params = {
        'title': 'Connect Keys | Client',
        'content': cont,
    };
    res.status(200).render('client.pug', params);
})


app.get('/client-register', (req, res)=>{
    const cont = "Connect Keys website"
    const params = {
        'title': 'Connect Keys | Register',
        'content': cont,
    };
    res.status(200).render('registerClient.pug', params);
})


app.get('/employee-employeeName', (req, res)=>{
    const cont = "Connect Keys website"
    const params = {
        'title': 'Connect Keys | employeeName',
        'content': cont,
    };
    res.status(200).render('employeeTasklist.pug', params);
})


app.get('/clients-list', (req, res)=>{
    const cont = "Connect Keys website"
    const params = {
        'title': 'Connect Keys | Clients-List',
        'content': cont,
    };
    res.status(200).render('clientList.pug', params);
})

app.get('/associates', (req, res)=>{
    const cont = "Connect Keys website"
    const params = {
        'title': 'Connect Keys | associates',
        'content': cont,
    };
    res.status(200).render('associateList.pug', params);
})



//Register route
app.post('/register-associates', async (req, res)=>{

    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const associateDetails = new associate({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobileNumber: req.body.mobileNumber,
            privilege: req.body.privilege,
            username: req.body.privilege,
            password: hashedPassword
        });

        console.log(associateDetails);

        associateDetails.save(function(err, associateDetails){
                if(err) return console.error(err);
                console.log("Details has been saved to database")
        });
        res.redirect('/register-associates');
    }catch{
        res.redirect('/register-associates');
    }

    
    
    // console.log(req.body);
    // const associateDetails = new associate(req.body);
    // associateDetails.save(function(err, associateDetails){
    //     if(err) return console.error(err);
    //     console.log("Details has been saved to database")
    // })
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started sucessfully at port: ${port}`);
})