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
  Switch,
} from 'react-native';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

const NewRecipe = () => {
  const [url, setUrl] = useState('');
  const [saveToggle, setSaveToggle] = useState(false);
  const [interactiveModeToggle, setInteractiveModeToggle] = useState(false);
  const [readerModeToggle, setReaderModeToggle] = useState(false);

  const renderToggle = (value, onValueChange, label) => (
    <View style={styles.toggleRow}>
      <Text style={styles.optionText}>{label}</Text>
      <Switch
        trackColor={{false: '#FFFFFF', true: '#FFFFFF'}} // White background for both on and off states
        thumbColor={value ? '#000000' : '#f4f3f4'} // Black thumb when on, light color when off
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TopNavBar title="Scrumptious" />
      <View style={styles.mainContent}>
        <View style={styles.content}>
          <Text style={styles.header}>RECIPE URL</Text>
          {renderToggle(saveToggle, setSaveToggle, 'Save', '#dbe7e0')}
          {renderToggle(
            interactiveModeToggle,
            setInteractiveModeToggle,
            'Interactive Mode',
            '#dbe7e0',
          )}
          {renderToggle(
            readerModeToggle,
            setReaderModeToggle,
            'Reader Mode',
            '#dbe7e0',
          )}
          <Text>
            Enter the URL of the recipe you want to parse. Ensure the URL is to
            the recipes main page. You also must ensure the recipe site is
            supported by this application.
          </Text>
        </View>

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
    backgroundColor: '#dbe7e0',
  },
  mainContent: {
    flex: 1, // Ensures content takes all available space between header and footer
    justifyContent: 'space-between', // Pushes children to start and end of container
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center', // Centers the header text
    marginBottom: 40, // Space between header and toggles
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: '#FAF9F6',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#FAF9F6',
  },
  addButton: {
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20, // More space around the toggle
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginHorizontal: 20, // Space from the sides of the screen
    marginBottom: 20, // More space between individual toggles
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default NewRecipe;
