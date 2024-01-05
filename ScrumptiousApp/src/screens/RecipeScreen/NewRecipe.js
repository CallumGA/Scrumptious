import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Switch,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

const NewRecipe = () => {
  const [url, setUrl] = useState('');
  const [saveToggle, setSaveToggle] = useState(false);
  const [interactiveModeToggle, setInteractiveModeToggle] = useState(false);
  const [readerModeToggle, setReaderModeToggle] = useState(false);
  const [isBottomToolbarVisible, setIsBottomToolbarVisible] = useState(true);
  const bottomBarPosition = useState(new Animated.Value(0))[0];
  const navigation = useNavigation();

  const renderToggle = (value, onValueChange, label) => (
    <View style={styles.toggleRow}>
      <Text style={styles.optionText}>{label}</Text>
      <Switch
        trackColor={{false: '#FFFFFF', true: '#FFFFFF'}}
        thumbColor={value ? '#000000' : '#f4f3f4'}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );

  const toggleBottomToolbar = () => {
    Animated.timing(bottomBarPosition, {
      toValue: isBottomToolbarVisible ? -100 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsBottomToolbarVisible(!isBottomToolbarVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <TopNavBar
          title="Scrumptious"
          onMenuPress={toggleBottomToolbar}
          navigation={navigation}
        />
        <View style={styles.mainContent}>
          <View style={styles.content}>
            <Text style={styles.header}>RECIPE URL</Text>
            {renderToggle(saveToggle, setSaveToggle, 'Save')}
            {renderToggle(
              interactiveModeToggle,
              setInteractiveModeToggle,
              'Interactive Mode',
            )}
            {renderToggle(readerModeToggle, setReaderModeToggle, 'Reader Mode')}
            <Text>
              Enter the URL of the recipe you want to parse. Ensure the URL is
              to the recipe's main page. You also must ensure the recipe site is
              supported by this application.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setUrl}
              value={url}
              placeholder="https://yummly.com/chocolate-cookies...."
              placeholderTextColor="#888"
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('RecipeLanding')}>
              <Image
                source={require('../../assets/arrow.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
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
      </View>
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
  mainContent: {
    backgroundColor: '#dbe7e0',
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center', // Centers the header text
    marginBottom: 40, // Space between header and toggles
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 100,
    backgroundColor: '#FAF9F6',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#FAF9F6',
  },
  addButton: {
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20, // More space around the toggle
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginHorizontal: 20, // Space from the sides of the screen
    marginBottom: 20, // More space between individual toggles
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
  },
  bottomNavBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 40,
  },
});

export default NewRecipe;
