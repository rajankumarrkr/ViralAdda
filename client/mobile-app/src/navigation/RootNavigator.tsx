import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, ShortsScreen, UploadScreen, SearchScreen, ProfileScreen, VideoDetailScreen, LoginScreen, RegisterScreen } from '../screens';
import { FloatingTabBar } from '../components';
import { useAppSelector } from '../hooks/redux';

export type RootStackParamList = {
  Tabs: undefined;
  VideoDetail: { id: string };
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tabs.Navigator
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Shorts" component={ShortsScreen} />
      <Tabs.Screen name="Upload" component={UploadScreen} />
      <Tabs.Screen name="Search" component={SearchScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  const token = useAppSelector((state) => state.auth.accessToken);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="VideoDetail" component={VideoDetailScreen} options={{ title: 'Watch' }} />
      {!token && (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

