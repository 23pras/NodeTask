const router = require('express').Router();
const { 
    createOne,
    updateOne,
    deleteOne,
    getOne, 
    getAll
} = require('../controllers/tags');

router.route('/')
    .post(createOne)
    .get(getAll);

router.route('/:id')
    .put(updateOne)
    .delete(deleteOne)
    .get(getOne);

module.exports = router;