// App.js or your main entry file
import { enableScreens } from 'react-native-screens';
enableScreens();
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import NewRecipe from './src/screens/RecipeScreen/NewRecipe';
import BottomNavBar from './src/components/BottomNavBar';
import TopNavBar from "./src/components/TopNavBar";
import {Animated} from "react-native";
import RecipeLanding from "./src/screens/RecipeScreen/RecipeLanding";
import InteractiveRecipe from "./src/screens/RecipeScreen/InteractiveRecipe";
import ReaderScreen from "./src/screens/ReaderScreen/ReaderScreen";
import RecipeList from "./src/screens/RecipeListScreen/RecipeListScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="NewRecipe" component={NewRecipe} />
            <Stack.Screen name="RecipeLanding" component={RecipeLanding} />
            <Stack.Screen name="InteractiveRecipe" component={InteractiveRecipe} />
            <Stack.Screen name="ReaderScreen" component={ReaderScreen} />
            <Stack.Screen name="RecipeList" component={RecipeList} />


        </Stack.Navigator>

      </NavigationContainer>
  );
};

const toggleBottomToolbar = () => {
    Animated.timing(bottomBarPosition, {
        toValue: isBottomToolbarVisible ? -100 : 0,
        duration: 300,
        useNativeDriver: false,
    }).start();

    setIsBottomToolbarVisible(!isBottomToolbarVisible);
};

export default App;
