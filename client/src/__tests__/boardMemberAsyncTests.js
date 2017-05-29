import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../actions/boardsActions'
import 'isomorphic-fetch';
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
import fetchMock from 'fetch-mock'



describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset();
    })

    it('creates BOARD_REMOVAL_SUCCESS upon success db removal', () => {
        let token = "KJSLDKJFLSKDJFS";
        let boardId = 1;
        fetchMock.post(`/api/boards?token=${token}`, {
            status: 204,
            ok: true
        })
        const expectedActions = [{
            type: actions.BOARD_REMOVAL_SUCCESS,
            data: 1
        }]
        const store = mockStore({
            boards: []
        })
        return store.dispatch(actions.requestBoardRemoval(boardId, token)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('creates CARD_UPDATE_SUCCESS upon success db update', () => {
        let token = "KJSLDKJFLSKDJFS";
        let cardId = 1;
        fetchMock.post(`/api/cards/${cardId}?token=${token}&_method=PUT`, {
            status: 200,
            body: {
                card: {
                    id: cardId,
                    description: "newDescription",
                    completed: false
                }
            }
        })
        const expectedActions = [{
            type: actions.CARD_UPDATE_SUCCESS,
            data: {
                id: cardId,
                description: "newDescription",
                completed: false
            }
        }]
        const store = mockStore({
            boards: []
        })
        return store.dispatch(actions.requestCardUpdate(cardId, token, cardId)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
