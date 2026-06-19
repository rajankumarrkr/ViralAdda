import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCESS_TOKEN = 'viraladda.accessToken';
const REFRESH_TOKEN = 'viraladda.refreshToken';

export const tokenStorage = {
  async getAccessToken() {
    return AsyncStorage.getItem(ACCESS_TOKEN);
  },
  async setTokens(accessToken: string, refreshToken: string) {
    await AsyncStorage.multiSet([
      [ACCESS_TOKEN, accessToken],
      [REFRESH_TOKEN, refreshToken]
    ]);
  },
  async clear() {
    await AsyncStorage.multiRemove([ACCESS_TOKEN, REFRESH_TOKEN]);
  }
};
