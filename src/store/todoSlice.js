import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: []
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push({
                id: Date.now(),
                title: action.payload.text,
                completed: false
            })
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
        togleTodoComplete(state, action) {
            const togledTodo = state.todos.find(todo => todo.id === action.payload.id);
            togledTodo.completed = !togledTodo.completed;
        }
    }
});

export const {addTodo, removeTodo, togleTodoComplete} = todoSlice.actions;

export default todoSlice.reducer;