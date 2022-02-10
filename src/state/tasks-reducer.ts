import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskPriority, TaskStatuses, TaskType, todolistsApi, UpdateTaskTypeModule} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type UpdateTaskActionType = {
    type: 'UPDATE-TASK',
    todolistId: string
    taskId: string
    model: UpdateDomainTaskTypeModule
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export type setTasksActionType = {
    type: 'SET_TASKS'
    tasks: Array<TaskType>
    todolistID: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | UpdateTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | setTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = action.task
            const tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy;
        }
        case 'UPDATE-TASK': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, ...action.model} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(t => {
                copyState [t.id] = []
            })
            return copyState
        }
        case 'SET_TASKS': {
            const copyState = {...state}
            copyState[action.todolistID] = action.tasks
            return copyState
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskTypeModule, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistID: string): setTasksActionType => {
    return {type: 'SET_TASKS', tasks, todolistID}
}

export const fetchTasksTC = (todolistID: string) => (dispatch: Dispatch): void => {
    todolistsApi.getTask(todolistID)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistID))
        })
}

export const removeTaskTC = (taskID: string, todolistID: string) => (dispatch: Dispatch): void => {
    todolistsApi.deleteTask(taskID, todolistID)
        .then((res) => {
            dispatch(removeTaskAC(taskID, todolistID))
        })
}

export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch): void => {

    todolistsApi.addTask(todolistID, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

// export const changeTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) =>
//     (dispatch: Dispatch, getState: () => AppRootStateType): void => {
//         const state = getState()
//         const task = state.tasks[todolistId].find(u => u.id === taskId)
//         if (!task) {
//             console.warn('task not found in the state')
//             return
//         }
//         const model: UpdateTaskTypeModule = {
//             deadline: task.deadline,
//             description: task.description,
//             priority: task.priority,
//             title: task.title,
//             status: status,
//             startDate: task.startDate,
//             completed: task.completed
//
//         }
//         todolistsApi.updateTask(todolistId, taskId, model)
//             .then((res) => {
//                 dispatch(updateTaskAC(taskId, status, todolistId))
//             })
//     }

export type UpdateDomainTaskTypeModule = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriority
    startDate?: string
    deadline?: string
}



export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskTypeModule, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType): void => {
        const state = getState()
        const task = state.tasks[todolistId].find(u => u.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskTypeModule = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            title: task.title,
            status: task.status,
            startDate: task.startDate,
            completed: task.completed,
            ...domainModel

        }

        todolistsApi.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
            })
}