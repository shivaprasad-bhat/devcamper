const NodeGeoCoder = require('node-geocoder');
const options = {
    provider: 'mapquest',
    httpAdapter: 'https',
    apiKey: 'SztXFrdSt8lKjkVDjG50LWdDmYkjVHnB',
    formatter: null,
};

const geocoder = NodeGeoCoder(options);
module.exports = geocoder;
