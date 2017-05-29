import deepFreeze from 'deep-freeze';
import boardsReducer from '../reducers/boardsReducer';


const mockedData = {
    data: [{
        id: 1,
        Lists: [{
            board_id: 1,
            id: 4,
            Cards: [{
                    list_id: 4,
                    id: 6
                }, {
                    list_id: 4,
                    id: 34
                }

            ]
        }, {
            board_id: 1,
            id: 9,
            Cards: [{
                    list_id: 9,
                    id: 65
                }, {
                    list_id: 9,
                    id: 99
                }

            ]
        }],
        Boardmembers: []
    }, {
        id: 2,
        Lists: [],
        Boardmembers: []
    }, {
        id: 3,
        Lists: [{
            board_id: 3,
            id: 44,
            Cards: [{
                    list_id: 44,
                    id: 622
                }, {
                    list_id: 44,
                    id: 312
                }

            ]
        }, {
            board_id: 3,
            id: 91,
            Cards: [{
                    list_id: 91,
                    id: 354
                }, {
                    list_id: 91,
                    id: 565
                }

            ]
        }],
        Boardmembers: []

    }]
};
deepFreeze(mockedData);

import {
    addBoardmemberSuccess
}
from '../actions/boardsActions';
import {
    BOARDMEMBER_ADD_SUCCESS
}
from '../actions/boardsActions';


it("adds a boardmember to a board by board id", function() {
    const action = {
        type: BOARDMEMBER_ADD_SUCCESS,
        data: {
            board_id: 2,
            member_id: 5,
            Users: [{
                id: 5,
                username: "heeeeeeyyeah"
            }]
        }
    };
    const finalState = {
        data: [{
            id: 1,
            Lists: [{
                board_id: 1,
                id: 4,
                Cards: [{
                        list_id: 4,
                        id: 6
                    }, {
                        list_id: 4,
                        id: 34
                    }

                ],
            }, {
                board_id: 1,
                id: 9,
                Cards: [{
                        list_id: 9,
                        id: 65
                    }, {
                        list_id: 9,
                        id: 99
                    }

                ]
            }],
            Boardmembers: []
        }, {
            id: 2,
            Lists: [],
            Boardmembers: [{
                board_id: 2,
                member_id: 5,
                Users: [{
                    id: 5,
                    username: "heeeeeeyyeah"
                }]
            }]
        }, {
            id: 3,
            Lists: [{
                board_id: 3,
                id: 44,
                Cards: [{
                        list_id: 44,
                        id: 622
                    }, {
                        list_id: 44,
                        id: 312
                    }

                ],
            }, {
                board_id: 3,
                id: 91,
                Cards: [{
                        list_id: 91,
                        id: 354
                    }, {
                        list_id: 91,
                        id: 565
                    }

                ]
            }],
            Boardmembers: []
        }]
    };
    deepFreeze(action);
    expect(boardsReducer(mockedData, action)).toEqual(finalState);
})

import {
    removeBoardmemberSuccess
}
from '../actions/boardsActions';
import {
    BOARDMEMBER_REMOVE_SUCCESS
}
from '../actions/boardsActions';

it("removes a boardmember to a board by board id, and user id", function() {
    const initialState = {
        data: [{
            id: 1,
            Lists: [{
                board_id: 1,
                id: 4,
                Cards: [{
                        list_id: 4,
                        id: 6
                    }, {
                        list_id: 4,
                        id: 34
                    }

                ],
            }, {
                board_id: 1,
                id: 9,
                Cards: [{
                        list_id: 9,
                        id: 65
                    }, {
                        list_id: 9,
                        id: 99
                    }

                ]
            }],
            Boardmembers: []
        }, {
            id: 2,
            Lists: [],
            Boardmembers: [{
                board_id: 2,
                member_id: 5,
                Users: [{
                    id: 5,
                    username: "heeeeeeyyeah"
                }]
            }, {
                board_id: 2,
                member_id: 8,
                Users: [{
                    id: 8,
                    username: "seeeeeeeeeeee"
                }]
            }]
        }, {
            id: 3,
            Lists: [{
                board_id: 3,
                id: 44,
                Cards: [{
                        list_id: 44,
                        id: 622
                    }, {
                        list_id: 44,
                        id: 312
                    }

                ],
            }, {
                board_id: 3,
                id: 91,
                Cards: [{
                        list_id: 91,
                        id: 354
                    }, {
                        list_id: 91,
                        id: 565
                    }

                ]
            }],
            Boardmembers: []
        }]
    };
    const action = {
        type: BOARDMEMBER_REMOVE_SUCCESS,
        data: {
            boardId: 2,
            memberId: 8
        }
    };
    const finalState = {
        data: [{
            id: 1,
            Lists: [{
                board_id: 1,
                id: 4,
                Cards: [{
                        list_id: 4,
                        id: 6
                    }, {
                        list_id: 4,
                        id: 34
                    }

                ],
            }, {
                board_id: 1,
                id: 9,
                Cards: [{
                        list_id: 9,
                        id: 65
                    }, {
                        list_id: 9,
                        id: 99
                    }

                ]
            }],
            Boardmembers: []
        }, {
            id: 2,
            Lists: [],
            Boardmembers: [{
                board_id: 2,
                member_id: 5,
                Users: [{
                    id: 5,
                    username: "heeeeeeyyeah"
                }]
            }]
        }, {
            id: 3,
            Lists: [{
                board_id: 3,
                id: 44,
                Cards: [{
                    list_id: 44,
                    id: 622
                }, {
                    list_id: 44,
                    id: 312
                }],
            }, {
                board_id: 3,
                id: 91,
                Cards: [{
                        list_id: 91,
                        id: 354
                    }, {
                        list_id: 91,
                        id: 565
                    }

                ]
            }],
            Boardmembers: []
        }]
    };
    deepFreeze(action);
    expect(boardsReducer(initialState, action)).toEqual(finalState);
})
