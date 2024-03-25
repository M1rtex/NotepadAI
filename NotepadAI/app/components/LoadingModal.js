import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native';
import colors from '../misc/colors';

export default function LoadingModal({type, visible}) {
    
  return (
    <Modal visible={visible} animationType='fade' transparent>
        <View style={[StyleSheet.absoluteFill, styles.background]}/>
        <View style={styles.container}>
            {(type === "OCR") ? <LottieView source={require("../../assets/animations/OCR.json")} autoPlay loop resizeMode='contain' style={[styles.Lottie, {height: 150, width: 150}]}/>
            : <LottieView source={require("../../assets/animations/LoadingCyrcle.json")} autoPlay loop resizeMode='contain' style={styles.Lottie}/>}
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.DARK,
        opacity: 0.3,
    },
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