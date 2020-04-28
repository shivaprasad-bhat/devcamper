/**
 * @description Get all bootcamp
 * @route       GET    /api/v1/bootcamp
 * @access      Public
 */
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({
        data: {
            success: true,
            message: 'Show All Bootcamps',
        },
    });
};

/**
 * @description Get a bootcamp
 * @route       Get    /api/v1/bootcamp/:id
 * @access      Public
 */
exports.getBootCamp = (req, res, next) => {
    res.status(200).json({
        data: {
            success: true,
            message: `Get bootcamp wit id ${req.params.id}`,
        },
    });
};

/**
 * @description Cretate a bootcamp
 * @route       POST    /api/v1/bootcamp
 * @access      Privare
 */
exports.createBootCamp = (req, res, next) => {
    res.status(200).json({
        data: {
            success: true,
            message: 'Created New Bootcamps',
        },
    });
};

/**
 * @description Update a bootcamp
 * @route       PUT    /api/v1/bootcamp/:id
 * @access      Private
 */
exports.updateBootCamp = (req, res, next) => {
    res.status(200).json({
        data: {
            success: true,
            message: `Updated bootcamp with id ${req.params.id}`,
        },
    });
};

/**
 * @description Delete a bootcamp
 * @route       DELETE    /api/v1/bootcamp/:id
 * @access      Private
 */
exports.deleteBootCamp = (req, res, next) => {
    res.status(200).json({
        data: {
            success: true,
            message: `Deleted bootcamp with id ${req.params.id}`,
        },
    });
};
