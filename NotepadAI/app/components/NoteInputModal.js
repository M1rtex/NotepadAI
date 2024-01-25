import { Modal, StyleSheet, Text, View, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../misc/colors'
import RoundIconBtn from './RoundIconBtn'

export default function NoteInputModal({visible, onClose, onSubmit, isEdit, note}) {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')


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


    useEffect(() => {
        if (isEdit) {
          setTitle(note.title);
          setDesc(note.desc);
        }
      }, [isEdit]);

  return (
  <>
    <Modal visible={visible} animationType='slide'>
        
        <View style={styles.container} >
            <View style={styles.statusBtns}>
                <RoundIconBtn IconName='arrow-left' size={20} onPress={onCloseModal} />
                <RoundIconBtn IconName='check' size={20} onPress={onConfirm} />
            </View>
            <TextInput value={title} placeholder='Название' style={[styles.input, styles.title]} onChangeText={(text) => {setTitle(text)}} />
            <TextInput value={desc} multiline placeholder='Заметка' style={[styles.input, styles.desc]} onChangeText={(text) => {setDesc(text)}} />
        </View>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
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