import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { usersReducer } from './store/users/reducers'
import { projectsReducer } from './store/projects/reducers'
import { tasksReducer } from './store/tasks/reducers'

const initializeStore = () =>
    createStore(
        combineReducers({
            users: usersReducer,
            projects: projectsReducer,
            tasks: tasksReducer
        }),
        applyMiddleware(thunkMiddleware)
    )

export { initializeStore }