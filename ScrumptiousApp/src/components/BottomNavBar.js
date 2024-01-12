import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomNavBar = ({ onSearchPress, showSearchBar }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleArrowPress = () => {
    navigation.navigate('RecipeList');
  };

  return (
      <View style={styles.tabBar}>
        {showSearchBar ? (
            <View style={styles.searchBarContainer}>
              <TextInput
                  style={styles.input}
                  placeholder="Search..."
                  placeholderTextColor="black"
              />
              <TouchableOpacity style={[styles.iconButton, styles.closeIcon]} onPress={onSearchPress}>
                <Image
                    source={require('../assets/close.png')}
                    resizeMode="contain"
                    style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.iconButton, styles.arrowIcon]} onPress={handleArrowPress}>
                <Image
                    source={require('../assets/arrow.png')}
                    resizeMode="contain"
                    style={styles.icon}
                />
              </TouchableOpacity>
            </View>
        ) : (
            <>
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
            </>
        )}
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    flex: 1,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#FAF9F6',
    paddingLeft: 10,
  },
  iconButton: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  closeIcon: {
    right: 50,
  },
  arrowIcon: {
    right: 0,
  },
});

export default BottomNavBar;
