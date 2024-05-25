import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LottieView from 'lottie-react-native'
import colors from '../misc/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import { useTheme } from '../context/NoteContext';


export default function SplashScreen({visible, onAnimationFinish}) {

    const {backgroundColor} = useTheme();

    const onFinish = async () => {
        const result = await AsyncStorage.getItem('user');
        setTimeout(() => {
            if (result === null) {
                onAnimationFinish("IntroScreen");
            } else {
                onAnimationFinish(false);
            }
        }, 220);
    }

  return (
    <Modal visible={visible} animationType='fade'>
        <View style={[StyleSheet.absoluteFill, {backgroundColor: backgroundColor}]}/>
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <LottieView source={require("../../assets/animations/Text.json")} speed={1.4} style={{width: 220, height: 220}} autoPlay loop={false} resizeMode='contain' onAnimationFinish={onFinish}/>
        </Animated.View>
    </Modal>
  )
}

const styles = StyleSheet.create({

})
