const express = require("express");
const router = express.Router();


module.exports = (User, List, Card, Board, Boardmember, Cardmember, sequelize) => {

    //--------------------------
    // cards
    //--------------------------
    router.put('/:cardId', (req, res, next) => {
        let {
            cardId
        } = req.params;
        let restOfFields = Object.assign({}, req.body);
        delete restOfFields.cardId;

        let updateFields = Object.keys(restOfFields);
        let fieldsToUpdate = {};
        updateFields.forEach((field) => {
            fieldsToUpdate[field] = restOfFields[field];
        });

        Card.update(fieldsToUpdate, {
                where: {
                    id: cardId
                },
                returning: true
            })
            .then(results => {
                let updatedCard = results[1][0];
                return Card.findById(updatedCard.id,{
                    include: [{
                        model: Cardmember,
                        include: [{
                            model: User
                        }]
                    }]
                });
            })
            .then(card => {
                res.status(200).json({
                    card
                });
            })
            .catch(next);
    });

    router.post('/new', (req, res, next) => {
        //get cards name

        const cardName = req.body.cardName;
        const listId = req.body.listId;
        const description = req.body.cardDescription;
        //expect to get user info from req.user
        //Create a new board instance
        sequelize.transaction((t) => {
                return Card.create({
                    list_id: listId,
                    title: cardName,
                    description: description
                }, {
                    transaction: t
                });

            })
            // .then((card) => {
            //     //Grab user info and include associations
            //     return Card.findById(card.id, {
            //         include: [{
            //             model: Card
            //         }]
            //     });
            // })
            .then(createdCard => {
                return Card.findById(createdCard.id,{
                    include: [{
                        model: Cardmember,
                        include: [{
                            model: User
                        }]
                    }]
                });
            })
            .then((card) => {
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

    return router;
};

