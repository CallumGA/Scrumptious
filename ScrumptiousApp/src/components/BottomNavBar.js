import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const BottomNavBar = ({onMenuPress, onSearchPress}) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.tabBar}>
      {route.name === 'Home' && (
        <TouchableOpacity onPress={onSearchPress}>
          <Image
            source={require('../assets/search.png')}
            resizeMode="contain"
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('../assets/home.png')}
          resizeMode="contain"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('NewRecipe')}>
        <Image
          source={require('../assets/eat.png')}
          resizeMode="contain"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#efe4e1',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default BottomNavBar;
