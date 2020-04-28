import { BaseState } from 'flux-entities'

import { IUser } from '../../types'

interface ISetUsers {
    type: 'SET_USERS',
    payload: IUser[]
}

const setUsers = (users: IUser[]): ISetUsers => ({
    type: 'SET_USERS',
    payload: users
})

type TUserAction = ISetUsers

interface IUsersState extends BaseState<IUser> {}

const initialState: IUsersState = {
    ids: [],
    all: {}
}

const usersReducer = (state: BaseState<IUser> = initialState, action: TUserAction): IUsersState => {
    if (action.type === 'SET_USERS') {
        return action.payload.reduce<IUsersState>((acc, curr) => {
            return {
                ids: Array.from(new Set([...acc.ids, curr.id])),
                all: { ...acc.all, [curr.id]: curr }
            }
        }, { ...state })
    }

    return state
}

export {
    usersReducer,
    setUsers
}