const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../database/models/user')
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                const user = await User.findById(jwt_payload._id).select('_id')
                if (user) {
                    return done(null, user)
                }
                else {
                    return done(null, "invalidToken")
                    console.log("====INVALID TOKEN====")
                }
            }
            catch (error) {
                console.log("===ERROR IN AUTHENTICATION====")
            }
        }
        )
    )
};