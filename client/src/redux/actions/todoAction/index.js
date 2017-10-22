import { v4 } from 'node-uuid';

export const createTodo = (text) => ({
    type: 'CREATE_TODO',
    id: v4(),
    text,
});

export const editTodo = (id, text) => ({
    type: 'EDIT_TODO',
    id,
    text
});

export const setDisplayFilter = (filter) => ({
    type: 'SET_DISPLAY_FILTER',
    filter,
});

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id,
});
