import { Modal, StyleSheet, Text, View, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../misc/colors'
import RoundIconBtn from './RoundIconBtn'
import OCR from './OCR'

export default function NoteInputModal({visible, onClose, onSubmit, isEdit, note}) {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [image, setImage] = useState(null);


    const onCloseModal= () => {
        if (!isEdit) {
            setTitle('');
            setDesc('');
        }
        onClose();
    }

    const onConfirm = () => {
        if (!title.trim() && !desc.trim()) return onClose();
    
        if (isEdit) {
          onSubmit(title, desc, Date.now());
        } else {
          onSubmit(title, desc);
          setTitle('');
          setDesc('');
        }
        onClose();
      };

    const onOCR = (text, language) => {
        setTitle(language + ": " + title)
        setDesc(desc + "\n" + text)
        console.log("Text addeed")
    }


    useEffect(() => {
        if (isEdit) {
          setTitle(note.title);
          setDesc(note.desc);
        }
      }, [isEdit]);

  return (
  <>
    <Modal visible={visible} animationType='slide'>
    <KeyboardAvoidingView behavior='height' style={styles.container} >
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View>
                <View style={styles.statusBtns}>
                    <RoundIconBtn IconName='arrow-left' size={20} onPress={onCloseModal} />
                    <View style={styles.statusBtns} >
                        <OCR onResult={onOCR}/>
                        <RoundIconBtn IconName='check' size={20} onPress={onConfirm} />
                    </View>
                </View>
                <TextInput value={title} placeholder='Название' style={[styles.input, styles.title]} onChangeText={(text) => {setTitle(text)}} />
                <TextInput value={desc} multiline placeholder='Заметка' style={[styles.input, styles.desc]} onChangeText={(text) => {setDesc(text)}} />
                </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </Modal>
  </>
  )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 20,
        color: colors.DARK
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

    },
    modalBG: {
        flex: 1,
        zIndex: -1
    },
    statusBtns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})