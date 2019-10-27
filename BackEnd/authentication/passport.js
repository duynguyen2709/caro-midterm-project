const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, cb) {

        return UserModel.getUser(username)
            .then(user => {
                if (!user) {
                    return cb(null, false, {
                        returnCode: -1,
                        message: 'Không tìm thấy người dùng ' + username
                    });
                }

                bcrypt.compare(password, user.password).then((res) => {
                    if (!res) {
                        return cb(null, false, {
                            returnCode: -2,
                            message: 'Sai mật khẩu'
                        });
                    }
                    return cb(null, user, {
                        returnCode: 1,
                        message: 'Đăng nhập thành công'
                    });
                });
            }).catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: '1612145'
    },
    function (jwtPayload, next) {
        next(null, jwtPayload.username);
    }
));

passport.use(new FacebookStrategy({
        clientID: '517742439047265',
        clientSecret: 'f892f01725ffc6d872fb2d221fac443f',
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'emails']
    },
    async function (accessToken, refreshToken, profile, cb) {
        try {
            if (profile.id) {
                UserModel.findByFacebookID(profile.id)
                    .then(user => {
                        if (!user) {
                            UserModel.findByEmail(profile.emails[0].value)
                                .then(user2 => {
                                    if (user2) {
                                        //update id mapping
                                        UserModel.updateFacebookID(user2.username, profile.id);
                                        return cb(null, user2);
                                    } else {
                                        const newUser = {};
                                        newUser.username = profile.id;
                                        newUser.password = profile.id;
                                        newUser.fullName = profile.displayName;
                                        newUser.email = profile.emails[0].value;
                                        newUser.facebookID = profile.id;
                                        newUser.googleID = '';

                                        UserModel.createUser(newUser)
                                            .then(() => {
                                                return cb(null, newUser)
                                            })
                                            .catch(err => cb(err));
                                    }
                                }).catch(err => cb(err));

                        } else {
                            return cb(null, user);
                        }
                    }).catch(err => cb(err));
            } else {
                return cb(null, false);
            }
        } catch (e) {
            console.error(e);
            return cb(e);
        }
    }));