import {TasksStateType} from '../App';
import {addTodolistAC, setTodolistAC, TodolistDomainType, todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [
        {
            id: "todolistId1", title: "What to learn", filter: "all", addedDate: '',
            order: 0
        },
        {
            id: "todolistId2", title: "What to buy", filter: "all", addedDate: '',
            order: 0
        }
    ];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});

test('empty arrays should added when we set todolist', () => {

    const action = setTodolistAC([
        {
            id: "1", title: "What to learn", addedDate: '',
            order: 0
        },
        {
            id: "2", title: "What to buy", addedDate: '',
            order: 0
        }
    ]);

    const endState = tasksReducer({}, action);

    const keys =Object.keys(endState)

    expect(keys.length).toBe(2);
    expect(endState['1']).toBeDefined();
    expect(endState['2']).toBeDefined();

});