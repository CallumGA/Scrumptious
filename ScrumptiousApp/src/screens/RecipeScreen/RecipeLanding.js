import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

const {width} = Dimensions.get('window');

const RecipeLanding = () => {
  const [isBottomToolbarVisible, setIsBottomToolbarVisible] = useState(true);
  const bottomBarPosition = useState(new Animated.Value(0))[0];

  const toggleBottomToolbar = () => {
    Animated.timing(bottomBarPosition, {
      toValue: isBottomToolbarVisible ? -100 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsBottomToolbarVisible(!isBottomToolbarVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TopNavBar title="Chocolate cookies" onMenuPress={toggleBottomToolbar} />
      <ScrollView style={{flex: 1}}>
        <Image
          source={require('../../assets/recipe-image.jpg')}
          style={styles.recipeImage}
        />
        <View style={styles.recipeTitleContainer}>
          <Text style={styles.recipeTitle}>Chocolate cookies</Text>
          <Text style={styles.activeTime}>Active: 15 min</Text>
        </View>
        {/* Ingredients list and other content */}
      </ScrollView>
      <Animated.View
        style={[
          styles.bottomNavBarContainer,
          {
            bottom: bottomBarPosition, // Attach the animated value
          },
        ]}>
        <BottomNavBar />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  favoriteIcon: {
    width: 30,
    height: 30,
  },
  recipeImage: {
    width: width,
    height: 300, // Adjust the height as necessary
    resizeMode: 'cover',
  },
  recipeTitleContainer: {
    padding: 20,
    backgroundColor: '#dbe7e0',
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5d4037',
  },
  activeTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5d4037',
    marginTop: 5,
  },
  ingredientsList: {
    flex: 1,
    backgroundColor: '#dbe7e0',
    // Add padding and margins as needed
  },
  bottomPlayerBar: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#dbe7e0',
  },
  bottomNavBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 100,
  },
});

export default RecipeLanding;
