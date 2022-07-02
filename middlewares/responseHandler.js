module.exports.responseHandler = (data, res, message, status) => {
    const statusCode = status || 200;
    res.status(statusCode).json({
        status: statusCode || 200,
        message: message || 'Success',
        data: data
    })
};