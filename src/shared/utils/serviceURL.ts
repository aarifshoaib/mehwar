import { Platform } from 'react-native';
import { env } from '../../../env/env.dev';

export const serviceURL = async (_url) => {
  const updatedUrl = await _url.replace('localhost', env.ipAddress);
  let url = _url;
  if (Platform.OS === 'android') {
    url = await updatedUrl;
  }
  return url;
};
