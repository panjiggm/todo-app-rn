import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../utils/supabaseClient';

// ============= API Request ============= //
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    try {
      const { data } = await supabase.from('Todo').select('*');

      return data;
    } catch (error: any) {
      console.log(error.response.data);
    }
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (
    {
      id,
      title,
      completed,
      updatedAt,
    }: {
      id: string;
      title: string;
      completed: boolean;
      updatedAt: Date;
    },
    { rejectWithValue }
  ) => {
    try {
      const { error, data } = await supabase
        .from('Todo')
        .insert({ id, title, completed, updatedAt })
        .select('*');

      if (error) {
        throw rejectWithValue(error);
      }

      return data;
    } catch (error: any) {
      throw rejectWithValue(error.response.data);
    }
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (
    { id, title }: { id: string; title: string },
    { rejectWithValue }
  ) => {
    try {
      const { data, error } = await supabase
        .from('Todo')
        .update({ id, title })
        .eq('id', id)
        .select('*');

      if (error) {
        throw rejectWithValue(error);
      }

      return data;
    } catch (error: any) {
      throw rejectWithValue(error.response.data);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('Todo')
        .delete()
        .eq('id', id);

      if (error) {
        throw rejectWithValue(error);
      }
    } catch (error: any) {
      throw rejectWithValue(error.response.data);
    }
  }
);
