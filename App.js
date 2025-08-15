import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const Mytodo = () => {
  const [todos, setTodos] = useState([]);
  const [listInput, setListInput] = useState("");

   // Load saved tasks on mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const savedTodos = await AsyncStorage.getItem('todos');
        if (savedTodos !== null) {
          setTodoos(JSON.parse(savedTodos));
        }
      } catch (error) {
        console.log('Error loading todos:', error);
      }
    };
    loadTodos();
  }, []);

  // Save tasks whenever todos change
  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.log('Error saving todos:', error);
      }
    };
    saveTodos();
  }, [todos]);

  const handleAddTodo = () => {
    if (listInput.trim() === "") {
      alert("Please enter a todo item");
      return;
    }
    setTodos([...todos, listInput]);
    setListInput("");
  }

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  }


  return (
    <View style={styles.container}>
    
      <StatusBar style="auto" />
      <Text style={styles.heading}>To Do List</Text>
      <TextInput
        style={styles.input}
        value={listInput}
        onChangeText={text => setListInput(text)}
        placeholder="Enter your task"
      />
      <TouchableOpacity style={styles.btn} onPress={handleAddTodo}>
         <Text style={styles.btnText}>Add Task</Text>
       </TouchableOpacity>

      <ScrollView style={styles.list}>
        {todos.map((todo, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.todoText}>✔{todo}</Text>
            <TouchableOpacity onPress={() => handleDeleteTodo(index)} style={styles.deleteBtn}>
              <Text style={styles.del}>Delete</Text>
            </TouchableOpacity>
          
          </View>
        ))}
      </ScrollView>
      <Text style={styles.task}>Total Tasks: {todos.length}</Text>
      <Text style={styles.copyright}>Sibusiso's first react native app© 2025  </Text>
    </View>
  );
}

const styles = StyleSheet.create({

  copyright: {
    textAlign: 'center',
    color: 'rgba(32, 20, 3, 0.8)',
    fontWeight: 'bold',
    fontSize: 10,
    marginTop: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    margin:1,
    backgroundColor: 'antiquewhite',
    minHeight: 100,
    width: '100%',
    
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgb(94, 63, 22)',
    borderStyle:' solid',
    
  },

  task: {
    color: 'rgba(32, 20, 3, 0.8)',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center',
  },
  heading: {
    fontSize: 28,
    textShadowColor: 'rgba(94, 63, 22, 0.8)',
    textShadowOffset: { width: 2, height: 2},
    textShadowRadius: 5,
    color: 'rgba(32, 20, 3, 0.8)',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#5E3F16',
    borderRadius: 16,
    borderWidth:2,
    color: 'rgba(32, 20, 3, 0.8)',
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 10,
    
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    color:'rgba(32, 20, 3, 0.8)',
    fontWeight: 'bold',
    fontSize: 15,
    fontWeight: 'bold',
    borderRadius:16,
  },
  btn: {
    backgroundColor: 'rgba(47, 29, 4, 0.654)',
    borderColor: ' rgb(94, 63, 22)',
    borderWidth: 2,
    alignItems: 'center',
    borderStyle: 'solid',
    padding: 10,
    cursor: 'pointer',
    width:'40%',
    marginLeft: '60%',
    marginBottom: 10,
    borderRadius: 16,
  },

  btnText: {
    color: 'rgb(237, 208, 176)',
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color:'rgba(32, 20, 3, 0.8)',
    padding: 5,
    borderColor: 'rgb(94, 63, 22)',
    borderWidth: 1,
    borderStyle: 'solid',
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#f5f5dc',
    borderRadius: 16,
  },
  todoText: {
    fontSize: 18,
  },
  deleteBtn: {
    cursor: 'pointer',
    backgroundColor: 'rgb(178, 34, 34)',
    borderColor: 'rgba(42, 19, 1, 0.85)',
    borderWidth: 1,
    color:'rgb(237, 208, 176)',
    textAlign: 'center',
    width: 70,
    height: 35,
    padding: 6,
    margin:10,
    borderRadius: 16,
  },
  del: {
    color: 'rgb(237, 208, 176)',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Mytodo;

