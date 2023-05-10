import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';

// Components
import TodoList from './src/components/TodoList';
import FloatingButton from './src/components/FloatingButton';
import ModalAddTodo from './src/components/ModalAddTodo';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.content}>
          <Text style={styles.title}>Today's Tasks</Text>
          <TodoList />
          <ModalAddTodo />
        </View>
        <FloatingButton />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#344fa1',
  },
  content: {
    padding: 24,
  },
  title: {
    color: '#829eeb',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginVertical: 16,
  },
});
