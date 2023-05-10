import React, { FC } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { toggleTodo } from '../store/todosSlice';
import { useAppDispatch } from '../store/hooks';
import { toggleDelete, toggleEdit } from '../store/toggleSlice';
import { TodoType } from '../utils/types';

// Icons
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

interface TodoItemProps {
  todo: TodoType;
  onEdit: (todo: TodoType) => void;
  onDelete: (todo: TodoType) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onEdit, onDelete }) => {
  const { title, id, completed } = todo;
  const dispatch = useAppDispatch();

  const todoOptions = () => {
    return (
      <View style={styles.swipeItem}>
        <TouchableOpacity
          style={styles.optionBtn}
          onPress={() => {
            dispatch(toggleEdit(true));
            onEdit(todo);
          }}
        >
          <Feather name="edit-3" size={14} color="#d9e4f7" />
          <Text style={styles.title}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionBtn}
          onPress={() => {
            dispatch(toggleDelete(true));
            onDelete(todo);
          }}
        >
          <Octicons name="trash" size={14} color="#d9e4f7" />
          <Text style={styles.title}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={todoOptions}>
      <View style={[styles.item, styles.shadowProp]}>
        <BouncyCheckbox
          size={20}
          isChecked={completed}
          fillColor="#2ecc71"
          unfillColor="transparent"
          iconStyle={{ borderColor: 'red' }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={() => dispatch(toggleTodo(id))}
        />
        <Text
          style={{
            ...styles.title,
            textDecorationLine: completed ? 'line-through' : 'none',
          }}
        >
          {title}
        </Text>
      </View>
    </Swipeable>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#031956',
    borderRadius: 20,
    padding: 18,
    marginVertical: 4,
  },
  swipeItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 4,
    paddingVertical: 20,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    color: '#d9e4f7',
    fontSize: 14,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: 75,
  },
});
