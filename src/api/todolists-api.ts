import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "89087f1a-df84-4609-ac91-9f089fdba243"
    }
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type getTasksResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

type addTasksResponseType = {
    items: TaskType[]
}

export type UpdateTaskTypeModule = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistsApi = {
    getTodolists() {
        return instance.get<Array<TodolistType>>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title})
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
    },
    updateTodolist(todolistID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistID}`, {title: title})
    },
    getTask(todolistId: string) {
        return instance.get<getTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<ResponseType<addTasksResponseType>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskID}`)
    },
    updateTask(todolistId: string, taskID: string, model: UpdateTaskTypeModule) {
        return instance.put<ResponseType<UpdateTaskTypeModule>>(`todo-lists/${todolistId}/tasks/${taskID}`,
            {
                title: model.title,
                description: model.description,
                completed: model.completed,
                status: model.status,
                priority: model.priority,
                startDate: model.startDate,
                deadline: model.deadline,
            })
    }
}