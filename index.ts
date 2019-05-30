import { initializeStore } from './src/store'
import { setUsers } from './src/store/users/tasks/reducers'
import { IUser } from './src/types'

const store = initializeStore()

const users: IUser[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
]

store.dispatch(setUsers(users))

console.log(store.getState())