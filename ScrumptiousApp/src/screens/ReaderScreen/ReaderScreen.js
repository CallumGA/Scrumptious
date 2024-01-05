import React, {useState, useEffect} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import Tts from 'react-native-tts';

const {width} = Dimensions.get('window');

const ReaderScreen = () => {
  const [isBottomToolbarVisible, setIsBottomToolbarVisible] = useState(false);
  const bottomBarPosition = useState(new Animated.Value(-80))[0];
  const navigation = useNavigation();

  const [ingredients, setIngredients] = useState([
    {baseAmount: 1, unit: 'cup', name: 'peanut butter'},
    {baseAmount: 1, unit: 'cup', name: 'coconut sugar'},
    {baseAmount: 2, unit: 'tsp', name: 'chocolate sauce'},
    {baseAmount: 4, unit: 'tsp', name: 'corn flour'},
    {baseAmount: 1, unit: '', name: 'egg'},
  ]);

  const InteractiveButton = () => (
    <TouchableOpacity
      style={styles.readerButton}
      onPress={() => navigation.navigate('RecipeLanding')}>
      <Text style={styles.readerButtonText}>Interactive Mode</Text>
    </TouchableOpacity>
  );

  const RecipeStep = ({stepNumber, stepText}) => {
    const speak = () => {
      Tts.speak(stepText);
    };

    return (
      <View style={styles.stepContainer}>
        <View style={styles.stepNumberBubble}>
          <Text style={styles.stepNumberText}>{stepNumber}</Text>
        </View>
        <Text style={styles.stepText}>{stepText}</Text>
      </View>
    );
  };

  // State for portion count
  const [portion, setPortion] = useState(1);
  const [secondsRemaining, setSecondsRemaining] = useState(20 * 60); // 20 minutes in seconds

  useEffect(() => {
    // Start the timer on component mount
    const timerId = setInterval(() => {
      setSecondsRemaining(prevSeconds => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        }
        clearInterval(timerId);
        return 0; // Stop at zero
      });
    }, 1000); // Decrement every second

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  // Function to update the ingredient amounts based on the portion
  const updateIngredientsForPortion = newPortion => {
    const updatedIngredients = ingredients.map(ingredient => {
      const newAmount = ingredient.baseAmount * newPortion;
      return {...ingredient, amount: newAmount};
    });
    setIngredients(!updatedIngredients);
  };

  // Function to handle portion increase
  const increasePortion = () => {
    if (portion < 2) {
      // Assuming the maximum portion is 2
      const newPortion = portion + 1;
      setPortion(newPortion);
      updateIngredientsForPortion(newPortion);
    }
  };

  // Function to handle portion decrease
  const decreasePortion = () => {
    if (portion > 1) {
      // Assuming the minimum portion is 1
      const newPortion = portion - 1;
      setPortion(newPortion);
      updateIngredientsForPortion(newPortion);
    }
  };

  const toggleBottomToolbar = () => {
    Animated.timing(bottomBarPosition, {
      toValue: isBottomToolbarVisible ? 0 : -80, // Here, we change the target value based on the visibility
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsBottomToolbarVisible(!isBottomToolbarVisible); // Toggle the visibility state
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
          <TouchableOpacity onPress={() => {}} style={styles.favoriteButton}>
            <Image
              source={require('../../assets/heart.png')}
              style={styles.favoriteIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          <View style={styles.ingredientSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.ingredientTitle}>Ingredients</Text>
              <View style={styles.portionContainer}>
                <Text>Portions</Text>
                <TouchableOpacity
                  onPress={decreasePortion}
                  style={styles.portionButton}
                  disabled={true}>
                  <Text style={styles.portionButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.portionCount}>{portion}</Text>
                <TouchableOpacity
                  onPress={increasePortion}
                  style={styles.portionButton}
                  disabled={true}>
                  <Text style={styles.portionButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.ingredientGrid}>
              {ingredients.map((item, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.amountBubble}>
                    <Text style={styles.amountText}>
                      {portion === 1
                        ? item.baseAmount + ' ' + item.unit
                        : item.amount + ' ' + item.unit}
                    </Text>
                  </View>
                  <Text style={styles.ingredientName}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
          <InteractiveButton />
          <RecipeStep
            stepNumber="1"
            stepText="Preheat the oven to 450 degrees."
          />
          <RecipeStep
            stepNumber="2"
            stepText="Form the cookies into small 1.5 inch discs on a greased baking sheet."
          />
          <RecipeStep
            stepNumber="3"
            stepText="Once oven is preheated to 450 degrees, place the baking sheet in the oven, centre rack."
          />
          <RecipeStep stepNumber="4" stepText="Bake for 25 minutes. " />
          <RecipeStep
            stepNumber="5"
            stepText="After 25 minutes, remove from oven and let cookies settle for 10 minutes."
          />
          <RecipeStep stepNumber="6" stepText="Enjoy!" />
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
    height: 250, // Adjust the height as necessary
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
  ingredientName: {
    fontSize: 16,
    flexShrink: 1, // Allows text to shrink and wrap if necessary
    marginLeft: 5, // Adds space between the amount bubble and the ingredient name
  },
  readerButton: {
    backgroundColor: '#dbe7e0',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center', // Align button to the center
    width: '60%', // Set the width to 60% of the parent container
    marginTop: 10,
    marginBottom: 10,
  },
  readerButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  portionToggle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
    marginRight: 20,
  },
  portionText: {
    color: 'black',
    fontWeight: 'bold',
  },
  amountBubble: {
    backgroundColor: '#A9A9A9',
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 8,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  amountText: {
    fontSize: 14,
    textAlign: 'center',
  },
  portionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  portionButton: {
    backgroundColor: '#A9A9A9',
    padding: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  portionButtonText: {
    fontSize: 18,
    color: '#333',
  },
  portionCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'relative', // Added for absolute positioning of the sound icon
  },
  stepNumberBubble: {
    backgroundColor: '#000', // or your desired color
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 16,
    color: '#000', // or your desired color
    flexShrink: 1,
  },
  soundIconButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -10}], // Adjust as needed for vertical centering
  },
  soundIcon: {
    width: 30, // Adjust as needed
    height: 30, // Adjust as needed
  },
});

export default ReaderScreen;
