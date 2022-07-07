const Category = require('./model')

const index = async (req, res, next) => {
    try {
        const { skip = 0, limit = 10 } = req.query
        const category = await Category.find().skip(skip).limit(limit)
        return res.json(category)
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)
    }
}

const store = async (req, res, next) => {
    try {
        let payload = req.body
        let category = new Category(payload)
        await category.save()
        return res.json(category)
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        let payload = req.body
        const id = req.params.id

        let category = await Category.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true
        })
        return res.json(category)
        
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        return res.json(category)
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err)
    }
}

module.exports = { store, index, update, destroy }