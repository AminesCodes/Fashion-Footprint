const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparePasswords } = require('./helpers');
const usersQueries = require('../queries/users');

passport.use(new LocalStrategy({usernameField: 'email', passwordField : 'password', passReqToCallback: true}, 
  async (req, username, password, done) => {
  
    let user = null,
  try {
    if (req.userType === 'brand') {
      user = await usersQueries.getBrandByEmail(username);
    } else {
      user = await usersQueries.getUserByEmail(username);
    }
    if (!user) { // user not found in the database
      console.log('user not found in the database')
      return done(null, false)
    }

    const passMatch = await comparePasswords(password, user.user_password);
    if (!passMatch) { // user found but passwords don't match
      return done(null, false)
    }

    delete user.password; 
    done(null, user);

  } catch (err) {
    done(err)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (user, done) => {
  try {
    let retrievedUser = await usersQueries.getUserByEmail(user.email)
    delete retrievedUser.password;
    done(null, retrievedUser)
  } catch (err) {
    done(err, false)
  }
})

module.exports = passport;