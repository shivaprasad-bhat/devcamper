const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geoCoder');

/**
 * @description Get all bootcamp
 * @route       GET    /api/v1/bootcamp
 * @access      Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    let query;
    //Copy request query
    let reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];

    //Loop over removeFields
    removeFields.forEach((param) => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    );

    query = Bootcamp.find(JSON.parse(queryStr));
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIdex = page * limit;
    const total = await Bootcamp.countDocuments();

    query = query.skip(startIndex).limit(limit);
    const bootcamps = await query;

    //Pagination Results
    pagination = {};
    if (endIdex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        pagination,
        data: bootcamps,
    });
});

/**
 * @description Get a bootcamp
 * @route       Get    /api/v1/bootcamp/:id
 * @access      Public
 */
exports.getBootCamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `Bootcamp with id ${req.params.id} not found`,
                404
            )
        );
    }
    res.status(200).json({
        success: true,
        data: bootcamp,
    });
});

/**
 * @description Cretate a bootcamp
 * @route       POST    /api/v1/bootcamp
 * @access      Privare
 */
exports.createBootCamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
        success: true,
        data: bootcamp,
    });
});

/**
 * @description Update a bootcamp
 * @route       PUT    /api/v1/bootcamp/:id
 * @access      Private
 */
exports.updateBootCamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `Bootcamp with id ${req.params.id} not found`,
                404
            )
        );
    }
    res.status(200).json({
        success: true,
        data: bootcamp,
    });
});

/**
 * @description Delete a bootcamp
 * @route       DELETE    /api/v1/bootcamp/:id
 * @access      Private
 */
exports.deleteBootCamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `Bootcamp with id ${req.params.id} not found`,
                404
            )
        );
    }
    res.status(200).json({
        success: true,
        data: bootcamp,
    });
});

/**
 * @description Get a bootcamp within a radius
 * @route       GET    /api/v1/bootcamp/radius/:zipcode/:distance
 * @access      Public
 */
exports.getBootcampInRadius = asyncHandler(async (req, res, next) => {
    const { zipcode, distance } = req.params;
    //Get the lattitude and longitude from geocode
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //Calculate radius using radians
    //Devide distance by radius of earth
    //Earth Radius = 3,963 mi / 6,357 km
    const radius = distance / 3963;
    const bootcamps = await Bootcamp.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius],
            },
        },
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps,
    });
});
