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
  FlatList,
} from 'react-native';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const RecipeLanding = () => {
  const [isBottomToolbarVisible, setIsBottomToolbarVisible] = useState(true);
  const bottomBarPosition = useState(new Animated.Value(0))[0];
  const navigation = useNavigation();
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const ReaderButton = () => (
    <TouchableOpacity
      style={styles.readerButton}
      onPress={() => navigation.navigate('ReaderScreen')}>
      <Text style={styles.readerButtonText}>Reader Mode</Text>
    </TouchableOpacity>
  );

  const OptionOneButton = () => (
    <TouchableOpacity
      style={styles.optionButton}
      onPress={() => replaceIngredient('cocoa powder')}>
      <Text style={styles.readerButtonText}>cocoa powder</Text>
    </TouchableOpacity>
  );

  const OptionTwoButton = () => (
    <TouchableOpacity
      style={styles.optionButton}
      onPress={() => replaceIngredient('milk chocolate')}>
      <Text style={styles.readerButtonText}>milk chocolate</Text>
    </TouchableOpacity>
  );

  const CancelButton = () => (
    <TouchableOpacity style={styles.cancelButton}>
      <Text style={styles.readerButtonText}>Cancel</Text>
    </TouchableOpacity>
  );

  const [ingredients, setIngredients] = useState([
    {baseAmount: 1, unit: 'cup', name: 'peanut butter'},
    {baseAmount: 1, unit: 'cup', name: 'coconut sugar'},
    {baseAmount: 2, unit: 'tsp', name: 'chocolate sauce'},
    {baseAmount: 4, unit: 'tsp', name: 'corn flour'},
    {baseAmount: 1, unit: '', name: 'egg'},
  ]);

  const [portion, setPortion] = useState(1);

  // Function to handle ingredient selection
  const selectIngredient = ingredient => {
    setSelectedIngredient(ingredient);
  };

  const replaceIngredient = newIngredient => {
    const newIngredients = ingredients.map(ingredient => {
      if (ingredient.name === 'chocolate sauce') {
        return {...ingredient, name: newIngredient};
      }
      return ingredient;
    });
    setIngredients(newIngredients);
    setSelectedIngredient(null); // Reset selection
  };

  const updateIngredientsForPortion = newPortion => {
    const updatedIngredients = ingredients.map(ingredient => {
      const newAmount = ingredient.baseAmount * newPortion;
      return {...ingredient, amount: newAmount};
    });
    setIngredients(updatedIngredients);
  };

  const increasePortion = () => {
    if (portion < 2) {
      const newPortion = portion + 1;
      setPortion(newPortion);
      updateIngredientsForPortion(newPortion);
    }
  };

  const decreasePortion = () => {
    if (portion > 1) {
      const newPortion = portion - 1;
      setPortion(newPortion);
      updateIngredientsForPortion(newPortion);
    }
  };

  const toggleBottomToolbar = () => {
    Animated.timing(bottomBarPosition, {
      toValue: isBottomToolbarVisible ? -100 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsBottomToolbarVisible(!isBottomToolbarVisible);
  };

  const renderIngredientItem = ({item, index}) => (
    <TouchableOpacity
      key={index}
      style={styles.ingredientItem}
      onPress={() => selectIngredient(item.name)}>
      <View style={styles.amountBubble}>
        <Text style={styles.amountText}>
          {portion === 1 ? item.baseAmount : item.amount} {item.unit}
        </Text>
      </View>
      <Text style={styles.ingredientName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <TopNavBar
          title="Chocolate cookies"
          onMenuPress={toggleBottomToolbar}
          navigation={navigation}
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
        <View style={styles.ingredientSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.ingredientTitle}>Ingredients</Text>
            <View style={styles.portionContainer}>
              <TouchableOpacity
                onPress={decreasePortion}
                style={styles.portionButton}>
                <Text style={styles.portionButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.portionCount}>{portion}</Text>
              <TouchableOpacity
                onPress={increasePortion}
                style={styles.portionButton}>
                <Text style={styles.portionButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={ingredients}
            renderItem={renderIngredientItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        </View>
        {selectedIngredient === 'chocolate sauce' ? (
          <View>
            <OptionOneButton />
            <OptionTwoButton />
            <CancelButton />
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={styles.startCookingButton}
              onPress={() => navigation.navigate('InteractiveRecipe')}>
              <Text style={styles.startCookingButtonText}>Start Cooking</Text>
            </TouchableOpacity>
            <ReaderButton />
          </>
        )}
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
    fontSize: 20,
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
    paddingVertical: 2,
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
    marginBottom: 90,
  },
  optionButton: {
    backgroundColor: '#dbe7e0',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center', // Align button to the center
    width: '60%', // Set the width to 60% of the parent container
    marginBottom: 10,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#FFB3B3',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center', // Align button to the center
    width: '60%', // Set the width to 60% of the parent container
    marginBottom: 10,
    marginTop: 20,
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
  // Restore your ingredient bubble styles here
  amountBubble: {
    backgroundColor: 'white',
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
    backgroundColor: '#ddd',
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
  startCookingButton: {
    backgroundColor: '#4CAF50', // A green color for visibility
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center', // Align button to the center
    width: '60%', // Set the width to 60% of the parent container
    marginBottom: 20,
    marginTop: 60,
  },
  startCookingButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RecipeLanding;
