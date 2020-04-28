import { SelectableAjaxBaseState } from 'flux-entities'

import { IProject } from '../../types'
import { TProjectAction } from './actions'

interface IProjectsState extends SelectableAjaxBaseState<IProject> {}

const initialState: IProjectsState = {
    ids: [],
    all: {},
    loading: false,
    touched: false,
    errors: [],
}

const projectsReducer = (state: IProjectsState = initialState, action: TProjectAction): IProjectsState => {
    if (action.type === 'projectsFetchRequest') {
        return {
            ...state,
            loading: true,
            touched: true,
            errors: []
        }
    }

    if (action.type === 'projectsFetchSuccess') {
        return action.payload.reduce<IProjectsState>((acc, curr) => {
            return {
                ...state,
                loading: false,
                ids: Array.from(new Set([...acc.ids, curr.id])),
                all: { ...acc.all, [curr.id]: curr }
            }
        }, { ...state })
    }

    if (action.type === 'projectsFetchFailure') {
        return {
            ...state,
            loading: false,
            errors: [action.payload],
        }
    }

    if (action.type === 'setSelectedProject') {
        return {
            ...state,
            selectedId: action.payload
        }
    }

    return state
}

export {
    projectsReducer
}