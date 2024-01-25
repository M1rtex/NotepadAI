import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import colors from '../misc/colors'
import RoundIconBtn from '../components/RoundIconBtn'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Intro({onComplete, navigation}) {
    const [name, setName] = useState("")
    
    const handleSubmit = async () => {
        const user = {name: name}
        await AsyncStorage.setItem('user', JSON.stringify(user))
        if (onComplete) onComplete()
    }
  return (
    <>
        <StatusBar />
        <View style={styles.container}>
            <Text style={styles.inputTitle}>Введите своё имя, чтобы продолжить</Text>
            <TextInput value={name} onChangeText={(text) => setName(text)} placeholder="Введите имя" style={styles.textInput}/>
            {name.trim().length >= 3 ? (<RoundIconBtn IconName="arrow-right" onPress={handleSubmit} />) : null}
        </View>
    </>
  )
}

const width = Dimensions.get('window').width - 50
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 2,
        borderColor: colors.BLUE,
        width,
        height: 40, 
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 20,
        marginBottom: 15
    },
    inputTitle: {
        alignSelf: 'flex-start',
        paddingLeft: 25,
        marginBottom: 5,
        opacity: 0.5,
    }
})