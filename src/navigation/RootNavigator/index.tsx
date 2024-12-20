import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Your screens
import HomeScreen from '../../screens/HomeScreen';
import SettingScreen from '../../screens/SettingScreen';
import ExpoAVVideoScreen from '../../screens/HomeScreen/ExpoScreens/ExpoAVVideoScreen';
import ExpoVideoScreen from '../../screens/HomeScreen/ExpoScreens/ExpoVideoScreen';
import ReactNativeVideoScreen from '../../screens/HomeScreen/ReactNativeVideoScreen';

// Create separate stack navigators for each tab
const HomeStack = createNativeStackNavigator();
const SettingStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeIndex" component={HomeScreen} />
      <HomeStack.Screen name="ExpoAVVideo" component={ExpoAVVideoScreen} />
      <HomeStack.Screen name="ExpoVideo" component={ExpoVideoScreen} />
      <HomeStack.Screen
        name="ReactNativeVideo"
        component={ReactNativeVideoScreen}
      />
    </HomeStack.Navigator>
  );
}

function SettingStackNavigator() {
  return (
    <SettingStack.Navigator screenOptions={{headerShown: false}}>
      <SettingStack.Screen name="SettingIndex" component={SettingScreen} />
    </SettingStack.Navigator>
  );
}

// Create the tab navigator
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name="SettingTab"
        component={SettingStackNavigator}
        options={{title: 'Settings'}}
      />
    </Tab.Navigator>
  );
}

// Create the root stack
const RootStack = createNativeStackNavigator();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {/* Main entry point is the tab navigator */}
        <RootStack.Screen name="Tabs" component={Tabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
