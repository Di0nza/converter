const express = require('express');
require("dotenv").config();
const cors = require('cors');
const app = express();
const connect = require('./db');
const router = require('./routes/index')

connect();
app.use(cors());
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT} successfully!`)
});