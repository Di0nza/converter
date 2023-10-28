const Router = require('express')
const router = new Router()
const currencyRouter = require('./currencyRouter')

router.use('/currency', currencyRouter)

module.exports = router