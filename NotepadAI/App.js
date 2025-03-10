import 'react-native-gesture-handler';
import { StyleSheet, useColorScheme, Easing, View } from 'react-native';
import Intro from './app/screens/Intro';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotesScreen from './app/screens/NotesScreen';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteDetail from './app/screens/NoteDetail';
import colors from './app/misc/colors';
import { APISContext, NoteContext, ThemeContext, UserContext } from './app/context/NoteContext';
import NoteInputScreen from './app/screens/NoteInputScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import {setBackgroundColorAsync} from 'expo-navigation-bar';
import APIKeysScreen from './app/screens/APIKeysScreen';


const Stack = createNativeStackNavigator();


export default function App() {
      const [user, setUser] = useState({});
      const [notes, setNotes] = useState([]);
      const [isFirstTime, setIsFirstTime] = useState(true);
      const [theme, setTheme] = useState('light');
      (theme == "light") ? setBackgroundColorAsync(colors.LIGHT) : setBackgroundColorAsync(colors.PRIMARY_DARK);
      const [backgroundColor, setBackgroundColor] = useState((theme === 'light') ? colors.LIGHT: colors.PRIMARY_DARK);
      const [textColor, setTextColor] = useState((theme === 'light') ? colors.TEXT: colors.TEXT_DARK);
      const [GoogleAPIKey, setGoogleAPIKey] = useState('');
      const [TogetherAPIKey, setTogetherAPIKey] = useState('');
      // TODO realize api keys DB

      // {"Google": "key"; "Together": "key"}
      const findAPIs = async () => {
        const result = await AsyncStorage.getItem('apis');
        if (result !== null) {
          let res = JSON.parse(result);
          console.log(res);
          setGoogleAPIKey(res["Google"]);
          setTogetherAPIKey(res["Together"]);
        }
      };

      const saveAPIs = async (Google, Together) => {
        let newAPIs = {}
        if (Google != null) newAPIs["Google"] = Google;
        if (Together != null) newAPIs["Together"] = Together;
        setGoogleAPIKey(Google);
        setTogetherAPIKey(Together);
        console.log(newAPIs);
        await AsyncStorage.setItem('apis', JSON.stringify(newAPIs));
      }
      
      // [{note}, {note} ... ]
      const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes');
        if (result !== null) setNotes(JSON.parse(result));
      };

      // "username"
      const findUser = async () => {
        const result = await AsyncStorage.getItem('user');
        if (result) {
          setUser(JSON.parse(result));
        };
      };

      const setCurrentColorNavBar = (theme) => {
        if (theme == "light") {
          setBackgroundColorAsync(colors.LIGHT);
        } if (theme == 'dark') {
          setBackgroundColorAsync(colors.PRIMARY_DARK);
        }
      }

      const getThemeDB = async () => {
        const themeDB = await AsyncStorage.getItem('theme');
        return themeDB
      }

      const getallkeysDB = async () => {
        const us = await AsyncStorage.getAllKeys();
        console.log(us);
      }

      const setThemeDB = async (gonaBe) => {
        await AsyncStorage.setItem('theme', gonaBe)
      }

      useEffect(() => {
        if (theme == "light") {
          setBackgroundColor(colors.LIGHT);
          setTextColor(colors.TEXT);
        } if (theme == 'dark') {
          setBackgroundColor(colors.PRIMARY_DARK);
          setTextColor(colors.TEXT_DARK);
        }
        setCurrentColorNavBar(theme);
      }, [theme])


      useEffect(() => {
        if (isFirstTime) {
          setIsFirstTime(false);
          findAPIs();
          getThemeDB().then((themeDB) => {
            const db_theme = themeDB
            if (db_theme == undefined) {
              setThemeDB(JSON.stringify({type: "light"}));
            } else {
              setTheme(JSON.parse(db_theme).type);
            }
          })
        }
        findUser();
        findNotes();
      }, []);

    return (
        <NavigationContainer>
          <ThemeContext.Provider value={{theme, setTheme, backgroundColor, textColor, setCurrentColorNavBar}}>
          <APISContext.Provider value={{GoogleAPIKey, setGoogleAPIKey, TogetherAPIKey, setTogetherAPIKey, saveAPIs}}>
          <NoteContext.Provider value={{notes, setNotes, findNotes}}>
          <UserContext.Provider value={{findUser}}>
          <View style={[{backgroundColor: backgroundColor}, StyleSheet.absoluteFill]}>
            <Stack.Navigator screenOptions={{headerTitle: '', headerTransparent: true, headerShown: false}}>
              <Stack.Screen name='NotesScreen'>
                {(props) => <NotesScreen {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen name='IntroScreen'>
                {(props) => <Intro {...props} onComplete={findUser} saveAPIs={saveAPIs} />}
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
              <Stack.Screen name='APIKeysScreen'>
                {(props) => <APIKeysScreen {...props} />}
              </Stack.Screen>
            </Stack.Navigator>
          </View>
          </UserContext.Provider>
          </NoteContext.Provider>
          </APISContext.Provider>
          </ThemeContext.Provider>
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
