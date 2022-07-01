const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes/routes');

const url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.0"
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});
database.once('connected', () => {
    console.log('Database Conneced');
});



const app = express();
app.use(express.json());
app.use('/api', routes)

const port = process.env.PORT || 8000;



app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})


