import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import colors from '../misc/colors'
import IconView from './Icon'

export default function ExtraMenuModal({visible, onClose, color, onDelete, onChangeColor}) {
    const [active, setActive] = useState(color)
    const [whiteOpacity, setWhiteOpacity] = useState(0.0)
    const [redOpacity, setRedOpacity] = useState(0.0)
    const [purpleOpacity, setPurpleOpacity] = useState(0.0)
    const [greenOpacity, setGreenOpacity] = useState(0.0)
    const [yellowOpacity, setYellowOpacity] = useState(0.0)

    const setColor = (_color) => {
        if (active === 'white') {
            setWhiteOpacity(0.0)
        }
        if (active === 'red') {
            setRedOpacity(0.0)
        }
        if (active === 'purple') {
            setPurpleOpacity(0.0)
        }
        if (active === 'green') {
            setGreenOpacity(0.0)
        }
        if (active === 'yellow') {
            setYellowOpacity(0.0)
        }
        if (_color === 'white') {
            setWhiteOpacity(2.0)
        }
        if (_color === 'red') {
            setRedOpacity(2.0)
        }
        if (_color === 'purple') {
            setPurpleOpacity(2.0)
        }
        if (_color === 'green') {
            setGreenOpacity(2.0)
        }
        if (_color === 'yellow') {
            setYellowOpacity(2.0)
        }
        setActive(_color)
        onChangeColor(_color)
    }
    

    useEffect(() => {
        setColor(active)
        // console.log(color)
    }, [])

  return (
    <View style={[styles.box, StyleSheet.absoluteFill]}>
    
    <Modal visible={visible} animationType='slide' transparent={true}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.header}/>
            </TouchableWithoutFeedback>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <View style={styles.colorBlock}>
                        <Text style={styles.colorText}>Цвет</Text>
                        <View style={styles.colorPicker}>
                            <View style={[styles.activeColor, {borderWidth: whiteOpacity}]}>
                                <TouchableOpacity style={[styles.roundPicker, {backgroundColor: colors.WHITE_LIGHT}]} onPress={() => {setColor('white')}}/>
                            </View>
                            <View style={[styles.activeColor, {borderWidth: redOpacity}]}>
                                <TouchableOpacity style={[styles.roundPicker, {backgroundColor: colors.RED_LIGHT}]} onPress={() => {setColor('red')}}/>
                            </View>
                            <View style={[styles.activeColor, {borderWidth: purpleOpacity}]}>
                                <TouchableOpacity style={[styles.roundPicker, {backgroundColor: colors.PURPLE_LIGHT}]} onPress={() => {setColor('purple')}}/>
                            </View>
                            <View style={[styles.activeColor, {borderWidth: greenOpacity}]}>
                                <TouchableOpacity style={[styles.roundPicker, {backgroundColor: colors.GREEN_LIGHT}]} onPress={() => {setColor('green')}}/>
                            </View>
                            <View style={[styles.activeColor, {borderWidth: yellowOpacity}]}>
                                <TouchableOpacity style={[styles.roundPicker, {backgroundColor: colors.YELLOW_LIGHT}]} onPress={() => {setColor('yellow')}}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.divider}/>
                    <TouchableOpacity onPress={onDelete}>
                        <View style={styles.funcBlock}>
                            <IconView IconName='trash-alt' size={25} type='FontAwesome5' style={{color: colors.RED}}/>
                            <Text style={styles.funcText}>Удалить заметку</Text>
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
        minHeight: 551,
    },
    modal: {
        minHeight: 200,
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
    colorBlock: {
        maxHeight: 60,
        minHeight: 60,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    roundPicker: {
        minWidth: 42,
        minHeight: 42, 
        borderRadius: 20,
        elevation: 1,
    },
    activeColor: {
        borderWidth: 2,
        borderRadius: 21,
        borderColor: colors.PLACEHOLDER
    },
    colorPicker: {
        minWidth: 328,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    divider: {
        minHeight: 26
    },
    colorText: {
        fontSize: 13,
        color: colors.TEXT,
        paddingBottom: 12
    },
    funcText: {
        paddingLeft: 10,
        fontSize: 18,
        color: colors.RED
    }
})