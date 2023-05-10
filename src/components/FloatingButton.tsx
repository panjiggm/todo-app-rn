import React from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '../store/hooks';
import { toggleAdd } from '../store/toggleSlice';

const FloatingButton = () => {
  const dispatch = useAppDispatch();

  const handlePress = () => {
    dispatch(toggleAdd(true));
  };

  return (
    <TouchableOpacity
      style={[styles.floatingButton, styles.shadowProp]}
      onPress={handlePress}
    >
      <Ionicons name="add-circle" size={60} color="#EA80FC" />
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
