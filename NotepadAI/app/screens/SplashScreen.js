import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LottieView from 'lottie-react-native'
import colors from '../misc/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';


export default function SplashScreen(props) {

    const [goes, setGoes] = useState(true)
    const navigation = props.navigation;

    const onFinish = async () => {
        const result = await AsyncStorage.getItem('user');
        setGoes(false);
        setTimeout(() => {
            if (result === null) {
                navigation.navigate("IntroScreen")
            } else {
                navigation.navigate("NotesScreen")
            }
        }, 220)
    }

  return (
    <>
    {(goes) ? <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <LottieView source={require("../../assets/animations/Text.json")} style={{width: 220, height: 220}} autoPlay loop={false} resizeMode='contain' onAnimationFinish={onFinish}/>
    </Animated.View>
    :
    null}
    </>
  )
}

const styles = StyleSheet.create({

})