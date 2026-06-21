import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, ShortsScreen, UploadScreen, SearchScreen, ProfileScreen, VideoDetailScreen, LoginScreen, RegisterScreen } from '../screens';
import { FloatingTabBar } from '../components';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { tokenStorage } from '../services/storage';
import { setCredentials } from '../redux/authSlice';
import { theme } from '../theme/theme';

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

function LoadingScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}

export function RootNavigator() {
  const token = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    const restoreToken = async () => {
      try {
        const storedToken = await tokenStorage.getAccessToken();
        if (storedToken) {
          dispatch(setCredentials({ accessToken: storedToken }));
        }
      } catch (e) {
        console.error('Failed to restore token', e);
      } finally {
        setIsRestoring(false);
      }
    };
    restoreToken();
  }, [dispatch]);

  if (isRestoring) {
    return <LoadingScreen />;
  }

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


