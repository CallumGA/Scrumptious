// src/screens/NewRecipeService.js
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

const NewRecipe = () => {
  const [url, setUrl] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TopNavBar title="Scrumptious" />
      <View style={styles.content}>
        <Text style={styles.header}>RECIPE URL</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setUrl}
            value={url}
            placeholder="https://yummly.com/lasagna...."
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.addButton}>
            <Image
              source={require('../../assets/arrow.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
  },
  addButton: {
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  buttonContainer: {
    // If your buttons are vertically aligned in the design
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
  },
  // Add any additional styles you may need
});

export default NewRecipe;
