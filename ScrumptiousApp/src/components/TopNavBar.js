// src/components/TopNavBar.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const TopNavBar = ({title}) => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navTitle}>{title}</Text>
      <TouchableOpacity style={styles.hamburger}>
        <Image
          source={require('../assets/menu.png')}
          resizeMode="contain"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: '#efe4e1',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  navTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000000',
  },
  icon: {
    width: 30,
    height: 30,
  },
  // Add any additional styles you may need
});

export default TopNavBar;
