import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useHeaderHeight } from '@react-navigation/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../misc/colors';
import { useNotes, useTheme } from '../context/NoteContext';
import IconView from '../components/Icon'
import BackButton from '../components/BackButton'

const formatNum = (num) => {
    if (num.toString().length < 2) {
        num = "0" + num.toString()
    };
    return num
}


export default function NoteDetail(props) {
    const [note, setNote] = useState(props.route.params.note);
    const {setNotes, findNotes} = useNotes()
    const {theme, setTheme, textColor, backgroundColor} = useTheme();

    const headerHeight = useHeaderHeight()

    const navigation = props.navigation;

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

    const handleOnSubmit = async (title, desc, time, color) => {
        const result = await AsyncStorage.getItem('notes');
        let notes = [];
        if (result !== null) notes = JSON.parse(result);
    
        const newNotes = notes.filter(n => {
          if (n.id === note.id) {
            n.title = title;
            n.desc = desc;
            n.isUpdated = true;
            n.time = time;
            n.color = color
            setNote(n);
          }
          return n;
        });
    
        setNotes(newNotes);
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      };


    
      const openEditModal = () => {
        props.navigation.navigate("NoteInputScreen", {isEdit: true, note: note});
      };

      useEffect(() => {
        if (props.route.params?.post) {
            let title = props.route.params.post.title;
            let desc = props.route.params.post.desc;
            let time = props.route.params.post.time;
            let color = props.route.params.post.color;
            handleOnSubmit(title, desc, time, color);
        }
      }, [props.route.params?.post]);

    return (
        <>
        <ScrollView style={{backgroundColor: backgroundColor}} contentContainerStyle={[styles.container, {marginTop: headerHeight, backgroundColor: backgroundColor}]}>
            <View style={[styles.statusBtns, {paddingBottom: 15, marginBottom:10, paddingTop: 16, borderBottomColor: (theme === 'light') ? colors.STROKE: colors.SECONDARY_DARK, borderBottomWidth: 1}]}>
                <BackButton onPress={() => {navigation.goBack()}}/>
            </View>
            <Text style={[styles.title, {color: textColor}]}>{note.title}</Text>
            <Text style={[styles.desc, {color: textColor}]}>{note.desc}</Text>
        </ScrollView>
        <View style={[styles.task_bar, {backgroundColor: backgroundColor}]}>
            <View style={styles.time_block}>
                <Text style={[styles.time, {color: textColor}]}>{(note) ? formatTime(note.time) : 'Новая заметка'}</Text>
            </View>
            <View style={styles.btns_block}>
                <View style={[styles.btn_squere]}>
                    <IconView IconName="pen" type="FontAwesome5"  onPress={openEditModal}/>
                </View>
                <View style={[styles.btn_squere, {backgroundColor: colors.PURPLE}]}>
                    <IconView IconName="trash-alt" type="FontAwesome5" style={{color: colors.WHITE_LIGHT}} onPress={displayDeleteAlert}/>
                </View>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
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
    },
    task_bar: {
        height: 48,
        width: "100%",
        paddingHorizontal: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    time_block: {
        justifyContent: "center",
        paddingLeft: 15,
    },
    btns_block: {
        width: 96,
        flexDirection: 'row',
    },
    btn_squere: {
        width: 48,
        paddingHorizontal: 13,
        justifyContent: 'center',
    },
})
