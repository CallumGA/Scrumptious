// src/screens/HomeScreen/HomeScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Text,
} from 'react-native';
import HomeScreenService from '../../services/HomeScreenService';
import TopNavBar from '../../components/TopNavBar'; // Import TopNavBar
import BottomNavBar from '../../components/BottomNavBar'; // Import BottomNavBar

const HomeScreen = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionData = await HomeScreenService.getSections();
        setSections(sectionData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TopNavBar title="Scrumptious" />
      <ScrollView
        style={styles.recipeContainer}
        contentContainerStyle={styles.scrollViewContent}>
        {sections.map((item, index) => (
          <View key={index} style={styles.recipe}>
            <Text>Section: {item.section}</Text>
          </View>
        ))}
      </ScrollView>
      <BottomNavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  recipeContainer: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 70,
  },
  recipe: {
    backgroundColor: '#eaeaea',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Add any additional styles you may need
});

export default HomeScreen;
