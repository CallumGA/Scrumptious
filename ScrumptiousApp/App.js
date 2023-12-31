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
