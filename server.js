const express = require('express');
const dotenv = require('dotenv');
const bootcamp = require('./routes/bootcamp');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
//load env vars
dotenv.config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
connectDB();
//Mount route
app.use('/api/v1/bootcamp', bootcamp);

const server = app.listen(
    PORT,
    console.log(`Server running on ${process.env.NODE_ENV} mode`.green.bold)
);

//Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close server
    server.close(() => process.exit(1));
});
