import { ExpoConfig } from 'expo/config';
import { config } from 'dotenv';
import path from 'path';



const env_file = path.join(__dirname, '.env');
const env = config({
  path: env_file,
});

if (env.error) {
  console.log('ENV FILE ERROR: ', env_file);
  throw env.error;
}


export default{
  "expo": {
    "name": "ChatIn",
    "slug": "chatin",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "plugins": ["@react-native-google-signin/google-signin"],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "package": "com.srai86825.chatin",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "GoogleServiceFile":process.env.GOOGLE_SERVICES_FILE,
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "2f7c32ba-f304-482c-a8de-6bc11f99041a"
      }
    },
    "owner": "srai86825"
  }
}
