import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  Animated,
  TextInput,
} from 'react-native';

import HomeScreenService from '../../services/HomeScreenService';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import {useNavigation} from '@react-navigation/native';

const images = {
  Dessert: require('../../assets/desert.jpeg'),
  Dinner: require('../../assets/dinner.jpeg'),
  Breakfast: require('../../assets/breakfast.jpeg'),
  Lunch: require('../../assets/lunch.jpeg'),
};

const {width} = Dimensions.get('window');

const recipes = [
  {
    name: 'Breakfast Muffin',
    image: require('../../assets/breakfast-sand.jpg'),
    description: 'Crisp juicy bacon egg breakfast sandwich.',
  },
  {
    name: 'Classic Pancakes',
    image: require('../../assets/pancake.jpg'),
    description: 'Fluffy pancakes with syrup and butter.',
  },
  {
    name: 'Fruit Salad',
    image: require('../../assets/salad.jpg'),
    description: 'Fresh, vibrant fruit salad.',
  },
  {
    name: 'Butter Waffles',
    image: require('../../assets/waffle.jpg'),
    description: 'Flaky golden butter waffles with real syrup.',
  },
  // ... add more recipes
];
const RecipeList = () => {
  const [sections, setSections] = useState([]);
  const [isBottomToolbarVisible, setIsBottomToolbarVisible] = useState(true);
  const bottomBarPosition = useState(new Animated.Value(0))[0]; // Initialize Animated.Value
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false); // New state for search bar visibility
  const navigation = useNavigation();

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionData = await HomeScreenService.getSections();
        setSections(sectionData);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };
    fetchData();
  }, []);

  const toggleBottomToolbar = () => {
    Animated.timing(bottomBarPosition, {
      toValue: isBottomToolbarVisible ? -100 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsBottomToolbarVisible(!isBottomToolbarVisible);
  };

  const getImageForSection = sectionName => {
    return images[sectionName] || require('../../assets/default.jpeg');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <TopNavBar
          title="Scrumptious"
          onMenuPress={toggleBottomToolbar}
          navigation={navigation}
        />
        {isSearchBarVisible && (
          <View style={styles.searchBar}>
            <TextInput
              style={styles.input}
              placeholder="Search...."
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.addButton}>
              <Image
                source={require('../../assets/arrow.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        )}
        <ScrollView style={styles.scrollView}>
          <Text style={styles.recipeSectionTitle}>Saved Breakfast Recipes</Text>
          {recipes.map((recipe, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recipeCard}
              onPress={() => navigation.navigate('RecipeLanding')}>
              <Image source={recipe.image} style={styles.recipeImage} />
              <Text style={styles.recipeName}>{recipe.name}</Text>
              <Text style={styles.recipeDescription}>{recipe.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Animated.View
        style={[
          styles.bottomNavBarContainer,
          {
            bottom: bottomBarPosition,
          },
        ]}>
        <BottomNavBar onSearchPress={toggleSearchBar} />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#efe4e1',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  recipeCard: {
    backgroundColor: '#dbe7e0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  recipeImage: {
    width: width - 40,
    height: 200,
    borderRadius: 10,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  recipeDescription: {
    fontSize: 16,
    color: '#5d4037',
    textAlign: 'center',
  },
  recipeSectionTitle: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomNavBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 70,
  },
});

export default RecipeList;
