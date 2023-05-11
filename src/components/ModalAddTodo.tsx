import React, { useState } from 'react';
import {
  TextInput,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleAdd } from '../store/toggleSlice';
import { MaterialIcons } from '@expo/vector-icons';
import { createTodo } from '../store/api/todos';

const ModalAddTodo = () => {
  const toggle = useAppSelector((state) => state.toggle);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>('');

  const handleSubmit = () => {
    dispatch(
      createTodo({
        id: String(Date.now()),
        title,
        completed: false,
        updatedAt: new Date(),
      })
    );
    setTitle('');
    dispatch(toggleAdd(false));
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={toggle.add}
        onRequestClose={() => {
          dispatch(toggleAdd(false));
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Modal Title */}
            <View style={styles.titleWrapper}>
              <Text style={styles.modalTitle}>Add Todo</Text>
              <TouchableOpacity
                onPress={() => dispatch(toggleAdd(false))}
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
              <TextInput
                style={{ flex: 1, marginRight: 10 }}
                value={title}
                placeholder="What you gonna do?"
                autoFocus
                onChangeText={(text) => setTitle(text)}
              />
              <Button
                title="Add"
                onPress={handleSubmit}
                disabled={!title}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalAddTodo;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  contentWrapper: { flexDirection: 'row', gap: 6 },
  buttonAdd: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
