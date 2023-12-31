import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions, // Import Dimensions to get screen dimensions
} from 'react-native';
import HomeScreenService from '../../services/HomeScreenService';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

const images = {
  Desert: require('../../assets/dessert.jpeg'),
  Dinner: require('../../assets/dinner.jpeg'),
  Breakfast: require('../../assets/breakfast.jpeg'),
  Lunch: require('../../assets/lunch.jpeg'),
};

const {width, height} = Dimensions.get('window'); // Get the width and height of the screen

const HomeScreen = () => {
  const [sections, setSections] = useState([]);

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

  const handlePressSection = section => {
    console.log(`Section pressed: ${section}`);
  };

  const getImageForSection = sectionName => {
    return images[sectionName] || images.default;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TopNavBar title="Scrumptious" />
      <Image
        source={require('../../assets/banner.jpeg')}
        style={styles.bannerImage}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        {sections.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.sectionCard}
            onPress={() => handlePressSection(item.section)}
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
      <BottomNavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  sectionCard: {
    backgroundColor: '#dbe7e0',
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center', // Center the card within the ScrollView
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  sectionImage: {
    width: 80, // Set your desired size
    height: 80, // Set your desired size
    borderRadius: 10, // This will round all corners
    marginRight: 55, // Add some spacing between the image and the text
  },
  sectionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5d4037',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  bannerImage: {
    width: width, // Full width of the screen
    height: height / 4, // 1/4th of the screen height
    resizeMode: 'cover', // or 'contain' to fit the image within the width and height
  },
});

export default HomeScreen;
