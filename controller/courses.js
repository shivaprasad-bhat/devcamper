const Courses = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
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
        query = Courses.find().populate({
            path: 'bootcamp',
            select: 'name description',
        });
    }

    const courses = await query;

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses,
    });
});

/**
 * @description Get single courses
 * @route       GET    /api/v1/courses/:id
 * @access      Public
 */
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Courses.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description',
    });

    if (!course) {
        return next(
            new ErrorResponse(`No course with id ${req.params.id}`),
            404
        );
    }
    res.status(200).json({
        success: true,
        count: course.length,
        data: course,
    });
});

/**
 * @description Add a single course
 * @route       POST /api/v1/bootcamp/:bootcampId/courses
 * @access      Private
 */
exports.addCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if (!bootcamp) {
        return next(
            new ErrorResponse(`No bootcamp with id ${req.params.bootcampId}`),
            404
        );
    }

    const course = await Courses.create(req.body);
    res.status(200).json({
        success: true,
        data: course,
    });
});

/**
 * @description Update a  course
 * @route       PUT /api/v1/courses/:id
 * @access      Private
 */
exports.updateCourse = asyncHandler(async (req, res, next) => {
    let course = await Courses.findById(req.params.id);
    if (!course) {
        return next(
            new ErrorResponse(`No course with id ${req.params.id}`),
            404
        );
    }
    course = await Courses.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        success: true,
        data: course,
    });
});

/**
 * @description Delete a  course
 * @route       delete /api/v1/courses/:id
 * @access      Private
 */
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const course = await Courses.findById(req.params.id);
    if (!course) {
        return next(
            new ErrorResponse(`No course with id ${req.params.id}`),
            404
        );
    }
    await course.remove();
    res.status(200).json({
        success: true,
        data: {},
    });
});
