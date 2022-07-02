const { responseHandler } = require('../middlewares/responseHandler');
const { 
    create,
    find,
    findOne,
    findOneAndUpdate,
    findOneAndDelete
} = require('../dal/dal');
const model = require('../models/tags');

exports.createOne = async (req, res) => {
    try{
        const data = await create(model, value);
        responseHandler(data, res);
    } catch (err) {
        console.log(err);
        responseHandler(null, res, err.message, 500);
    }
};

exports.updateOne = async (req, res) => {
    try{
        const filter = { _id : req.params.id };
        const data = await findOneAndUpdate(model, filter, value);
        data ? responseHandler(data, res) : responseHandler(404, res, 'No post found!');
    } catch (err) {
        console.log(err);
        responseHandler(null, res, err.message, 500);
    }
};

exports.deleteOne = async (req, res) => {
    try{
        const filter = { _id : req.params.id };
        const data = await findOneAndDelete(model, filter);

        data ? responseHandler(data, res) : responseHandler(404, res, 'No post found!');
    } catch (err) {
        console.log(err);
        responseHandler(null, res, err.message, 500);
    }
};

exports.getOne = async (req, res) => {
    try{
        const filter = { _id : req.params.id };
        const data = await findOne(model, filter);

        data ? responseHandler(data, res) : responseHandler(404, res, 'No post found!');
    } catch (err) {
        console.log(err);
        responseHandler(null, res, err.message, 500);
    }
};

exports.getAll = async (req, res) => {
    try{
        const query = req.query;

        let pagination = { skip: 0, limit: 30 };
        if (query.pageNo > 0 && query.pageSize) {
            pagination.skip = (query.pageNo - 1) * query.pageSize;
            pagination.limit = query.pageSize;
        }

        const sort = {};
        query.sortBy ? sort[`${query.sortBy}`] = query.order ? query.order : 1 : null;

        const result = await find(model, {}, pagination, sort);
        const count = await countDocuments(model);

        responseHandler({ data: result, count: count }, res)
    } catch (err) {
        console.log(err);
        responseHandler(null, res, err.message, 500);
    }
};