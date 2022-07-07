const router = require('express').Router()

const { police_check } = require('../../middlewares')
const { index, store, update, destroy } = require('./controller')

router.get('/tags', index)
router.post('/tags', police_check('create', 'Tag'), store)
router.put('/tags/:id', police_check('update', 'Tag'), update)
router.delete('/tags/:id', police_check('delete', 'Tag'),  destroy)

module.exports = router