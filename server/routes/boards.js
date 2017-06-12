const express = require("express");
const router = express.Router();


module.exports = (User, List, Card, Board, Boardmember, Cardmember, sequelize) => {
    //const h = helpers.registered;
    //post to boards/new
    router.post('/new', (req, res, next) => {
        //get board name

        const boardName = req.body.boardName;
        const userId = req.user.id;
        let board;
        //expect to get user info from req.user
        //Create a new board instance
        sequelize.transaction((t) => {
                return Board.create({
                        ownerId: userId,
                        name: boardName
                    }, {
                        transaction: t
                    })
                    .then(result => {
                        board = result;
                        return Boardmember.create({
                            memberId: userId,
                            boardId: board.id

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

    router.get('/', (req, res, next) => {
        console.log("trying to get boards data");
        //let boards;
        Board.findAll({
                include: [
                    {
                        model: Boardmember,
                        include: [{
                            model: User
                        }]
                    },
                    {
                        model: List,
                        include: [{
                            model: Card,
                            include: [{
                                model: Cardmember,
                                include: [{
                                    model: User
                                }]
                            }]
                        }]
                    }
                ]
            })
            .then((boards) => {
                console.log("boards", boards);
                res.status(200).json([...boards]);
            })
            .catch((error) => {
                //set error status and message
                console.log("error occurered when fetching data", error);
                res.json({
                    error
                });
            });
    });
    //add a boardmember
    router.post('/:boardId/users', (req, res, next) => {
        let boardId = req.body.boardId;
        let memberId = req.body.memberId;
        Boardmember.create({
                boardId: boardId,
                memberId: memberId
            })
            .then((boardmember) => {
                //Grab boardmember info and include associations
                return Boardmember.findOne({
                    where: {
                        boardId: boardmember.boardId,
                        memberId: boardmember.memberId
                    },
                    include: [{
                        model: User
                    }]
                });
            })
            .then((boardmember) => {
                console.log("created boardmember", boardmember);
                res.status(201).json({
                    boardmember
                });
            })
            .catch((err) => {
                res.status(500).end("creation failed", err);
            });
    });



    //delete a boardmember
    router.delete('/:boardId/users', (req, res, next) => {
        let boardId = req.body.boardId;
        let memberId = req.body.memberId;
        Boardmember.destroy({
                where: {
                    boardId: boardId,
                    memberId: memberId
                }
            })
            .then(() => {
                res.status(204).end();
            })
            .catch((err) => {
                res.status(500).end("deletion failed", err);
            });
    });

    //delete a board
    router.delete('/', (req, res, next) => {
        let boardId = req.body.boardId;
        Board.destroy({
                where: {
                    id: boardId
                },
                individualHooks: true
            })
            .then(() => {
                res.status(204).json({
                    boardId
                });
            });
    });

    return router;
};

