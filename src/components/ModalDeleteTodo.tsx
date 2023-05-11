import React, { FC, Dispatch, SetStateAction } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleDelete } from '../store/toggleSlice';
import { MaterialIcons } from '@expo/vector-icons';

import { TodoType } from '../utils/types';
import { deleteTodo } from '../store/api/todos';

interface ModalDeleteTodoProps {
  todo: TodoType;
  onTodo: Dispatch<SetStateAction<TodoType>>;
}

const ModalDeleteTodo: FC<ModalDeleteTodoProps> = ({
  todo,
  onTodo,
}) => {
  const toggle = useAppSelector((state) => state.toggle);
  const dispatch = useAppDispatch();

  const handleDeleteTodo = () => {
    dispatch(deleteTodo({ id: todo.id }));
    dispatch(toggleDelete(false));
    onTodo({ id: '', title: '', completed: false });
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={toggle.delete}
        onRequestClose={() => {
          dispatch(toggleDelete(false));
          onTodo({ id: '', title: '', completed: false });
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Modal Title */}
            <View style={styles.titleWrapper}>
              <Text style={styles.modalTitle}>Delete Todo</Text>
              <TouchableOpacity
                onPress={() => dispatch(toggleDelete(false))}
              >
                <MaterialIcons
                  name="highlight-remove"
                  size={24}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            {/* Modal Content */}
            <View style={styles.contentWrapper}>
              <Text style={styles.textContent}>
                Are you sure want to Delete{' '}
                <Text style={{ fontWeight: '800' }}>
                  {todo.title}
                </Text>
                ?
              </Text>
            </View>

            {/* Modal Action */}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={handleDeleteTodo}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalDeleteTodo;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  titleWrapper: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#555',
  },
  contentWrapper: { paddingVertical: 10, marginBottom: 20 },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textContent: {
    textAlign: 'center',
    color: '#555',
  },
  buttonClose: {
    backgroundColor: '#EF5350',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
