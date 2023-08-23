const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const PORT = 5050;
const path = require("path")

require('dotenv').config();

// require delle routes
const postsRoute = require('./routes/post')
const authorRoute = require('./routes/author')
const resourcesRoute = require('./routes/resources')
const loginRoute = require('./routes/login');
// const veryFileToken = require("./middlewares/veryFileToken");
const githubRoute = require("./routes/ghithubRoute")


const app = express();





// middleware
app.use(express.json());
app.use(cors());
// app.use(logger());
app.use('./uploads', express.static('uploads'))





//import delle routes
app.use("/", postsRoute);
app.use("/", authorRoute);
app.use("/", resourcesRoute);
app.use("/", loginRoute);
app.use("/", githubRoute);




mongoose.connect(process.env.MONGO_DB_URL);



app

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Errore di connessione al server!'))
db.once('open', () => {
    console.log('Database MondoDB connesso!');
})



// ultima riga
app.listen(PORT, () =>
    console.log(`Server avviato ed in ascolto sulla PORTA ${PORT}`)
);