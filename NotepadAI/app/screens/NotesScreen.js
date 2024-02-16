import { StyleSheet, Text, View, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../misc/colors'
import SearchBar from '../components/SearchBar'
import RoundIconBtn from '../components/RoundIconBtn'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NoteInputModal from '../components/NoteInputModal'
import Note from '../components/note'
import { useNotes } from '../context/NoteContext'
import NotFound from '../components/NotFound'

const reverseData = data => {
    return data.sort((a, b) => {
      const aInt = parseInt(a.time);
      const bInt = parseInt(b.time);
      if (aInt < bInt) return 1;
      if (aInt == bInt) return 0;
      if (aInt > bInt) return -1;
    });
  };

export default function NotesScreen({user, navigation}) {
    const [greet, setGreet] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const {notes, setNotes, findNotes} = useNotes()
    const [searchQuery, setSearchQuery] = useState('');
    const [resultNotFound, setResultNotFound] = useState(false)

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

    
    const reversedNotes = reverseData(notes);

    const handleOnClear = async () => {
        setSearchQuery('');
        setResultNotFound(false);
        await findNotes();
      };

    const handleOnSubmit = async (title, desc) => { 
        const note = {id: Date.now(), time: Date.now(), title, desc};
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
    }

    const openAIScreen = () => {
        navigation.navigate('AIScreen')
    }

    const openNote = (note) => {
        navigation.navigate('NoteDetail', {note})
    }

    useEffect(() => {
        findGreet();
    }, [])

  return (
    <>
        <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <View style={styles.interactiveBar}>
                <RoundIconBtn IconName='list' size={20} />
                <RoundIconBtn IconName='brain' size={20} onPress={openAIScreen} />
            </View>
            <View style={styles.userBar}>
                <Text style={[styles.header, styles.text]}>{`Добр${greet}, ${user.name}!`}</Text>
                <RoundIconBtn IconName="user-minus" size={12} style={styles.deleteBtn} onPress={async () => {await AsyncStorage.clear(); console.log("Storage cleared")}} />
            </View>
            {(notes.length) ? 
                <SearchBar value={searchQuery}
                    onChangeText={handleOnSearchInput}
                    onClear={handleOnClear}
                    containerStyle={styles.search}
                />
            : null}

            {resultNotFound ? <NotFound/> : 
            <FlatList 
                numColumns={2} 
                data={reversedNotes}
                columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 15, padding: 2}}
                keyExtractor={item => item.id.toString()} 
                renderItem={({item}) => <Note onPress={() => {openNote(item)}} item={item}/>}
            />}
            
            {(!notes.length) ? 
            <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
                <Text style={styles.emptyHeader}>Добавьте записи</Text>
            </View>
            : null}
        </View>
        </TouchableWithoutFeedback>
        <RoundIconBtn IconName="plus" style={styles.addBtn} onPress={() => setModalVisible(true)}/>
        <NoteInputModal visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={handleOnSubmit}/>
    </>
  )
}



const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        zIndex: 1,
        backgroundColor: colors.LIGHT
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold'
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
        zIndex: 1
    },
    userBar: {
        flexDirection: 'row',
    },
    deleteBtn: {
        marginLeft: 5,
        padding: 10,
        borderRadius: 10
    },
    search: {
        marginVertical: 15,
    },
    interactiveBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40
    },
});
