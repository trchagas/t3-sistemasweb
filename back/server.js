const express = require('express')
const mongoose = require('mongoose')
const Review = require('./Review')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//routes
app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/reviews', async(req, res) => {
    try {
        const reviews = await Review.find({});
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/reviews', async(req, res) => {
    try {
        console.log(req.body)
        const review = await Review.create(req.body)
        res.status(200).json(review);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://admin:admin@cluster0.m8exd06.mongodb.net/episodecounter?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})