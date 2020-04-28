import { AjaxBaseState } from 'flux-entities'

import { ITask } from '../../types'
import { TTaskAction } from './actions'

interface ITasksState extends AjaxBaseState<ITask> {}

const initialState: ITasksState = {
    ids: [],
    all: {},
    loading: false,
    touched: false,
    errors: [],
}

const tasksReducer = (state: ITasksState = initialState, action: TTaskAction): ITasksState => {
    if (action.type === 'tasksFetchRequest') {
        return {
            ...state,
            loading: true,
            touched: true,
            errors: []
        }
    }

    if (action.type === 'tasksFetchSuccess') {
        return action.payload.reduce<ITasksState>((acc, curr) => {
            return {
                ...state,
                loading: false,
                ids: Array.from(new Set([...acc.ids, curr.id])),
                all: { ...acc.all, [curr.id]: curr }
            }
        }, { ...state })
    }

    if (action.type === 'tasksFetchFailure') {
        return {
            ...state,
            loading: false,
            errors: [action.payload],
        }
    }

    return state
}

export {
    tasksReducer
}