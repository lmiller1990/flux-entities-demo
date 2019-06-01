import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { initializeStore } from './src/store'
import { setUsers } from './src/store/users/reducers'
import { IUser, ITask } from './src/types'
import { mapEntities, selectedEntity, isLoading, isLoaded } from 'flux-entities'
import { fetchProjects, setSelectedProject } from './src/store/projects/actions'
import { fetchTasks } from './src/store/tasks/actions';

const store = initializeStore()

const users: IUser[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Catherine' },
]

const $ = (sel: string) => document.querySelector(sel)

declare global {
    interface Window {
        selectProject: (id: number) => void
    }
}

window.selectProject = (id: number) => {
    store.dispatch(setSelectedProject(id));
    // ------ Tasks --------
    const dispatch = store.dispatch as ThunkDispatch<{}, {}, AnyAction>
    dispatch(fetchTasks(id))
}

document.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        store.dispatch(setUsers(users))
        const dispatch = store.dispatch as ThunkDispatch<{}, {}, AnyAction>
        dispatch(fetchProjects())
    }, 50);

    const $userList = $('#users-list')
    const $projectsList = $('#projects-list')
    const $tasksList = $('#tasks-list')

    store.subscribe(() => {
        // ------ Users --------
        if ($userList && $projectsList && $tasksList) {
            $userList.innerHTML = ''

            const els = mapEntities(store.getState().users)
                .map(user => `<li>Name: ${user.name}</li>`)
            const usersHtml = '<ul>' + els.join('') + '</ul>'

            $userList.innerHTML = usersHtml
            const getUser = (userId: number) => store.getState().users.all[userId] ? store.getState().users.all[userId].name : ''

            // ------ Projects --------
            $projectsList.innerHTML = ''

            const currentProject = selectedEntity(store.getState().projects)

            const projectEls = mapEntities(store.getState().projects)
                .map(project => `
                    <h4>Project: ${project.title} ${currentProject && currentProject.id == project.id ? '*' : ''}</h4>
                    <button onclick="selectProject(${project.id})">Get Tasks</button>
                    <h5>Members</h5>
                    ${project.memberIds.map(id => getUser(id)).join(', ')}
                    <hr>
                `)

            $projectsList.innerHTML = projectEls.join('<br>')

            if (currentProject) {
                const tasks = store.getState().tasks.ids.reduce<ITask[]>((acc, id) => {
                    const task = store.getState().tasks.all[id]
                    if (task.projectId === currentProject.id) {
                        return [...acc, task]
                    }
                    return acc
                }, [])

                let tasksHtml = '<ul>' 
                for (const task of tasks) {
                    tasksHtml += `<li>${task.title}</li>`
                }
                tasksHtml += '</ul>'

                $tasksList.innerHTML = tasksHtml
            }
        }
    })
})