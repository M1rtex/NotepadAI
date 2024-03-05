import { Modal, TouchableOpacity, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, {useEffect, useState} from 'react'
import colors from '../misc/colors'
import { SelectList } from 'react-native-dropdown-select-list'
import askAI, {NormalizeTextPrompt, TranslateTextPrompt, RefactorTextPrompt, GenerateTextPrompt, SummariseTextPrompt} from '../components/AI'
import IconView from '../components/Icon'

export default function AIScreen({visible, onClose, Prompt, desc, onSubmit}) {

    const [lang, setLang] = useState("");
    const [headerHeight, setHeaderHeight] = useState(351);
    const [hintEnable, setHintEnable] = useState(true);
    const [accept, setAccept] = useState(false);
    const [theme, setTheme] = useState("");
    const [tone, setTone] = useState("");
    const [Tstyle, setTStyle] = useState("");


    const translateChoses = [
        {key:'en', value:'Английский'},
        {key:'ru', value:'Русский'},
        {key:'fr', value:'Французский'},
        {key:'it', value:'Итальянский'},
        {key:'es', value:'Испанский'},
    ]

    const tonsChoses = [
        {key:'1', value:'Простой'},
        {key:'2', value:'Деловой'},
        {key:'3', value:'Академический'},
        {key:'4', value:'Технический'},
        {key:'5', value:'Разговорный'},
    ]

    const TstyleChoses = [
        {key:'1', value:'Воодушевленный'},
        {key:'2', value:'Дружелюбный'},
        {key:'3', value:'Уверенный'},
        {key:'4', value:'Дипломатичный'},
    ]

    const onConfirm = (ans) => {
        onSubmit(ans);
        onExit();
    }

    const onExit = () => {
        setHeaderHeight(351);
        setHintEnable(true);
        setLang("");
        setTStyle("");
        setTheme("");
        setTone("");
        setAccept(false);
        onClose();
    }
    
    const onRequest = async () => {
        if (accept) {
            let SysPrompt = ``
            let request = `${desc}`
            if (Prompt == "Normalize") {
                SysPrompt = NormalizeTextPrompt
            }
            if (Prompt == "Summarise") {
                SysPrompt = SummariseTextPrompt
            }
            if (Prompt == "Translate") {
                SysPrompt = TranslateTextPrompt
                request = `${request}  {{${lang}}}`
            }
            if (Prompt == "Generate") {
                SysPrompt = GenerateTextPrompt
                request = theme
                console.log("[THEME] " + theme)
            }
            if (Prompt == "Refactor") {
                SysPrompt = RefactorTextPrompt
                request = `${request}
Стиль и тон: ${Tstyle} и ${tone}`
            }
            
            
            
            let messages = [
                {
                    role: 'system',
                    content: SysPrompt.toString()
                },
                {
                    role: 'user',
                    content: request
                }
            ]
            await askAI(messages=messages).then((response) => {
                let ans = response.Result.choices[0].message.content
                if (ans) {
                    console.log(typeof ans)
                    console.log(ans)
                    onConfirm(ans)
                }
            })
        }
    }

    const onThemeFieldChange = text => {
        setTheme(text);
    }

    useEffect(() => {
        if (Prompt == "Normalize" | Prompt == "Summarise") {
            setHeaderHeight(591);
            setHintEnable(false);
            setAccept(true);
        }
    }, [Prompt])

    useEffect(() => {
        if (lang || theme || (tone && Tstyle)) {
            setAccept(true)
        } else {
            setAccept(false)
        }
    }, [lang, theme, tone, Tstyle])


  return (
    <>
    <View style={[styles.box, StyleSheet.absoluteFill]}>
    
    <Modal visible={visible} animationType='slide' transparent={true}>
            <TouchableWithoutFeedback onPress={onExit}>
                <View style={{minHeight: headerHeight}}/>
            </TouchableWithoutFeedback>
            <View style={styles.modal}>
                <View style={styles.container}>
                    <Text>{(hintEnable)? "Параметры:" : null}</Text>
                    {(Prompt == "Normalize" | Prompt == "Summarise") ? <Text style={styles.paramText}>Данные готовы к отправке!</Text>: null}
                    {(Prompt == "Translate") ? <SelectList search={false} placeholder='Выберите язык' setSelected={(k) => setLang(k)} data={translateChoses} save="key"/>: null}
                    {(Prompt == "Generate") ? <TextInput placeholder={"Введите тему"} onChangeText={onThemeFieldChange} style={styles.input}/>: null}
                    {(Prompt == "Refactor") ? <>
                    <SelectList search={false} placeholder='Выберите тон' setSelected={(v) => setTone(v)} data={tonsChoses} save="value"/>
                    <SelectList search={false} placeholder='Выберите стиль' setSelected={(v) => setTStyle(v)} data={TstyleChoses} save="value"/>
                    </>
                    : null}
                    <TouchableOpacity onPress={() => {onRequest()}}>
                        <View style={styles.funcBlock}>
                            <IconView IconName='paper-plane' size={25} type='FontAwesome5'/>
                            <Text style={styles.funcText}>Запрос</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
    </Modal>
    </View>
  </>
  )
}

const styles = StyleSheet.create({
    modal: {
        minHeight: 400,
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
        minHeight: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    funcText: {
        paddingLeft: 10,
        fontSize: 18,
    },
    paramText : {
        fontSize: 18
    },
    input: {
        borderWidth: 0.5,
        borderColor: '#f0f0f0',
        borderRadius: 8,
        paddingLeft: 15,
        paddingVertical: 5,
        fontSize: 15,
        backgroundColor: colors.SEARCH,
    },
})