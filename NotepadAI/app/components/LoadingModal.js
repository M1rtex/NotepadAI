import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native';
import colors from '../misc/colors';

export default function LoadingModal({type, visible, theme}) {
    
  return (
    <Modal visible={visible} animationType='fade' transparent>
        <View style={[StyleSheet.absoluteFill, {backgroundColor: (theme ==='light') ? colors.LIGHT : colors.DARK, opacity: 0.7}]}/>
        <View style={styles.container}>
            {(type === "OCR") ? <LottieView source={require("../../assets/animations/OCR.json")} autoPlay speed={1.4} loop resizeMode='contain' style={[styles.Lottie, {height: 150, width: 150}]}/>
            : <LottieView source={require("../../assets/animations/LoadingCyrcle.json")} autoPlay loop resizeMode='contain' style={styles.Lottie}/>}
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Lottie: {
        width: 250,
        height: 250,
        opacity: 1,
        borderWidth: 2,
        borderColor: colors.ERROR
    }
})