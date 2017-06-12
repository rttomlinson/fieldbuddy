const express = require("express");
const router = express.Router();


module.exports = (User, sequelize) => {

    //------------------------------
    //Users routes
    //------------------------------
    router.get('/', (req, res, next) => {
        User.findAll({})
            .then((users) => {
                //scrub the tokens
                //make token virtual or something
                res.status(200).json({
                    users
                });
            })
            .catch((error) => {
                //set error status and message
                console.log("error occurered when fetching data");
                res.json({
                    error
                });
            });
    });



    return router;
};


