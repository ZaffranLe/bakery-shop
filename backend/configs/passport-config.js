var LocalStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(
        "local",
        new LocalStrategy(
            { usernameField: "username", passReqToCallback: true, passwordField: "password" },
            function (req, done) {
                console.log("Called");
                const user = {
                    userId: req.body.userId,
                };
                return done(null, user);
            }
        )
    );
};
