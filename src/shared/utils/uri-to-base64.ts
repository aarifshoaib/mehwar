import RNFS from 'react-native-fs';

export const uriToBase64 = async (uri: string) => {
  const base64 = await RNFS.readFile(uri, 'base64');
  return base64;
};