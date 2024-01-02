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
} from 'react-native';

import HomeScreenService from '../../services/HomeScreenService';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

const images = {
  Dessert: require('../../assets/desert.jpeg'),
  Dinner: require('../../assets/dinner.jpeg'),
  Breakfast: require('../../assets/breakfast.jpeg'),
  Lunch: require('../../assets/lunch.jpeg'),
};

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const [sections, setSections] = useState([]);
  const [isBottomToolbarVisible, setIsBottomToolbarVisible] = useState(true);
  const bottomBarPosition = useState(new Animated.Value(0))[0]; // Initialize Animated.Value

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
        <TopNavBar title="Scrumptious" onMenuPress={toggleBottomToolbar} />
        <Image
          source={require('../../assets/banner.jpeg')}
          style={{width: width, height: height / 4, resizeMode: 'cover'}}
        />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}>
          {sections.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.sectionCard}
              onPress={() => console.log(`Section pressed: ${item.section}`)}
              activeOpacity={0.7}>
              <View style={styles.cardContent}>
                <Image
                  source={getImageForSection(item.section)}
                  style={styles.sectionImage}
                />
                <Text style={styles.sectionText}>{item.section}</Text>
              </View>
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
        <BottomNavBar />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#efe4e1', // The color for the safe area
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // The color for the main content area
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dbe7e0',
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 55,
  },
  sectionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5d4037',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  bottomNavBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 70,
  },
});

export default HomeScreen;
