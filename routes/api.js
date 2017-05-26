const express = require("express");
const router = express.Router();


module.exports = (User, List, Card, Board, Boardmember, sequelize) => {
    //const h = helpers.registered;
    //post to boards/new
    router.post('/boards/new', (req, res, next) => {
        //get board name

        const boardName = req.body.boardName;
        const userId = req.user.id;
        let board;
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
                //Grab user info and include associations
                return Board.findById(board.id, {
                    include: [{
                        model: List,
                        include: [{
                            model: Card
                        }]
                    }]
                });
            })
            .then((board) => {
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
        console.log("trying to get boards data");
        Board.findAll({
            include: [{
                model: List,
                include: [{
                    model: Card
                }]
            }]
        })
        .then((boards) => {
            //scrub the tokens
            //make token virtual or something
            console.log("got the boards data!");
            res.status(200).json([...boards]);
        })
        .catch((error) => {
            //set error status and message
            console.log("error occurered when fetching data");
            res.json({error});
        });
    });
    
    
    //--------------------------
    // lists
    //--------------------------
    
    router.post('/lists/new', (req, res, next) => {
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
                    })

            })
            .then((list) => {
                //Grab user info and include associations
                return List.findById(list.id, {
                    include: [{
                        model: Card
                    }]
                });
            })
            .then((list) => {
                console.log("expect the newly created list", list)
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
    
    router.get('/lists', (req, res, next) => {
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
            console.log("error occurered when fetching data");
            res.json({error});
        });
    });
    
    //--------------------------
    // lists
    //--------------------------
    
    router.post('/cards/new', (req, res, next) => {
        //get cards name

        const cardName = req.body.cardName;
        const listId = req.body.listId;
        console.log('cardName', cardName);
        console.log("listId", listId);
        //expect to get user info from req.user
        //Create a new board instance
        sequelize.transaction((t) => {
                return Card.create({
                        list_id: listId,
                        title: cardName
                    }, {
                        transaction: t
                    })

            })
            // .then((card) => {
            //     //Grab user info and include associations
            //     return Card.findById(card.id, {
            //         include: [{
            //             model: Card
            //         }]
            //     });
            // })
            .then((card) => {
                console.log("expect the newly created card", card)
                res.status(201).json({
                    card
                });
            })
            .catch((error) => {
                console.log("error", error);
                res.status(500).json({
                    error
                });
            });
    });
    
    router.get('/cards', (req, res, next) => {
        Card.findAll({
            // include: [{
            //     model: Activity
            // }]
        })
        .then((cards) => {
            res.status(200).json([...cards]);
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
