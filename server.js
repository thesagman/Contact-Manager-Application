const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectdb = require('./config/dbConnection')
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT;
connectdb();

app.use(express.json())
// CONTACT -> GET,PUT,POST,DELETE APIs
app.use('/api/contacts', require('./routes/contact'))
// Login Routes
app.use('/api/users', require('./routes/user'))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on  Port ${port}`);
})