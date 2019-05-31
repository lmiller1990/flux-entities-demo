import axios, { AxiosError } from 'axios'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { IProject } from '../../types'

interface IFetchProjectsRequest {
    type: 'projectsFetchRequest',
}
interface IFetchProjectsSuccess {
    type: 'projectsFetchSuccess',
    payload: IProject[]
}
interface IFetchProjectsFailure {
    type: 'projectsFetchFailure',
    payload: string
}
interface ISetSelectedProject {
    type: 'setSelectedProject',
    payload: number | null
}

export type TProjectAction = IFetchProjectsFailure | IFetchProjectsSuccess | IFetchProjectsRequest | ISetSelectedProject

const setSelectedProject = (projectId: number | null): ISetSelectedProject => 
    ({ type: 'setSelectedProject', payload: projectId })
const fetchProjectsRequest = (): IFetchProjectsRequest => 
    ({ type: 'projectsFetchRequest' })
const fetchProjectsSuccess = (projects: IProject[]): IFetchProjectsSuccess => 
    ({ type: 'projectsFetchSuccess', payload: projects })
const fetchProjectsFailure = (error: string): IFetchProjectsFailure => 
    ({ type: 'projectsFetchFailure', payload: error })

const fetchProjects = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        dispatch(fetchProjectsRequest())
        try {
            const response = await axios.get<IProject[]>('http://localhost:8080/projects', {
                headers: {
                    'Content-Type': 'application.json'
                }
            })
            dispatch(fetchProjectsSuccess(response.data))
        } catch (e) {
            dispatch(fetchProjectsFailure((e as AxiosError).message))
        }
    }
}

export { fetchProjects, setSelectedProject }