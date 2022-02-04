import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {todolistsApi} from "../api/todolists-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "89087f1a-df84-4609-ac91-9f089fdba243"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolist('Blabla')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = "dee4bac4-7edd-415f-bf39-063800c56cd9"
    useEffect(() => {
        todolistsApi.deleteTodolist(todolistID)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistID = "447883ef-18ee-41be-b90c-012c11c88c49"
    useEffect(() => {
        todolistsApi.updateTodolist(todolistID, 'blabla')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>('')

    const onClickHandler = () => {
        todolistsApi.getTask(todolistID)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>

        <input placeholder={'todolistID'} value={todolistID} onChange={(e) => {
            setTodolistID(e.currentTarget.value)
        }}/>
        <button onClick={onClickHandler}>get task</button>
        {JSON.stringify(state)}</div>

}

export const AddTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todolistID, setTodolistID] = useState<string>('')

    const onClickHandler = () => {
        todolistsApi.addTask(todolistID, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <input placeholder={'title'} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <input placeholder={'todolistID'} value={todolistID} onChange={(e) => {
            setTodolistID(e.currentTarget.value)
        }}/>
        <button onClick={onClickHandler}>add new task</button>
        {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskID, setTaskId] = useState<string>('')
    const [todolistID, setTodolistID] = useState<string>('')

    const onClickHandler = () => {
        todolistsApi.deleteTask(todolistID, taskID)
            .then((res) => {
                setState(res.data.data)
            })
    }

    return <div>
        <input placeholder={'taskID'} value={taskID} onChange={(e) => {
            setTaskId(e.currentTarget.value)
        }}/>
        <input placeholder={'todolistID'} value={todolistID} onChange={(e) => {
            setTodolistID(e.currentTarget.value)
        }}/>
        <button onClick={onClickHandler}>delete task</button>
        {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [taskID, setTaskId] = useState<string>('')
    const [todolistID, setTodolistID] = useState<string>('')

    const onClickHandler = () => {
        todolistsApi.updateTask(todolistID, taskID,
            {
                title: title,
                description: 'hello my',
                completed: true,
                status: 12,
                priority: 1,
                startDate: '12.22.2222',
                deadline: '12.22.2222'
            }
        )
            .then((res) => {
                setState(res.data.data)
            })
    }

    return <div>
        <div>
            <input placeholder={'title'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <input placeholder={'taskID'} value={taskID} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <input placeholder={'todolistID'} value={todolistID} onChange={(e) => {
                setTodolistID(e.currentTarget.value)
            }}/>
            <button onClick={onClickHandler}>update Title</button>
        </div>
        {JSON.stringify(state)}</div>
}