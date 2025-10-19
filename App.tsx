import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

// Import screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import RoomSelectionScreen from './src/screens/RoomSelectionScreen';
import RoomDashboardScreen from './src/screens/RoomDashboardScreen';
import InboxScreen from './src/screens/InboxScreen';
import ComposeScreen from './src/screens/ComposeScreen';
import LetterDetailScreen from './src/screens/LetterDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Import theme
import {theme} from './src/theme/theme';

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#6B46C1" />
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6B46C1',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: 'Sign In'}}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{title: 'Create Account'}}
          />
          <Stack.Screen
            name="RoomSelection"
            component={RoomSelectionScreen}
            options={{title: 'Your Room'}}
          />
          <Stack.Screen
            name="RoomDashboard"
            component={RoomDashboardScreen}
            options={{title: 'Room Dashboard'}}
          />
          <Stack.Screen
            name="Inbox"
            component={InboxScreen}
            options={{title: 'Letters'}}
          />
          <Stack.Screen
            name="Compose"
            component={ComposeScreen}
            options={{title: 'Write Letter'}}
          />
          <Stack.Screen
            name="LetterDetail"
            component={LetterDetailScreen}
            options={{title: 'Letter'}}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{title: 'Profile'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
