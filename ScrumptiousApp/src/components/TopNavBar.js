import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const TopNavBar = ({title, onMenuPress, navigation}) => {
  const canGoBack = navigation && navigation.canGoBack();

  const handleBackPress = () => {
    if (canGoBack) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.navbar}>
      {canGoBack && (
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image
            source={require('../assets/back.png')}
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.navTitle}>{title}</Text>
      <TouchableOpacity style={styles.hamburger} onPress={onMenuPress}>
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
  backButton: {
    padding: 10, // Add padding for touch area
  },
  hamburger: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  // Additional styles
});

export default TopNavBar;
