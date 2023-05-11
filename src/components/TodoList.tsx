import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchTodos } from '../store/api/todos';

import TodoItem from './TodoItem';
import ModalDeleteTodo from './ModalDeleteTodo';
import ModalEditTodo from './ModalEditTodo';

const ListTodo = () => {
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const [selectedTodo, setSelectedTodo] = useState({
    id: '',
    title: '',
    completed: false,
  });

  useEffect(() => {
    if (todos.isLoading === true) {
      dispatch(fetchTodos());
    }
  }, [todos.isLoading]);

  return (
    <>
      {todos.isLoading && (
        <Text style={styles.textLoading}>Loading...</Text>
      )}
      {!todos.isLoading && (
        <FlatList
          style={styles.container}
          data={todos.data}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              onEdit={(data) => setSelectedTodo(data)}
              onDelete={(data) => setSelectedTodo(data)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
      <ModalDeleteTodo todo={selectedTodo} onTodo={setSelectedTodo} />
      <ModalEditTodo todo={selectedTodo} onTodo={setSelectedTodo} />
    </>
  );
};

export default ListTodo;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  textLoading: {
    textAlign: 'center',
    fontSize: 14,
    color: '#d9e4f7',
  },
});
