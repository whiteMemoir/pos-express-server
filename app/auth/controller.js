const User = require('../user/model')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const {secretKey} = require('../config')
const { getToken } = require('../../utils')

const register = async (req, res, next) => {
    try {
        const payload = req.body
        const user = new User(payload)
        await user.save()
        return res.json(user)
    } catch (err) {
        // cek kemungkinan kesalahan terkait validasi
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

//middleware untuk 
const localStrategy = async (email, password, done) => {
    try{
        let user = await User.findOne({email}).select('-__v -createdAt -updatedAt -cart_items -token')

        if (!user) return done()
        if (bcrypt.compareSync(password, user.password)) {
            ( {password, ...userWithoutPassword}  = user.toJSON() )
            return done(null, userWithoutPassword)
        }
    } catch (err) {
        done(err, null)
    }
    done()
}

const login = async (req, res, next) => {
    passport.authenticate('local', async function(err, user) {
        if(err) return next(err)

        if(!user) return res.json({error: 1, message: 'Email or Password incorrect!'})

        const signed = jwt.sign(user, secretKey)

        await User.findByIdAndUpdate(user._id, {$push: {token: signed}})

        res.json({
            message: 'Login successfully!',
            user,
            token: signed
        })
    })(req, res, next)
}

const logout = async (req, res, next) => {
    let token = getToken(req)

    let user = await User.findOneAndUpdate({ token: { $in: [token] } }, {$pull: {token: token}}, {useFindAndModify: false})

    if(!token || !user){
        res.json({
            error: 1,
            message: 'No user found!'
        })
    }

    return res.json({
            error: 0,
            message: 'Logout successfully!!'
    })
}

const me = (req, res, next) => {
    if(!req.user){
        res.json({
            error: 1,
            message: `You are not login or token expired`
        })
    }

    return res.json(req.user)
}

module.exports = { register, localStrategy, login, logout, me }