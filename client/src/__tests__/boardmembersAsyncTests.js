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

    it('creates BOARDMEMBER_ADD_SUCCESS upon success db addition', () => {
        let token = "KJSLDKJFLSKDJFS";
        let boardId = 5;
        let memberId = 1
        fetchMock.post(`/api/boards/${boardId}/users?token=${token}`, {
            status: 201,
            body: {
                boardmember: {
                    member_id: 1,
                    board_id: 5,
                    Users: []
                }
            }
        })
        const expectedActions = [{
            type: actions.BOARDMEMBER_ADD_SUCCESS,
            data: {
                member_id: 1,
                board_id: 5,
                Users: []
            }
        }]
        const store = mockStore({
            boards: []
        })
        return store.dispatch(actions.requestAddBoardmember(boardId, memberId, token)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('creates BOARDMEMBER_REMOVE_SUCCESS upon success db removal', () => {
        let token = "KJSLDKJFLSKDJFS";
        let boardId = 5;
        let memberId = 1
        fetchMock.post(`/api/boards/${boardId}/users?token=${token}&_method=DELETE`, {
            status: 204
        })
        const expectedActions = [{
            type: actions.BOARDMEMBER_REMOVE_SUCCESS,
            data: {
                memberId: 1,
                boardId: 5
            }
        }]
        const store = mockStore({
            boards: []
        })
        return store.dispatch(actions.requestRemoveBoardmember(boardId, memberId, token)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
