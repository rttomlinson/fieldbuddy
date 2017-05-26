const express = require("express");
const router = express.Router();


module.exports = (User, List, Board, Boardmember, sequelize) => {
    //const h = helpers.registered;
    //post to boards/new
    router.post('/boards/new', (req, res, next) => {
        //get board name

        const boardName = req.body.boardName;
        const userId = 1 || req.user.id;
        let board;
        console.log('boardName', boardName);
        console.log("userId", userId);
        //expect to get user info from req.user
        //Create a new board instance
        sequelize.transaction((t) => {
                return Board.create({
                        owner_id: userId,
                        name: boardName
                    }, {
                        transaction: t
                    })
                    .then(result => {
                        board = result;
                        return Boardmember.create({
                            member_id: userId,
                            board_id: board.id

                        }, {
                            transaction: t
                        });
                    });

                //Create a new boardmember with the user as a member and the board and the id
            })
            .then((success) => {
                res.status(201).json({
                    board
                });
            })
            .catch((error) => {
                console.log("error", error);
                res.status(500).json({
                    error
                });
            });
    });
    
    router.get('/boards', (req, res, next) => {
        Board.findAll({
            include: [{
                model: List
            }]
        })
        .then((boards) => {
            //scrub the tokens
            //make token virtual or something
            res.status(200).json([...boards]);
        })
        .catch((error) => {
            //set error status and message
            console.log("error occurered when fetching data");
            res.json({error});
        });
    });
    
    
    
    //------------------------------
    //Users routes
    //------------------------------
    router.get('/users', (req, res, next) => {
        User.findAll({})
        .then((users) => {
            //scrub the tokens
            //make token virtual or something
            res.status(200).json({users});
        })
        .catch((error) => {
            //set error status and message
            console.log("error occurered when fetching data");
            res.json({error});
        });
    });
    
    
    
    return router;
};
