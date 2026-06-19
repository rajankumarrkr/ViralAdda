import { Platform } from 'react-native';
import Constants from 'expo-constants';

/**
 * API_BASE_URL resolution order:
 * 1. Expo extra config (app.json -> expo.extra.apiBaseUrl)
 * 2. Platform-aware default:
 *    - Android emulator: 10.0.2.2 (special alias for host loopback)
 *    - Physical device / iOS sim: machine LAN IP
 */
const DEV_LAN_IP = '172.20.10.2';
const API_PORT = 5001;

function getDefaultBaseUrl(): string {
  if (__DEV__) {
    // Android emulator uses 10.0.2.2 to reach host machine
    const host = Platform.OS === 'android' ? '10.0.2.2' : DEV_LAN_IP;
    return `http://${host}:${API_PORT}/api`;
  }
  // Production: replace with your deployed API URL
  return `http://${DEV_LAN_IP}:${API_PORT}/api`;
}

export const API_BASE_URL: string =
  Constants.expoConfig?.extra?.apiBaseUrl ?? getDefaultBaseUrl();
