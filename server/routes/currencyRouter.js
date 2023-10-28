const  Router = require('express')
const router = new Router();
const currencyController = require('../controller/currencyController')

router.get('/', currencyController.getAll);
router.get('/default', currencyController.getAll);
router.post('/getSpecial',currencyController.getSpecial);

module.exports = router;