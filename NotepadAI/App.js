
import { StyleSheet } from 'react-native';
import Intro from './app/screens/Intro';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotesScreen from './app/screens/NotesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteDetail from './app/components/NoteDetail';
import colors from './app/misc/colors';
import { NoteContext } from './app/context/NoteContext';
import OCR from './app/components/OCR';
import AIScreen from './app/screens/AIScreen';


const Stack = createNativeStackNavigator();


export default function App() {
      const [user, setUser] = useState({});
      const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
      const [headerShown, SetHeaderShown] = useState(true);
      const [notes, setNotes] = useState([]);

      const findNotes = async () => {
        const result = await AsyncStorage.getItem('notes');
        if (result !== null) setNotes(JSON.parse(result));
      };

      const findUser = async () => {
        const result = await AsyncStorage.getItem('user');
        if (result === null) {
          return setIsAppFirstTimeOpen(true)
        };
        setUser(JSON.parse(result));
        setIsAppFirstTimeOpen(false);
      };

      const onSubmit = async (note) => {
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
      }

      useEffect(() => {
        findUser();
        findNotes();
        SetHeaderShown(false);
      }, []);

      if (isAppFirstTimeOpen) return <Intro onComplete={findUser} />;

    return (
        <NavigationContainer>
          <NoteContext.Provider value={{notes, setNotes, findNotes}}>
            <Stack.Navigator screenOptions={{headerTitle: '', headerTransparent: true}}>
              <Stack.Screen name='NotesScreen'>
                {(props) => <NotesScreen {...props} notes={notes} user={user} onSubmit={onSubmit} />}
              </Stack.Screen>
              <Stack.Screen name='NoteDetail'>
                {(props) => <NoteDetail {...props}  />}
              </Stack.Screen>
              <Stack.Screen name='OCR'>
                {(props) => <OCR {...props}  />}
              </Stack.Screen>
              <Stack.Screen name='AIScreen'>
                {(props) => <AIScreen {...props}  />}
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
