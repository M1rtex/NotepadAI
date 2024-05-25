import { Alert, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNotes, useTheme } from '../context/NoteContext'
import colors from '../misc/colors'
import OCR from '../components/OCR'
import IconView from '../components/Icon'
import BackButton from '../components/BackButton'
import AIChooseModal from '../components/AIChooseModal'
import ExtraMenuModal from '../components/ExtraMenuModal'
import LoadingModal from '../components/LoadingModal'

const formatNum = (num) => {
    if (num.toString().length < 2) {
        num = "0" + num.toString()
    };
    return num
}

export default function NoteInputScreen(props) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [isEdit, setIsEdit] = useState(props.route.params.isEdit);
    const [note, setNote] = useState(props.route.params.note);
    const [color, setColor] = useState((isEdit) ? note.color : 'white');
    const {notes, setNotes, findNotes} = useNotes();
    const {theme, setTheme} = useTheme();
    const [AIModal, setAIModal] = useState(false);
    const [extraModal, setExtraModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingType, setLoadingType] = useState('AI');

    const [backgroundColor, setBackgroundColor] = useState((theme === 'light') ? colors.LIGHT: colors.PRIMARY_DARK);
    const [textColor, setTextColor] = useState((theme === 'light') ? colors.TEXT: colors.TEXT_DARK);

    const navigation = props.navigation;

    const handleOnAIans = (ans, request) => {
        let newDesc = desc + "\n[Ответ AI]\n" + ans;
        if (title.trim().length === 0 && request) setTitle(request);
        setDesc(newDesc);
    }

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

    const onClose= () => {
        if (!isEdit) {
            setTitle('');
            setDesc('');
        }
        navigation.goBack();
    }

    const deleteNote = async () => {
        const result = await AsyncStorage.getItem("notes")
        let notes = []
        if (result !== null) notes = JSON.parse(result)
        const newNotes = notes.filter(n => n.id !== note.id)
        setNotes(newNotes)
        await AsyncStorage.setItem("notes", JSON.stringify(newNotes))
        props.navigation.navigate('NotesScreen')
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

    const onConfirm = () => {
        if (!title.trim() && !desc.trim()) return navigation.goBack();

        if (isEdit) {
          time = Date.now()
        }
        setTitle('');
        setDesc('');
        if (isEdit) {
            navigation.navigate("NoteDetail", {post: {title, desc, time, color}});
        } else {
            navigation.navigate("NotesScreen", {post: {title, desc, color}});
        }
      };

    const onOCR = (text, language) => {
        setDesc(desc + `\n[OCR:${language}]\n` + text)
        console.log("Text addeed")
    }

    const toggleAIModal = () => {
        setAIModal(!AIModal)
    }

    const toggleExtraModal = () => {
        setExtraModal(!extraModal)
    }

    const handleColorChange = (newColor) => {
        setColor(newColor)
    }

    useEffect(() => {
        if (isEdit) {
            setTitle(note.title);
            setDesc(note.desc);
        }
      }, []);



  return (
  <>
    <KeyboardAvoidingView style={[styles.container, {backgroundColor: backgroundColor}]}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View>
                <View style={[styles.statusBtns, {paddingBottom: 10, marginBottom: 13, paddingTop: 16, borderBottomColor: (theme === 'light') ? colors.STROKE: colors.SECONDARY_DARK, borderBottomWidth: 1}]}>
                    <BackButton onPress={onClose}/>
                    <View style={styles.statusBtns} >
                        <OCR onResult={onOCR} setLoading={setIsLoading} setLoadingType={setLoadingType} theme={theme}/>
                        <IconView IconName='check' type='FontAwesome6' size={27} onPress={onConfirm} style={{paddingLeft: 15}} theme={theme} />
                    </View>
                </View>
                <View style={styles.input_block}>
                    <TextInput value={title} placeholder='Заголовок' placeholderTextColor={textColor} style={[styles.input, {color: textColor}, styles.title]} onChangeText={(text) => {setTitle(text)}} />
                    <TextInput value={desc} multiline placeholder='Описание заметки' placeholderTextColor={textColor} style={[styles.input, {color: textColor}, styles.desc]} onChangeText={(text) => {setDesc(text)}} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    <KeyboardAvoidingView style={[styles.task_bar, {backgroundColor: backgroundColor}]}>
        <View style={styles.time_block}>
        <Text style={[styles.time, {color: textColor}]}>{(note) ? formatTime(note.time) : 'Новая заметка'}</Text>
        </View>
        <View style={styles.btns_block}>
            <View style={styles.btn_squere}>
                <IconView IconName="wand-magic-sparkles" type="FontAwesome6" onPress={toggleAIModal} theme={theme} />
            </View>
            <View style={[styles.btn_squere, {backgroundColor: colors.PURPLE}]}>
                <IconView IconName="ellipsis-h" type="FontAwesome5" style={{color: colors.WHITE_LIGHT}} onPress={toggleExtraModal} theme={theme} />
            </View>
        </View>
    </KeyboardAvoidingView>
    <AIChooseModal visible={AIModal} onClose={toggleAIModal} noteDesc={desc} onSubmit={handleOnAIans} setLoading={setIsLoading} setLoadingType={setLoadingType} theme={theme} backgroundColor={backgroundColor}/>
    <ExtraMenuModal visible={extraModal} color={color} onDelete={(isEdit) ?  displayDeleteAlert : () => {}} onChangeColor={handleColorChange} onClose={toggleExtraModal}/>
    <LoadingModal visible={isLoading} type={loadingType} theme={theme} />
  </>
  )
}

const styles = StyleSheet.create({
    input_block: {
        paddingHorizontal: 0
    },
    time: {
        fontSize: 12, 
        fontWeight: "bold"
    },
    input: {
        fontSize: 20,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold',
        fontSize: 30
    },
    desc: {
        paddingBottom: 300
    },
    modalBG: {
        flex: 1,
        zIndex: -1
    },
    statusBtns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    task_bar: {
        height: 48,
        width: "100%",
        paddingHorizontal: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    time_block: {
        justifyContent: "center",
        paddingLeft: 15,
    }
})
