// src/screens/HomeScreen/HomeScreen.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreenService from '../../services/HomeScreenService';


const HomeScreen = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await HomeScreenService.ping();
        console.log('Data from API:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ScrumptiousApp!</Text>
      {/* Other UI elements */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default HomeScreen;
