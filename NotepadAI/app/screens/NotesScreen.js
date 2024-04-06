import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../misc/colors'
import SearchBar from '../components/SearchBar'
import RoundIconBtn from '../components/RoundIconBtn'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Note from '../components/note'
import { useNotes, useTheme } from '../context/NoteContext'
import NotFound from '../components/NotFound'
import IconView from '../components/Icon'
import SplashScreen from '../components/SplashScreen'

const reverseData = data => {
    return data.sort((a, b) => {
      const aInt = parseInt(a.time);
      const bInt = parseInt(b.time);
      if (aInt < bInt) return 1;
      if (aInt == bInt) return 0;
      if (aInt > bInt) return -1;
    });
  };

export default function NotesScreen({user, navigation, route}) {
    const [greet, setGreet] = useState("");
    const {notes, setNotes, findNotes} = useNotes();
    const {theme, setTheme} = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [resultNotFound, setResultNotFound] = useState(false);
    const [SplashVisible, setSplashVisible] = useState(true);

    const findGreet = () => {
        const hrs = new Date().getHours()
        if (hrs < 12) return setGreet("ое утро")
        if (hrs >= 12 && hrs < 18) return setGreet("ый день")
        if (hrs >= 18) return setGreet("ый вечер")
    }

    const handleOnSearchInput = async text => {
        setSearchQuery(text);
        if (!text.trim()) {
          setSearchQuery('');
          setResultNotFound(false);
          return await findNotes();
        }
        const filteredNotes = notes.filter(note => {
          if (note.title.toLowerCase().includes(text.toLowerCase())) {
            return note;
          }
        });
    
        if (filteredNotes.length) {
          setNotes([...filteredNotes]);
        } else {
          setResultNotFound(true);
        }
      };

    
    const handleOnClear = async () => {
        setSearchQuery('');
        setResultNotFound(false);
        await findNotes();
      };

    const handleOnSubmit = async (title, desc, color) => { 
        const note = {id: Date.now(), time: Date.now(), title, desc, color};
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
    }

    const openNote = (note) => {
        navigation.navigate('NoteDetail', {note})
    }

    const handleOnSplashEnding = async (nextScreen) => {
        setSplashVisible(false);
        if (nextScreen) {
            navigation.navigate(nextScreen);
        };
    }


    useEffect(() => {
        if (route.params?.post) {
            let title = route.params.post.title;
            let desc = route.params.post.desc;
            let color = route.params.post.color;
            handleOnSubmit(title, desc, color);
        }
      }, [route.params?.post]);


    useEffect(() => {
        findGreet();
    }, [])

  return (
    <>
        <StatusBar barStyle={(theme === 'light') ? 'dark-content': 'light-content'} backgroundColor={(theme === 'light') ? colors.LIGHT: colors.PRIMARY_DARK} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, {backgroundColor: (theme === 'light') ? colors.LIGHT : colors.PRIMARY_DARK}]}>
            <View style={styles.userBar}>
                <Text style={[styles.header, {color: (theme === 'light') ? colors.TEXT : colors.TEXT_DARK}]}>{`Добр${greet}, ${user.name}!`}</Text>
                {/* <RoundIconBtn IconName="user-minus" size={12} style={styles.deleteBtn} onPress={async () => {await AsyncStorage.clear(); console.log("Storage cleared")}} /> */}
                <View style={styles.settingBtn}>
                    <IconView IconName='setting' type='AntDesign' size={28} onPress={() => {navigation.navigate('Settings')}} theme={theme}/>
                </View>
            </View>
            {(notes.length) ? 
                <SearchBar value={searchQuery}
                    onChangeText={handleOnSearchInput}
                    onClear={handleOnClear}
                    containerStyle={styles.search}
                    theme={theme}
                />
            : null}

            {resultNotFound ? <NotFound/> : 
            <FlatList 
                numColumns={2} 
                data={reverseData(notes)}
                columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 15, padding: 2}}
                keyExtractor={item => item.id.toString()} 
                renderItem={({item}) => <Note onPress={() => {openNote(item)}} item={item} theme={theme}/>}
            />}
            
            {(!notes.length) ? 
            <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
                <Text style={[styles.emptyHeader, {color: (theme === 'light') ? colors.TEXT : colors.TEXT_DARK}]}>Добавьте записи</Text>
            </View>
            : null}
        </View>
        </TouchableWithoutFeedback>
        <RoundIconBtn IconName="plus" style={styles.addBtn} onPress={() => {navigation.navigate("NoteInputScreen", {})}}/>
        <SplashScreen visible={SplashVisible} onAnimationFinish={handleOnSplashEnding} />
    </>
  )
}



const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        zIndex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        opacity: 0.9
    },
    text: {
        color: colors.TEXT
    },
    emptyHeader : {
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.3
    },
    emptyHeaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1
    },
    addBtn: {
        position: 'absolute',
        right: 15,
        bottom: 50,
        zIndex: 1,
        color: colors.LIGHT
    },
    userBar: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    deleteBtn: {
        marginLeft: 5,
        padding: 10,
        borderRadius: 10
    },
    search: {
        marginVertical: 15,
    },
    settingBtn: {
        justifyContent: 'center'
    }
});
