
import { StyleSheet, useColorScheme } from 'react-native';
import Intro from './app/screens/Intro';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotesScreen from './app/screens/NotesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteDetail from './app/screens/NoteDetail';
import colors from './app/misc/colors';
import { NoteContext } from './app/context/NoteContext';
import NoteInputScreen from './app/screens/NoteInputScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import SplashScreen from './app/screens/SplashScreen';


const Stack = createNativeStackNavigator();


export default function App() {
      const [user, setUser] = useState({});
      const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(true);
      const [notes, setNotes] = useState([]);
      const them = (useColorScheme() != null) ? useColorScheme() : 'light'
      // console.log("[PREF_THEME]" + useColorScheme())
      const [theme, setTheme] = useState(them);

      const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes');
        if (result !== null) setNotes(JSON.parse(result));
      };

      const findUser = async () => {
        const result = await AsyncStorage.getItem('user');
        if (result) {
          
          setUser(JSON.parse(result));
        };
      };

      useEffect(() => {
        findUser();
        findNotes();
      }, []);

    return (
        <NavigationContainer>
          <NoteContext.Provider value={{notes, setNotes, findNotes, theme, setTheme}}>
            <Stack.Navigator cardStyle={{backgroundColor: (theme == 'light') ? colors.LIGHT : colors.PRIMARY_DARK}} screenOptions={{headerTitle: '', headerTransparent: true, headerShown: false}}>
              <Stack.Screen name='SplashScreen'>
                {(props) => <SplashScreen {...props}/>}
              </Stack.Screen>
              <Stack.Screen name='IntroScreen'>
                {(props) => <Intro {...props} onComplete={findUser} />}
              </Stack.Screen>
              <Stack.Screen name='NotesScreen'>
                {(props) => <NotesScreen {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen name='NoteDetail'>
                {(props) => <NoteDetail {...props}  />}
              </Stack.Screen>
              <Stack.Screen name='NoteInputScreen'>
                {(props) => <NoteInputScreen {...props} />}
              </Stack.Screen>
              <Stack.Screen name='Settings'>
                {(props) => <SettingsScreen {...props} />}
              </Stack.Screen>
            </Stack.Navigator>
          </NoteContext.Provider>
        </NavigationContainer>
    );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.LIGHT,
        alignItems: 'center',
        justifyContent: 'center',
      }
});
