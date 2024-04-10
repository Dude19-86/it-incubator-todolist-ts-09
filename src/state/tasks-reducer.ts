import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType} from "./todolists-reducer";

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeStatusAC = ReturnType<typeof changeStatusAC>
export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitle>

export type ActionsType =
    | RemoveTaskACType
    | AddTaskACType
    | ChangeStatusAC
    | ChangeTaskTitleType
    | AddTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case "CHANGE-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(e => e.id === action.id
                        ? {...e, isDone: action.isDone}
                        : e)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(e => e.id === action.id
                    ? {...e, title: action.newTitle}
                    : e)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state, [action.todolistId] : []
            }
        }
        default:
            throw new Error("I don't understand this type")
    }
}


export const removeTaskAC = (id: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', id, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-STATUS', id, isDone, todolistId} as const
}
export const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', id, newTitle, todolistId} as const
}
