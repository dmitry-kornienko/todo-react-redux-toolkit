import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos', //задаем имя для асинхронного экшена
    // первый аргумент это то, что мы передаем в экшн fetchTodos
    // вторым аргументом принимаем метод, котроый передаст ошибку в метод fetchTodos.rejected, где она будет обработана
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
            // делаю проверку на успешность запроса, если что-то не так, то вызываю ошибку
            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const data = await response.json();
            return data;
            
        } catch (error) {
            // при помощи rejectWithValue передаем ошибку в fetchTodos.rejected
            return rejectWithValue(error.message)
        }
    }
);
export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function(id, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                throw new Error('Can not delete the task. Error on the server');
            }
            dispatch(removeTodo({id}));
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);
export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async function(id, {rejectWithValue, dispatch, getState}) {
        // getState возвращает ОБЩИЙ стейт
        // нахожу нужную задачу
        const todo = getState().todos.todos.find(todo => todo.id === id);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                })
            });
            if (!response.ok) {
                throw new Error('Can not toggle status. Error on the server');
            }
            dispatch(togleTodoComplete({id}));
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);
export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function(text, {rejectWithValue, dispatch}) {
        try {
            const todo = {
                title: text,
                userId: 1,
                completed: false,
            }
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(todo),
            });
            if (!response.ok) {
                throw new Error('Can not add task. Error on the server');
            }
            const data = await response.json();
            dispatch(addTodo(data));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload; 
}

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload)
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
        togleTodoComplete(state, action) {
            const togledTodo = state.todos.find(todo => todo.id === action.payload.id);
            togledTodo.completed = !togledTodo.completed;
        }
    },
    // описываю методы жизненного цикла, которые дают асинхронные запросы
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        },
        [fetchTodos.rejected]: setError,
        [deleteTodo.rejected]: setError,
        [addNewTodo.rejected]: setError,
    }
});

export const {addTodo, removeTodo, togleTodoComplete} = todoSlice.actions;

export default todoSlice.reducer;