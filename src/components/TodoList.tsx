import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useAppSelector } from '../store/hooks';

import TodoItem from './TodoItem';
import ModalDeleteTodo from './ModalDeleteTodo';
import ModalEditTodo from './ModalEditTodo';

const ListTodo = () => {
  const todos = useAppSelector((state) => state.todos);
  const [selectedTodo, setSelectedTodo] = useState({
    id: '',
    title: '',
    completed: false,
  });

  return (
    <>
      <FlatList
        style={styles.container}
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onEdit={(data) => setSelectedTodo(data)}
            onDelete={(data) => setSelectedTodo(data)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
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
});
