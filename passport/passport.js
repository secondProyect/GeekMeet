const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');


passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use('local-login', new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

passport.use('local-signup', new LocalStrategy(
  { passReqToCallback: true },
  (req, username, password, next) => {
    // To avoid race conditions
    process.nextTick(() => {
        User.findOne({
            'username': username
        }, (err, user) => {
            if (err){ return next(err); }

            if (user) {
                return next(null, false);
            } else {
                // Destructure the body
                const {
                  username,
                  password,
                  email,
                  city
                } = req.body;
                const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                const newUser = new User({
                  username,
                  password: hashPass,
                  email,
                  city
                });

                newUser.save((err) => {
                    if (err){ next(null, false, { message: newUser.errors });}
                    return next(null, newUser);
                });
            }
        });
    });
}));


module.exports = (app) =>{
  app.use(passport.initialize());
  app.use(passport.session());
};
