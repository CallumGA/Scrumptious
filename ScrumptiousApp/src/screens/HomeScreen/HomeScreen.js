// src/screens/HomeScreen/HomeScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import HomeScreenService from '../../services/HomeScreenService';

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
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ScrumptiousApp!</Text>
      <ScrollView style={styles.recipeContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  recipeContainer: {
    width: '100%',
  },
  recipe: {
    backgroundColor: '#eaeaea',
    padding: 10,
    marginTop: 10,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
