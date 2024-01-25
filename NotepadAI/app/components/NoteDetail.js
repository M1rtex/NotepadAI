import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useHeaderHeight } from '@react-navigation/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import { useNotes } from '../context/NoteContext';
import NoteInputModal from './NoteInputModal';

const formatNum = (num) => {
    if (num.toString().length < 2) {
        num = "0" + num.toString()
    };
    return num
}


export default function NoteDetail(props) {
    const [note, setNote] = useState(props.route.params.note);
    const {setNotes, findNotes} = useNotes()
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false);

    const headerHeight = useHeaderHeight()

    const formatTime = time => {
        const date = new Date(time);
        var day = formatNum(date.getDate());
        var month = formatNum(date.getMonth() + 1);
        const year = date.getFullYear();
        const hrs = formatNum(date.getHours());
        const minuts = formatNum(date.getMinutes());
        const secs = formatNum(date.getSeconds());
        let start = ``
        if (note.isUpdated) {
            start = `Обновлено`
        } else {
            start = `Создано`
        }
        return start + ` ${day}/${month}/${year} - ${hrs}:${minuts}:${secs}`;
    }

    const deleteNote = async () => {
        const result = await AsyncStorage.getItem("notes")
        let notes = []
        if (result !== null) notes = JSON.parse(result)
        const newNotes = notes.filter(n => n.id !== note.id)
        setNotes(newNotes)
        await AsyncStorage.setItem("notes", JSON.stringify(newNotes))
        props.navigation.goBack()
    }

    const displayDeleteAlert = () => {
        Alert.alert("Вы уверены?", "Это пермаментно удалит запись.", [
            {
                text: "Удалить",
                onPress: deleteNote
            },
            {
                text: "Отмена"
            }
        ], {cancelable: true})
    }

    const handleOnSubmit = async (title, desc, time) => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if (result !== null) notes = JSON.parse(result);
    
        const newNotes = notes.filter(n => {
          if (n.id === note.id) {
            n.title = title;
            n.desc = desc;
            n.isUpdated = true;
            n.time = time;
    
            setNote(n);
          }
          return n;
        });
    
        setNotes(newNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      };


      const handleOnClose = () => setShowModal(false);
    
      const openEditModal = () => {
        setIsEdit(true);
        setShowModal(true);
      };

    return (
        <>
        <ScrollView contentContainerStyle={[styles.container, {marginTop: headerHeight}]}>
            <Text style={styles.time}>{formatTime(note.time)}</Text>
            <Text style={[styles.title, styles.text]}>{note.title}</Text>
            <Text style={[styles.desc, styles.text]}>{note.desc}</Text>
        </ScrollView>
        <View style={styles.btnsContainer}>
                <RoundIconBtn IconName="trash-can" onPress={displayDeleteAlert} style={{backgroundColor: colors.ERROR, marginBottom: 15}}/>
                <RoundIconBtn IconName="pen" onPress={openEditModal}/>
        </View>
        <NoteInputModal isEdit={isEdit} note={note} onClose={handleOnClose} visible={showModal} onSubmit={handleOnSubmit} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
    },
    text: {
        color: colors.TEXT
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    desc: {
        fontSize: 20
    },
    time: {
        textAlign: 'right',
        opacity: 0.6,
        fontSize: 15
    },
    btnsContainer: {
        position: 'absolute',
        bottom: 50,
        right: 15,
    }
})
