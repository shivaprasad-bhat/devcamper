const express = require('express');
const router = express.Router();
const {
    getBootCamp,
    getBootcamps,
    createBootCamp,
    updateBootCamp,
    deleteBootCamp,
    getBootcampInRadius,
} = require('../controller/bootcamp');

router.route('/').get(getBootcamps).post(createBootCamp);

router
    .route('/:id')
    .get(getBootCamp)
    .put(updateBootCamp)
    .delete(deleteBootCamp);

router.route('/radius/:zipcode/:distance').get(getBootcampInRadius);

module.exports = router;
