const express = require('express');
const router = express.Router();
const {
    getBootCamp,
    getBootcamps,
    createBootCamp,
    updateBootCamp,
    deleteBootCamp,
} = require('../controller/bootcamp');

router.route('/').get(getBootcamps).post(createBootCamp);

router
    .route('/:id')
    .get(getBootCamp)
    .put(updateBootCamp)
    .delete(deleteBootCamp);

module.exports = router;
