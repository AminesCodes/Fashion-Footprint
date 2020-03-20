require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('./auth/passport');
const cors = require('cors');

const authRouter = require('./routes/auth');
const brandsRouter = require('./routes/brands');
const materialsRouter = require('./routes/materials');
const wishlistRouter = require('./routes/wishlist');
const factsRouter = require('./routes/facts');
const typesRouter = require('./routes/types');
const productsRouter = require('./routes/products');
const votesRouter = require('./routes/votes');

const { checkUserLogged } = require('./auth/helpers');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  }))
  
  app.use(passport.initialize())
  app.use(passport.session())



app.use('/api/auth', authRouter);
app.use('/api/brands', checkUserLogged, brandsRouter);
app.use('/api/materials', /*checkUserLogged,*/ materialsRouter);
app.use('/api/wishlist', checkUserLogged, wishlistRouter);
app.use('/api/facts', factsRouter);
app.use('/api/types', checkUserLogged, typesRouter);
app.use('/api/products', checkUserLogged, productsRouter);
app.use('/api/votes', checkUserLogged, votesRouter);


app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});

module.exports = app;
