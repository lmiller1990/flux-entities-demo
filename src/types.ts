export interface IUser {
    id: number
    name: string
}

export interface ITask {
    id: number
    projectId: number
    title: string
    assignee: number
}

export interface IProject {
    id: number
    title: string
    memberIds: number[]
    leaderId: number
}