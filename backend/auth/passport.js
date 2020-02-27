const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparePasswords } = require('./helpers');
const usersQueries = require('../queries/users');
const brandQueries = require('../queries/brands');

passport.use(new LocalStrategy({usernameField: 'email', passwordField : 'password', passReqToCallback: true}, 
  async (request, username, password, done) => {

    let user = null;
    console.log(request.params.userType, username.toLowerCase())
  try {
    if (request.params.userType === 'brands') {
      user = await brandQueries.getBrandByEmail(username.toLowerCase());
    } else {
      user = await usersQueries.getUserByEmail(username.toLowerCase());
    }
    if (!user) { // user not found in the database
      console.log('user not found in the database');
      return done(null, false, {message: 'User not found'});
    }

    const passMatch = await comparePasswords(password, user.password);
    if (!passMatch) { // user found but passwords don't match
    console.log('password not matching');
      return done(null, false, {message: 'Incorrect password'});
    }

    delete user.password; 
    done(null, user);

  } catch (err) {
    done(err);
  }
}))

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser(async (user, done) => {
  try {
    if (user.business_id) {
      let retrievedBrand = await brandQueries.getBrandByEmail(user.email);
      delete retrievedBrand.password;
      done(null, retrievedBrand);
    } else {
      let retrievedUser = await usersQueries.getUserByEmail(user.email);
      delete retrievedUser.password;
      done(null, retrievedUser);
    }
  } catch (err) {
    done(err, false);
  }
})

module.exports = passport;