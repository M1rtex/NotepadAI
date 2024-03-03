import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../misc/colors'
import IconView from './Icon'
import askAI, {NormalizeTextPrompt, TranslateTextPrompt, RefactorTextPrompt, GenerateTextPrompt, SummariseTextPrompt} from './AI'
import TranslateSelectorModal from './TranslateSelectorModal'
import AIScreen from '../screens/AIScreen'

export default function AIChooseModal({visible, onClose, onSubmit, noteDesc}) {
    
    const  [AIModalvisible, setAIModalvisible] = useState(false);
    const [newDesc, setNewDesc] = useState(noteDesc);
    const [SySPrompt, setSysPrompt] = useState(``);

    

    const handleOnPress = (SysPrompt) => {
        setSysPrompt(SysPrompt);
        setAIModalvisible(!AIModalvisible);
    }

    const toggleModal = () => {
        setAIModalvisible(!AIModalvisible);
        setSysPrompt(``);
        onClose();
    }



  return (
    <View style={[styles.box, StyleSheet.absoluteFill]}>
    
    <Modal visible={visible} animationType='slide' transparent={true}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.header}/>
            </TouchableWithoutFeedback>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => {handleOnPress("Summarise")}}>
                        <View style={styles.funcBlock}>
                            <IconView IconName='wand-magic-sparkles' size={27} type='FontAwesome6'/>
                            <Text style={styles.funcText}>Суммировать текст</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleOnPress("Normalize")}}>
                        <View style={styles.funcBlock}>
                            <IconView IconName='wand-magic-sparkles' size={27} type='FontAwesome6'/>
                            <Text style={styles.funcText}>Нормализировать текст</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleOnPress("Translate")}}>
                        <View style={styles.funcBlock}>
                            <IconView IconName='wand-magic-sparkles' size={27} type='FontAwesome6'/>
                            <Text style={styles.funcText}>Перевод текста</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleOnPress("Refactor")}}>
                        <View style={styles.funcBlock}>
                            <IconView IconName='wand-magic-sparkles' size={27} type='FontAwesome6'/>
                            <Text style={styles.funcText}>Рефакторинг теста</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleOnPress("Generate")}}>
                        <View style={styles.funcBlock}>
                            <IconView IconName='wand-magic-sparkles' size={27} type='FontAwesome6'/>
                            <Text style={styles.funcText}>Генерация текста</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
    </Modal>
    <AIScreen visible={AIModalvisible} onClose={toggleModal} Prompt={SySPrompt} desc={noteDesc} onSubmit={onSubmit}/>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        minHeight: 415,
    },
    modal: {
        paddingTop: 1,
        borderColor: colors.PLACEHOLDER,
        borderWidth: 1,
        borderRadius: 20,
        borderBottomEndRadius: 0,
        backgroundColor: colors.LIGHT
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