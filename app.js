require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const APIRoute = require('./routes/APIRoute')


const app = express();
app.use(bodyParser.json()); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/', APIRoute)

