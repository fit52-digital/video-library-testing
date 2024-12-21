import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Your screens
import HomeScreen from '../../screens/HomeScreen';
import SettingScreen from '../../screens/SettingScreen';
import ExpoAVVideoScreen from '../../screens/HomeScreen/ExpoScreens/ExpoAVVideoScreen';
import ExpoVideoScreenTest1 from '../../screens/HomeScreen/ExpoScreens/ExpoVideoScreenTest1';
import ReactNativeVideoScreen from '../../screens/HomeScreen/ReactNativeVideoScreen';
import ExpoVideoScreenTest2 from '../../screens/HomeScreen/ExpoScreens/ExpoVideoScreenTest2';
import ExpoAVAudioScreen from '../../screens/HomeScreen/ExpoScreens/ExpoAVAudioScreen';
import ExpoAudioScreenTest1 from '../../screens/HomeScreen/ExpoScreens/ExpoAudioScreenTest1';
import ExpoAVTestScreen1 from '../../screens/HomeScreen/ExpoScreens/ExpoAVScreenTest1';
import ExpoVideoAndAudioScreenTest1 from '../../screens/HomeScreen/ExpoScreens/ExpoVideoAndAudioScreenTest1';

// Create separate stack navigators for each tab
const HomeStack = createNativeStackNavigator();
const SettingStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeIndex" component={HomeScreen} />
      <HomeStack.Screen name="ExpoAVVideo" component={ExpoAVVideoScreen} />
      <HomeStack.Screen name="ExpoAVAudio" component={ExpoAVAudioScreen} />
      <HomeStack.Screen
        name="ExpoVideoTest1"
        component={ExpoVideoScreenTest1}
      />
      <HomeStack.Screen
        name="ExpoVideoTest2"
        component={ExpoVideoScreenTest2}
      />
      <HomeStack.Screen
        name="ExpoAudioTest1"
        component={ExpoAudioScreenTest1}
      />
      <HomeStack.Screen name="ExpoAVTest1" component={ExpoAVTestScreen1} />
      <HomeStack.Screen
        name="ExpoVideoAndAudioTest1"
        component={ExpoVideoAndAudioScreenTest1}
      />

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
