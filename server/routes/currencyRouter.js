const  Router = require('express')
const router = new Router();
const currencyController = require('../controller/currencyController')

router.post('/default', currencyController.getAll);
router.post('/getSpecial',currencyController.getSpecial);
router.get('/labels', currencyController.getLabels);

module.exports = router;