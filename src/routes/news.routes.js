const {Router} = require('express');
const router = Router();

const {getNews, getNewsById} = require('../controllers/news.controller');

router.get('/', getNews);

router.get('/:id', getNewsById);

module.exports = router;
