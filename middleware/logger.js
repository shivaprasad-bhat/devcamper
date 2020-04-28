/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description Logger Function
 */
const logger = (req, res, next) => {
    console.log(
        `${req.method} ${req.protocol}://${req.get('host')} ${req.originalUrl}`
    );
    next();
};

module.exports = logger;
