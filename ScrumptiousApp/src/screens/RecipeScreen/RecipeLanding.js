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

  const ingredients = [
    {amount: '1 cup', name: 'peanut butter'},
    {amount: '1 cup', name: 'coconut sugar'},
    {amount: '2 tsp', name: 'chocolate sauce'},
    {amount: '4 tsp', name: 'corn flour'},
    {amount: '1', name: 'egg'},
  ];

  const toggleBottomToolbar = () => {
    Animated.timing(bottomBarPosition, {
      toValue: isBottomToolbarVisible ? -100 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsBottomToolbarVisible(!isBottomToolbarVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <TopNavBar
          title="Chocolate cookies"
          onMenuPress={toggleBottomToolbar}
        />
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/recipe-image.jpg')}
            style={styles.recipeImage}
          />
          <View style={styles.activeTimeBubble}>
            <Text style={styles.activeTimeText}>Active: 15 min</Text>
          </View>
          <TouchableOpacity onPress={() => {}} style={styles.backButton}>
            <Image
              source={require('../../assets/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.favoriteButton}>
            <Image
              source={require('../../assets/heart.png')}
              style={styles.favoriteIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.ingredientSection}>
            <Text style={styles.ingredientTitle}>Ingredients</Text>
            <View style={styles.ingredientGrid}>
              {ingredients.map((item, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.amountBubble}>
                    <Text style={styles.amountText}>{item.amount}</Text>
                  </View>
                  <Text style={styles.ingredientName}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
          {/* Additional content */}
        </ScrollView>
      </View>
      <Animated.View
        style={[
          styles.bottomNavBarContainer,
          {
            bottom: bottomBarPosition,
          },
        ]}>
        <BottomNavBar />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#efe4e1', // Background color for the safe area
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Background color for the main content
  },
  imageContainer: {
    width: width,
    height: 300, // Adjust the height as necessary
    position: 'relative',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  activeTimeBubble: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  activeTimeText: {
    fontWeight: 'bold',
    color: '#5d4037',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  favoriteIcon: {
    width: 30,
    height: 30,
  },
  scrollView: {
    flex: 1,
  },

  ingredientTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5d4037',
    marginBottom: 10,
  },
  bottomNavBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 80,
  },
  ingredientSection: {
    padding: 20,
    backgroundColor: '#efe4e1',
  },
  ingredientGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    width: '50%', // Each item takes up half the width of the container
  },
  amountBubble: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 8,
    margin: 5,
    // Align your shadow styles as needed
  },
  amountText: {
    fontSize: 14,
    // Align your text styles as needed
  },
  ingredientName: {
    fontSize: 16,
    flexShrink: 1, // Allows text to shrink and wrap if necessary
    marginLeft: 5, // Adds space between the amount bubble and the ingredient name
  },
  // Add other styles for the buttons, toggles, and ingredients list
});

export default RecipeLanding;
