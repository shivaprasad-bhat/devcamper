const Courses = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

/**
 * @description Get all courses
 * @route       GET    /api/v1/courses
 * @route       GET    /api/v1/courses/bootcamp/:bootCampId/courses
 * @access      Public
 */
exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;
    if (req.params.bootcampId) {
        query = Courses.find({ bootcamp: req.params.bootcampId });
    } else {
        query = Courses.find();
    }

    const courses = await query;

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses,
    });
});
