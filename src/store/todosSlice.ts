import { createSlice } from '@reduxjs/toolkit';
import { TodoType } from '../utils/types';
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from './api/todos';

interface StateType {
  data: Array<TodoType>;
  isLoading: boolean;
  isError: boolean;
}

const initialState: StateType = {
  data: [],
  isLoading: false,
  isError: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    toggleTodo: (state, action) => {
      const todo = state?.data?.find(
        (todo) => todo.id === action.payload
      );
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch Todos
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    // Create Todo
    builder
      .addCase(createTodo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        fetchTodos();
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    // Update Todo
    builder
      .addCase(updateTodo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        fetchTodos();
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    // Delete Todo
    builder
      .addCase(deleteTodo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        fetchTodos();
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { toggleTodo } = todosSlice.actions;

export default todosSlice.reducer;
