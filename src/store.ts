import { createStore, combineReducers } from 'redux'

import { usersReducer } from './store/users/tasks/reducers'

const initializeStore = () =>
    createStore(
        combineReducers({
            users: usersReducer
        })
    )

export { initializeStore }