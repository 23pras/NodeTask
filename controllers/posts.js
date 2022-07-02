const { responseHandler } = require('../middlewares/responseHandler');
const { 
    create,
    find,
    findOne,
    countDocuments,
    findOneAndUpdate,
    findOneAndDelete,
    aggregate
} = require('../dal/dal');
const model = require('../models/posts');

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

exports.search = async (req, res) => {
    try{
        const reqQuery = req.query;

        const filter = {};

        reqQuery.title ? filter['title'] = { $regex : reqQuery.title, $options : "i" } : null;
        reqQuery.description ? filter['description'] = { $regex : reqQuery.description, $options : "i" } : null;

        const query = [{
            $match : filter
        }, {
            $limit : parseInt(reqQuery.limit) || 10
        }];

        const data = await aggregate(model, query);
        responseHandler(data, res);
    } catch (err) {
        console.log(err);
        responseHandler(null, res, err.message, 500);
    }
};

exports.searchByTag = async (req, res) => {
    try{
        const reqQuery = req.query;
        const query = [{
            $lookup: {
                from: 'tags',
                localField: 'tags',
                foreignField: '_id',
                as: tags
            }
        }, {
            $unwind: {
                path: '$tags'
            }
        }, {
            $match: {
                'tags.name' : reqQuery.name
            }
        }];

        reqQuery.limit ? query.push({
            $limit: parseInt(reqQuery.limit)
        }) : null;

        const data = await aggregate(model, query);
        responseHandler(data, res);
    } catch (err) {
        console.log(err);
        responseHandler(null, res, err.message, 500);
    }
};