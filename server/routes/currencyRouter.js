const  Router = require('express')
const router = new Router();
const currencyController = require('../controller/currencyController')

router.post('/',currencyController.getCurrencies);
router.get('/labels', currencyController.getLabels);

module.exports = router;