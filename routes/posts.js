const router = require('express').Router();
const { 
    createOne,
    updateOne,
    deleteOne,
    getOne, 
    getAll,
    search,
    searchByTag
} = require('../controllers/posts');

router.route('/')
    .post(createOne)
    .get(getAll);

router.route('/search').get(search);
router.route('/searchByTag').get(searchByTag);

router.route('/:id')
    .put(updateOne)
    .delete(deleteOne)
    .get(getOne);

module.exports = router;