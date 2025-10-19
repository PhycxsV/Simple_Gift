import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.romanticdiary.app',
  appName: 'Romantic Diary',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
