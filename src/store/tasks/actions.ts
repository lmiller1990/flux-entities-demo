import axios, { AxiosError } from 'axios'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { ITask } from '../../types'

interface IFetchTasksRequest {
    type: 'tasksFetchRequest',
}
interface IFetchTasksSuccess {
    type: 'tasksFetchSuccess',
    payload: ITask[]
}
interface IFetchTasksFailure {
    type: 'tasksFetchFailure',
    payload: string
}

const fetchTasksRequest = (): IFetchTasksRequest => 
    ({ type: 'tasksFetchRequest' })
const fetchTasksSuccess = (tasks: ITask[]): IFetchTasksSuccess => 
    ({ type: 'tasksFetchSuccess', payload: tasks })
const fetchTasksFailure = (error: string): IFetchTasksFailure => 
    ({ type: 'tasksFetchFailure', payload: error })

type TTaskAction = IFetchTasksFailure | IFetchTasksRequest | IFetchTasksSuccess

const fetchTasks = (projectId: number): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        dispatch(fetchTasksRequest())
        try {
            const response = await axios.get<ITask[]>(`http://localhost:8080/tasks?projectId=${projectId}`)
            dispatch(fetchTasksSuccess(response.data))
            console.log(response.data)
        } catch (e) {
            dispatch(fetchTasksFailure((e as AxiosError).message))
        }
    }
}

export { fetchTasks, TTaskAction }