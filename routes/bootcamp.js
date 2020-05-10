const express = require('express');
const courseRouter = require('./courses');
const router = express.Router();
router.use('/:bootcampId/courses', courseRouter);
const {
    getBootCamp,
    getBootcamps,
    createBootCamp,
    updateBootCamp,
    deleteBootCamp,
    getBootcampInRadius,
} = require('../controller/bootcamp');

//Include other resources

router.route('/').get(getBootcamps).post(createBootCamp);

router
    .route('/:id')
    .get(getBootCamp)
    .put(updateBootCamp)
    .delete(deleteBootCamp);

router.route('/radius/:zipcode/:distance').get(getBootcampInRadius);

module.exports = router;
