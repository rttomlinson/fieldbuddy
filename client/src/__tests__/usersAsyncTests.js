import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import 'isomorphic-fetch';
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
import fetchMock from 'fetch-mock'


import * as actions from '../actions/usersActions';


describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset();
    });

    it('creates FETCH_USERS_SUCCESS upon success db fetch', () => {
        let token = "KJSLDKJFLSKDJFS";
        fetchMock.get(`/api/users?token=${token}`, {
                status: 200,
                body: {
                    users: [
                        {
                            id: 3,
                            username: "Bob",
                        },
                        {
                            id: 5,
                            username: "Sally"
                        }
                    ]
                }
            });
        const expectedActions = [{
            type: actions.FETCH_USERS_SUCCESS,
            data: [
                    {
                        id: 3,
                        username: "Bob",
                    },
                    {
                        id: 5,
                        username: "Sally"
                    }
                ]
        }];
        const store = mockStore({
            users: []
        })
        return store.dispatch(actions.fetchUsers(token)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
 
})
