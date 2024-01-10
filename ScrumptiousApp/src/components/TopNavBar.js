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
      {canGoBack ? (
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Image
            source={require('../assets/back.png')}
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={styles.navTitle}>{title}</Text>
      <View style={styles.placeholder} />
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
    padding: 10,
  },
  placeholder: {
    padding: 10,
    opacity: 0, // Make it invisible
  },
  icon: {
    width: 30,
    height: 30,
  },
  // Additional styles
});

export default TopNavBar;
