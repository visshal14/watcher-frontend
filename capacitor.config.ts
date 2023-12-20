import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';
const config: CapacitorConfig = {
  appId: 'com.visshal.app',
  appName: 'watcher',
  webDir: 'build',
  // server: {
  //   // url: "http://192.168.1.7:3000",
  //   url: "http://192.168.29.25:3000",
  //   cleartext: true,
  //   androidScheme: 'https'
  // },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      iosClientId: "818310470936-g1inflf4pmkg11o5kon9r9gclbrbrrre.apps.googleusercontent.com",
      serverClientId: "818310470936-eikcvjh9v65bko219hjbonmt8vv9q23j.apps.googleusercontent.com",
      androidClientId: "818310470936-eikcvjh9v65bko219hjbonmt8vv9q23j.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    },
    Keyboard: {
      resize: KeyboardResize.Body,
      style: KeyboardStyle.Dark,
      resizeOnFullScreen: true,
    },
  },

};

export default config;
