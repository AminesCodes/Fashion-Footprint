
const express = require('express');
const router = express.Router();

const userQueries = require('../queries/users');
const brandQueries = require('../queries/brands');
const passport = require('../auth/passport');
const { checkUserLogged, hashPassword } = require('../auth/helpers');
const { checkValidId, checkValidParams, handleErrors } = require('./helpers/helpers');


router.post('/:userType/login', passport.authenticate('local'), (request, response) => {
    response.json({
        error: false,
        message: 'Successfully logged user',
        payload: request.user,
    })
})


const signupUser = async (request, response, next) => {
    const { email, password, firstName, lastName, name, businessID, termsAgree } = request.body
    if (checkValidParams(response, email) 
        && checkValidParams(response, password)) {
        try {
            const hashedPassword = await hashPassword(password);
            const userType = request.params.userType;
            
            if (userType === 'brands' 
                && checkValidParams(response, name) 
                && checkValidParams(response, businessID)) {
                    await brandQueries.createBrand(email.toLowerCase(), hashedPassword, name, businessID);
                    next();
            } else if (userType === 'users' 
                && checkValidParams(response, termsAgree) 
                && checkValidParams(response, firstName) 
                && checkValidParams(response, lastName)) {
                    await userQueries.createUser(email.toLowerCase(), hashedPassword, firstName, lastName);
                    next();
            }

        } catch (err) {
            handleErrors(response, err)
        }
    }
}
 
router.post('/:userType/signup', signupUser, passport.authenticate('local'), (request, response) => {
    response.status(201)
    response.json({
        error: false,
        message: 'Successfully signed up',
        payload: request.user
    })
})


const updateInfo = async(request, response, next) => {
    const { email, password, firstName, lastName, name, businessID } = request.body
    const targetId = request.params.id
    
    if (parseInt(targetId) === request.user.id && checkValidParams(response, email) && checkValidParams(response, password)) {
        try {
            const userType = request.params.userType;

            if (userType === 'brands' && checkValidParams(response, name) && checkValidParams(response, businessID)) {
                await brandQueries.updateBrandInfo(targetId, email.toLowerCase(), name, businessID);
            } else if (userType === 'users' && checkValidParams(response, firstName) && checkValidParams(response, lastName)) {
                await userQueries.updateUserInfo(targetId, email.toLowerCase(), firstName, lastName);
            }
            console.log('Went well')
            next()

        } catch (err) {
            handleErrors(response, err)
        }
    }
}

router.put('/:userType/:id', checkUserLogged, updateInfo, passport.authenticate('local'), (request, response) => {
    response.json({
        error: false,
        message: 'Successfully updated user/brand info',
        payload: request.user
    })
})


const updatePassword = async(request, response, next) => {
    let { newPassword, confirmPassword } = request.body
    const targetId = request.params.id
    if (parseInt(targetId) === request.user.id
        && checkValidParams(response, newPassword) 
        && checkValidParams(response, confirmPassword)
        && newPassword === confirmPassword) {
        try {
            const hashedPassword = await hashPassword(newPassword);
            const userType = request.params.userType;

            if (userType === 'brands') {
                await brandQueries.updateBrandPassword(targetId, hashedPassword);
            } else if (userType === 'users') {
                await userQueries.updateUserPassword(targetId, hashedPassword);
            }
            request.body.password = newPassword;
            next()

        } catch (err) {
            handleErrors(response, err)
        }
    }
}

router.patch('/:userType/:id', checkUserLogged, updatePassword, (request, response) => {
    response.json({
        error: false,
        message: 'Successfully updated password',
        payload: request.user
    })
})


const deleteAccount = async(request, response, next) => {
    const targetId = request.params.id;
    if (parseInt(targetId) === request.user.id) {
        try {
            const userType = request.params.userType;

            if (userType === 'brands') {
                await brandQueries.deleteBrand(targetId);
                next();
            } else if (userType === 'users') {
                await userQueries.deleteUser(targetId);
                next();
            }

        } catch (err) {
            handleErrors(response, err)
        }
    }
}

router.delete('/:userType/:id', checkUserLogged, deleteAccount, (request, response) => {
    request.logOut();
    response.json({
        error: false,
        message: 'Successfully deleted user/brand',
        payload: null
    })
})


router.get('/logout', checkUserLogged, (request, response) => {
    request.logOut();
    response.json({
        error: false,
        message: 'User logged out successfully',
        payload: null,
    });
})


router.get('/isUserLoggedIn', checkUserLogged, (request, response) => {
    response.json({
        error: false,
        message: 'User is logged in. Session active',
        payload: request.user,
    })
})


module.exports = router;