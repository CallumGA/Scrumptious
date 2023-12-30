// src/screens/HomeScreen/HomeScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView, // Use SafeAreaView for better spacing on iOS
} from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Scrumptious</Text>
        <TouchableOpacity style={styles.hamburger}>
          <Image
            source={require('../../assets/menu.png')} // Replace with your image path
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
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
      <View style={styles.tabBar}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/search.png')}
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/home.png')}
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../assets/eat.png')}
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align title to the left, icon to the right
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  navTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  hamburger: {
    // Adjust if needed
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  recipeContainer: {
    flex: 1,
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
  scrollViewContent: {
    paddingBottom: 70,
  },
  // Add any additional styles you may need
});

export default HomeScreen;
