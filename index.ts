import { initializeStore } from './src/store'
import { setUsers } from './src/store/users/reducers'
import { IUser, IProject } from './src/types'
import { mapEntities } from 'flux-entities';

const store = initializeStore()

const users: IUser[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
]

const projects: IProject[] = [
    { id: 1, title: 'Learn Redux', memberIds: [1], leaderId: 1 },
    { id: 2, title: 'Learn Vuex', memberIds: [1, 2], leaderId: 2},
]

const $ = (sel: string) => document.querySelector(sel)

document.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        store.dispatch(setUsers(users))
    }, 50)

    const $userList = $('#users-list')

    store.subscribe(() => {
        if ($userList) {
            $userList.innerHTML = ''
            const els = mapEntities(store.getState().users)
                .map(user => `<li>Name: ${user.name}</li>`)
            const html = '<ul>' + els.join('') + '</ul>'

            $userList.innerHTML = html
        }
    })
})