const Tag = require('./model')

const index = async (req, res, next) => {
    try {
        const { skip = 0, limit = 10 } = req.query
        const tag = await Tag.find().skip(skip).limit(limit)
        return res.json(tag)
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
        let tag = new Tag(payload)
        await tag.save()
        return res.json(tag)
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

        let tag = await Tag.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true
        })
        return res.json(tag)
        
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
        const tag = await Tag.findByIdAndDelete(req.params.id)
        return res.json(tag)
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