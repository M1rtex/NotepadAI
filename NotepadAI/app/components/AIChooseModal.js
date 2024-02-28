import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import colors from '../misc/colors'
import IconView from './Icon'

export default function AIChooseModal({visible, onClose, onSubmit}) {
    
    const handleOnPress = (type) => {
        console.log(type)
    }

  return (
    <View style={[styles.box, StyleSheet.absoluteFill]}>
    
    <Modal visible={visible} animationType='slide' transparent={true}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.header}/>
            </TouchableWithoutFeedback>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => {handleOnPress('Func 1')}}>
                        <View style={styles.funcBlock}>
                            <IconView IconName='wand-magic-sparkles' size={27} type='FontAwesome6'/>
                            <Text style={styles.funcText}>Func 1</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleOnPress('Func 2')}}>
                        <View style={styles.funcBlock}>
                            <IconView IconName='wand-magic-sparkles' size={27} type='FontAwesome6'/>
                            <Text style={styles.funcText}>Func 2</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleOnPress('Func 3')}}>
                        <View style={styles.funcBlock}>
                            <IconView IconName='wand-magic-sparkles' size={27} type='FontAwesome6'/>
                            <Text style={styles.funcText}>Func 3</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleOnPress('Func 4')}}>
                        <View style={styles.funcBlock}>
                            <IconView IconName='wand-magic-sparkles' size={27} type='FontAwesome6'/>
                            <Text style={styles.funcText}>Func 4</Text>
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
        minHeight: 475,
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