import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Modal, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import IconView from './Icon'
import colors from '../misc/colors'
import { useTheme } from '../context/NoteContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ThemeChooseModal({visible, onClose}) {
    
    const {theme, setTheme, textColor} = useTheme();

    const handleChoose = async (type) => {
        await AsyncStorage.setItem('theme', JSON.stringify({type: type}));
        console.log("now its " + type);
        setTheme(type);
        onClose();
    }

  return (
    <View style={[styles.box, StyleSheet.absoluteFill]}>
    <Modal visible={visible} animationType='slide' transparent={true}>
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.header}/>
        </TouchableWithoutFeedback>
        <View style={[styles.modal, {backgroundColor: (theme == "light") ? colors.LIGHT : colors.DARK}]}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {handleChoose('light')}}>
                    <View style={styles.funcBlock}>
                        <IconView IconName='eye' size={25} type='FontAwesome5' theme={theme} />
                        <Text style={[styles.funcText, {color: textColor}]}>Светлая</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {handleChoose('dark')}}>
                    <View style={styles.funcBlock}>
                        <IconView IconName='eye-low-vision' size={25} type='FontAwesome6' theme={theme} />
                        <Text style={[styles.funcText, {color: textColor}]}>Тёмная</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
    
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        minHeight: "80%",
        minHeight: "80%",
    },
    modal: {
        paddingTop: 1,
        borderWidth: 1,
        borderRadius: 20,
        borderBottomEndRadius: 0,
    },
    container: {
        padding: 16,
    },
    funcBlock: {
        maxHeight: 60,
        minHeight: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    funcText: {
        paddingLeft: 10,
        fontSize: 18
    }
})