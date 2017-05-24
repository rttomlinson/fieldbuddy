//try to auth by bearer
//try to auth by username as password
module.exports = (User, passport, app, sequelize) => {

    //start passport service and session
    app.use(passport.initialize());

    //if trying to access api path, check for token
    //consider moving to JWT for auth
    app.use('/api', function(req, res, next) {
        let token = req.query.token || req.body.token;
        console.log("grabbing token", token);
        if (!token) {
            res.status(401).json({
                error: "Unauthorized"
            });
            return;
        }
        User.findByToken(token)
            .then((user) => {
                if (!user) {
                    //custom error page or flash message
                    return next(new Error("No user by that token"));
                }
                req.user = user;
                next();
            });

    });


    let newSessionStrat = passport.authenticate("local", {
        session: false
    });
    // ----------------------------------------
    // Login Handler
    // ----------------------------------------
    app.post('auth/login', newSessionStrat, (req, res, next) => {
        res.json(req.user);
    });

};
