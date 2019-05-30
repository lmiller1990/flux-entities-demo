import { createStore, combineReducers } from 'redux'

import { usersReducer } from './store/users/reducers'

const initializeStore = () =>
    createStore(
        combineReducers({
            users: usersReducer
        })
    )

export { initializeStore }