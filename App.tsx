import React, { useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import RootProvider from "./src/providers";
import { NavigationContainer } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context'; 

import { Home } from "./src/screens/Homes";
import { Store } from "./src/screens/Store";
import Swap from "./src/screens/Swap";
import NFTDetail from "./src/screens/NftDetail";
import NFTDetailList from "./src/screens/NftDetail_forList";
import { Owns } from "./src/screens/Owns";

import { StateContextProvider } from "./src/context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ShoppingBagIcon, ArrowPathRoundedSquareIcon } from 'react-native-heroicons/outline';

export default function App() {

  const SplashScreenHide = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('#D9D9D9'); // Change color navigation system for android device
    }
  }, []);

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function StoreStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="StoreMain" component={Store} options={{ headerShown: false }} />
        <Stack.Screen name="NftDetailList" component={NFTDetailList} options={{ headerShown: false }} />
        <Stack.Screen name="NftDetail" component={NFTDetail} options={{ headerShown: false }} />
        <Stack.Screen name="Owns" component={Owns} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

  function StoreTabNavigation() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'black',
          tabBarStyle: styles.tabBarStyle,
          tabBarIconStyle: styles.tabBarIconStyle,
        }}
      >
        <Tab.Screen
          name="Store"
          component={StoreStackNavigator}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => <ShoppingBagIcon color={color} size={size} />
          }} />
        <Tab.Screen
          name="Swap"
          component={Swap}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => <ArrowPathRoundedSquareIcon color={color} size={size} />
          }} />
      </Tab.Navigator>

    );
  }

  function AppNavigation() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="Betting"
          component={Betting}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen name="StoreTab"
          component={StoreTabNavigation}
          options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

  return (
    <RootProvider>
      <StateContextProvider>
        <NavigationContainer>
          <StatusBar style="auto" hidden />
          <AppNavigation />
        </NavigationContainer>
      </StateContextProvider>
    </RootProvider>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Platform.OS === 'android' ? '#D9D9D9' : '#FFFFFF',
    position: 'relative',
    height: Platform.OS === 'ios' ? 60 : 50,
  },
  tabBarIconStyle: {
    top: Platform.OS === 'ios' ? 20 : 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
