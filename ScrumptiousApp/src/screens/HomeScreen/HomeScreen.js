// src/screens/HomeScreen/HomeScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import HomeScreenService from '../../services/HomeScreenService';
import TopNavBar from '../../components/TopNavBar'; // Import TopNavBar
import BottomNavBar from '../../components/BottomNavBar'; // Import BottomNavBar

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeData = await HomeScreenService.getRecipes();
        setRecipes(recipeData);
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
        {recipes.map((recipe, index) => (
          <View key={index} style={styles.recipe}>
            <Text style={styles.recipeTitle}>{recipe.name}</Text>
            <Text>Section: {recipe.section}</Text>
            <Text>Instructions: {recipe.instructions}</Text>
            <Text>Cook Time: {recipe.cook_time} minutes</Text>
            <Text>Ingredients: {recipe.ingredients}</Text>
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
