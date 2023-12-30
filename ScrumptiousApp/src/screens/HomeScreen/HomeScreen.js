import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import HomeScreenService from '../../services/HomeScreenService';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

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
    // Placeholder for handling button press, replace with your navigation logic
    console.log(`Section pressed: ${section}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TopNavBar title="Scrumptious" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}>
        {sections.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.sectionCard}
            onPress={() => handlePressSection(item.section)} // Handle press event
            activeOpacity={0.7} // Optional: Feedback opacity on press
          >
            {/*<Image*/}
            {/*  source={{uri: 'path-to-your-image'}} // Replace with your image URI*/}
            {/*  style={styles.sectionImage}*/}
            {/*/>*/}
            <Text style={styles.sectionText}>{item.section}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomNavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  sectionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5d4037',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  // Add any additional styles you may need
});

export default HomeScreen;
