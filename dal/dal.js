exports.create = async (model, body) => {
    return await model.create(body);
};

exports.find = async (model, filter = {}, pagination = {}, sort = {}, projection = {}) => {
    return await model.find(filter, projection).sort(sort).skip(pagination.skip).limit(pagination.limit);
};

exports.findOne = async (model, filter, projection = {}) => {
    return await model.findOne(filter, projection);
};

exports.countDocuments = async (model, filter) => {
    return await model.countDocuments(filter);
};

exports.findOneAndUpdate = async (model, filter, body) => {
    return await model.findOneAndUpdate(filter, body, { new: true });
};

exports.findOneAndDelete = async (model, filter) => {
    return await model.findOneAndDelete(filter);
};

exports.aggregate = async (model, query) => {
    return await model.aggregate(query);
};