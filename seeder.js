const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//Load
dotenv.config({ path: './config/config.env' });

const Bootcamp = require('./models/Bootcamp');

//Connect to db

const conn = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const bootcamp = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

//Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamp);
        console.log('Data imported...'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

//Delete Data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data deleted...'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
