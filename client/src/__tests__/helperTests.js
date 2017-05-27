import {findListByListId} from '../helpers';

const mockedData = [
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
];




it("finds the correct list based on list id", function(){
    const listId = 44;
    const expectedValue = {
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
            };
            
    expect(findListByListId(listId, mockedData)).toEqual(expectedValue);

});
it("returns -2 if boards is an empty array", function(){
    expect(findListByListId(12, [])).toEqual(-2);
})
it("if a listId that is requested does not exist, return -1", function(){
    expect(findListByListId(48358485, mockedData)).toEqual(-1);
})


