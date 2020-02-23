
const express = require('express');
const router = express.Router();

const usersQueries = require('../queries/users');
const passport = require('../auth/passport');
const { checkUserLogged, hashPassword } = require('../auth/helpers');


router.post("/login", passport.authenticate('local'), (request, response) => {
    const user = request.user
    response.json({
        err: false,
        message: 'Successfully logged user',
        payload: user,
    })
})


const signupUser = async (request, response, next) => {
    const { username, firstname, lastname, password, email, ageCheck } = request.body
    if (!username || !firstname || !lastname || !password || !email || !ageCheck || ageCheck !== 'true') {
        response.status(400)
            response.json({
                status: 'fail',
                message: 'Missing Information, all fields are required',
                payload: null,
            })
    } else {
        try {
            // request.body.password = await hashPassword(request.body.password)
            const newUser = await usersQueries.createUser(request.body)
            next()

        } catch (err) {
            // Username/email already taken 
            if (err.code === "23505" && err.detail.includes("already exists")) {
                console.log('Attempt to register a new user with a taken email/username')
                response.status(403)
                response.json({
                    status: 'fail',
                    message: 'Username already taken AND/OR email address already registered',
                    payload: null,
                })
            } else {
                sendError(response, err)
            }
        }
    }
}
 
router.post('/signup', signupUser, passport.authenticate('local'), (request, response) => {
    const user = request.user
    delete user.user_password
    response.status(201)
    response.json({
        status: 'success',
        message: 'Successfully signed up',
        payload: user,
    })
})


module.exports = router;