const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();

app.use(express.json());  
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(authRoutes);



mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server started at Port ", process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err);
    })