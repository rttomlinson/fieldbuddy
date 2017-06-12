const express = require("express");
const router = express.Router();


module.exports = (User, List, Card, Board, Boardmember, Cardmember, sequelize) => {

    //--------------------------
    // lists
    //--------------------------

    router.post('/new', (req, res, next) => {
        //get board name

        const listName = req.body.listName;
        const boardId = req.body.boardId;
        console.log('listName', listName);
        console.log("boardId", boardId);
        //expect to get user info from req.user
        //Create a new board instance
        sequelize.transaction((t) => {
                return List.create({
                    board_id: boardId,
                    name: listName
                }, {
                    transaction: t
                });

            })
            .then((list) => {
                //Grab user info and include associations
                return List.findById(list.id, {
                    include: [{
                        model: Card,
                        include: [{
                            model: Cardmember,
                            include: [{
                                model: User
                            }]
                        }]
                        
                    }]
                });
            })
            .then((list) => {
                //expect the newly created list
                res.status(201).json({
                    list
                });
            })
            .catch((error) => {
                console.log("error", error);
                res.status(500).json({
                    error
                });
            });
    });

    router.get('/', (req, res, next) => {
        List.findAll({
                include: [{
                    model: Card
                }]
            })
            .then((lists) => {
                res.status(200).json([...lists]);
            })
            .catch((error) => {
                //set error status and message
                console.log("error occurred when fetching data");
                res.json({
                    error
                });
            });
    });

    return router;
};

