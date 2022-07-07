const router = require('express').Router()
const multer = require('multer')
const os = require('os')
const { police_check } = require('../../middlewares')

const { index, show, store, update, destroy } = require('./controller')

router.get('/products', index)
router.get('/products/:id', show)
router.post('/products', multer({dest: os.tmpdir()}).single('image'), police_check('create', 'Product'), store)
router.put('/products/:id', multer({dest: os.tmpdir()}).single('image'), police_check('update', 'Product'), update)
router.delete('/products/:id', police_check('delete', 'Product'),destroy)

module.exports = router