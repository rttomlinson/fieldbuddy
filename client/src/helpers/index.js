/*
board will have the following structure
boards: [
    {
        id: 1,
        Lists: [
            {
                board_id: 1,
                id: 4,
                Cards: [
                    {
                        list_id: 4,
                        id: 6
                    },
                    {
                        list_id: 4,
                        id: 34
                    }
                
                ]
            },
            {
                board_id: 1,
                id: 9,
                Cards: [
                    {
                        list_id: 9,
                        id: 65
                    },
                    {
                        list_id: 9,
                        id: 99
                    }
                
                ]
            }
        ]
        
    },
    {
        id: 2,
        Lists: []
    },
    {
        id: 3,
        Lists: [
            {
                board_id: 3,
                id: 44,
                Cards: [
                    {
                        list_id: 44,
                        id: 622
                    },
                    {
                        list_id: 44,
                        id: 312
                    }
                
                ]
            },
            {
                board_id: 3,
                id: 91,
                Cards: [
                    {
                        list_id: 91,
                        id: 354
                    },
                    {
                        list_id: 91,
                        id: 565
                    }
                
                ]
            }
        ]
        
    }
]
*/


export function findListByListId(listId, boards) {
    //if not listId return 0
    if (!listId){
        return 0;
    }
    if (boards.length === 0) {
        //if boards is an empty array then we are probably waiting on data
        //it could also be that a user navigated to a lists page while no boards exist yet
        return -2;
    }
    
    let boardIndex;
    let listIndex;
    boardIndex = boards.findIndex((board) => {
        listIndex =  board.Lists.findIndex((list) => {
            return list.id == listId;
        });
        return listIndex > -1;
    });
    if (boardIndex === -1) {
        //list was not found in any of the boards;
        return -1;
    }
    
    return boards[boardIndex].Lists[listIndex];
}

export function findCardByCardId(cardId, boards) {
    let boardIndex;
    let listIndex;
    let cardIndex;
    boardIndex = boards.findIndex((board) => {
        listIndex =  board.Lists.findIndex((list) => {
            cardIndex = list.Cards.findIndex((card) => {
                return card.id == cardId;
            });
            return cardIndex > -1;
        });
        return listIndex > -1;
    });
    if (boardIndex === -1) {
        //list was not found in any of the boards;
        return -1;
    }
    
    return boards[boardIndex].Lists[listIndex].Cards[cardIndex];
}

export function findCardPathById(cardId, boards) {
    let boardIndex;
    let listIndex;
    let cardIndex;
    boardIndex = boards.findIndex((board) => {
        listIndex =  board.Lists.findIndex((list) => {
            cardIndex = list.Cards.findIndex((card) => {
                return card.id == cardId;
            });
            return cardIndex > -1;
        });
        return listIndex > -1;
    });
    if (boardIndex === -1) {
        //list was not found in any of the boards;
        return -1;
    }
    
    return `${boardIndex}:${listIndex}:${cardIndex}`;
}
