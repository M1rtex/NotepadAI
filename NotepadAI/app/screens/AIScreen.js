import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, {useState} from 'react'
import RoundIconBtn from '../components/RoundIconBtn'
import colors from '../misc/colors'
import askAI from '../components/AI'

export default function AIScreen() {

    [Prompt, SetPrompt] = useState("");
    [answer, setAnswer] = useState("");

    const onRequest = async () => {
        let message = {
            role: 'user',
            content: Prompt
        }
        await askAI(message=message).then((response) => {
            console.log(response.Result.choices[0].message.content)
            let ans = response.Result.choices[0].message.content
            if (ans) {
                setAnswer(ans)
            }
        })
    }

  return (
    <>
    <View style={styles.container} >
        <View style={styles.statusBtn}>
            <RoundIconBtn IconName='list' size={20} />
        </View>
        <TouchableWithoutFeedback style={styles.answerBlock} onPress={() => {Keyboard.dismiss()}}>
            <>
                <Text style={styles.title}>AI:</Text>
                <Text>{answer}</Text>
            </>
        </TouchableWithoutFeedback>
    </View>
    <View style={styles.promptZone}>
    <TextInput value={Prompt} placeholder='Запрос' style={[styles.input, styles.prompt]} onChangeText={(text) => {SetPrompt(text)}} />
    <RoundIconBtn IconName="wand-magic-sparkles" size={20} onPress={onRequest} />
    </View>
  </>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        minHeight: "90%"
    },
    statusBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5
    },
    promptZone: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 5
    },
    prompt: {
        minWidth: "75%"
    },
    input: {
        fontSize: 20,
        color: colors.TEXT,
        backgroundColor: "#c7c7c7",
        borderRadius: 10,
        padding: 5
    },
    answerBlock: {
        
    },
    title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold',
        fontSize: 30
    },
})