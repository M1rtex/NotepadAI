import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import colors from '../misc/colors'
import RoundIconBtn from '../components/RoundIconBtn'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '../context/NoteContext'

export default function Intro({onComplete, saveAPIs, navigation}) {
    const [name, setName] = useState("")
    
    const {theme, backgroundColor, textColor} = useTheme();

    const handleSubmit = async () => {
        const user = {name: name}
        await AsyncStorage.setItem('user', JSON.stringify(user))
        if (onComplete) {
            await saveAPIs(Google="AIzaSyCFjpRIaHx0SQ3_owrswUTabIdOTuOitgE", Together="ced5adc36ab877527b6e709897c3e0dcc4727167979388071f4d3b5578760947");
            onComplete();
            navigation.navigate("NotesScreen");
        };
    }
    
  return (
    <>
        <View style={[styles.container, {backgroundColor: backgroundColor}]}>
            <Text style={[styles.inputTitle, {color: textColor}]}>Введите своё имя, чтобы продолжить</Text>
            <TextInput value={name} onChangeText={(text) => setName(text)} placeholder="Введите имя" style={[styles.textInput, {color: textColor}]}/>
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