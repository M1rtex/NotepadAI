import { Modal, TouchableOpacity, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, {useEffect, useState} from 'react'
import colors from '../misc/colors'
import { SelectList } from 'react-native-dropdown-select-list'
import askAI, {NormalizeTextPrompt, TranslateTextPrompt, RefactorTextPrompt, GenerateTextPrompt, SummariseTextPrompt} from '../components/AI'
import IconView from '../components/Icon'
import { useAPIS, useTheme } from '../context/NoteContext'

export default function AIScreen({visible, onClose, Prompt, desc, onSubmit, setLoading}) {

    const {theme, backgroundColor, textColor} = useTheme();
    const {GoogleAPIKey, TogetherAPIKey} = useAPIS();
    const [lang, setLang] = useState("");
    const [headerHeight, setHeaderHeight] = useState(351);
    const [hintEnable, setHintEnable] = useState(true);
    const [accept, setAccept] = useState(false);
    const [ask_theme, setAskTheme] = useState("");
    const [tone, setTone] = useState("");
    const [Tstyle, setTStyle] = useState("");
    const [GenerateErrorVisible, setGenerateErrorVisible] = useState(false)

    const changeGenerateErrorVisible = () => {
        setGenerateErrorVisible(true)
    }


    const translateChoses = [
        {key:'en', value:'Английский'},
        {key:'ru', value:'Русский'},
        {key:'de', value:'Немецкий'},
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

    const onExit = () => {
        setHeaderHeight(351);
        setGenerateErrorVisible(false);
        setHintEnable(true);
        setLang("");
        setTStyle("");
        setAskTheme("");
        setTone("");
        setAccept(false);
        onClose();
    }
    
    const onRequest = async () => {
        if (accept) {
            setLoading(true);
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
                request = ask_theme
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
            onExit();
            await askAI(messages=messages, apikey=TogetherAPIKey).then((response) => {
                console.log(response)
                if (!response.Result.error) {
                    let ans = response.Result.choices[0].message.content
                    if (ans != undefined) {
                        console.log(ans)
                        if (Prompt == "Generate") {
                            onSubmit(ans, request)
                        }
                        onSubmit(ans, null)
                        setLoading(false);
                    }
                } else {
                    let error = response.Result.error.message;
                    onSubmit(error, null);
                    setLoading(false);
                }
            })
        }
    }

    const onThemeFieldChange = text => {
        setAskTheme(text);
    }

    useEffect(() => {
        if (Prompt == "Normalize" | Prompt == "Summarise") {
            setHeaderHeight(591);
            setHintEnable(false);
            setAccept(true);
        }
    }, [Prompt])

    useEffect(() => {
        if (lang || ask_theme || (tone && Tstyle)) {
            setAccept(true)
        } else {
            setAccept(false)
        }
    }, [lang, ask_theme, tone, Tstyle])


  return (
    <>
    <View style={[styles.box, StyleSheet.absoluteFill]}>
    
    <Modal visible={visible} animationType='slide' transparent={true}>
            <TouchableWithoutFeedback onPress={onExit}>
                <View style={{minHeight: headerHeight}}/>
            </TouchableWithoutFeedback>
            <View style={[styles.modal, {backgroundColor: backgroundColor}]}>
                <View style={styles.container}>
                    <Text style={{color: textColor, paddingBottom: 10}}>{(hintEnable)? "Параметры:" : null}</Text>
                    {(Prompt == "Normalize" | Prompt == "Summarise") ? <Text style={[styles.paramText, {color: textColor}]}>Данные готовы к отправке!</Text>: null}
                    {(Prompt == "Translate") ? <SelectList search={false} dropdownTextStyles={{color: textColor}} inputStyles={{color: textColor}} placeholder='Выберите язык' setSelected={(k) => setLang(k)} data={translateChoses} save="key"/>: null}
                    {(Prompt == "Generate") ? <>
                    <TextInput placeholder={"Введите тему"} onChangeText={onThemeFieldChange} style={[styles.input, {backgroundColor: (theme == "light") ? colors.SEARCH : colors.SEARCH_BG_DARK, color: textColor}]} placeholderTextColor={textColor}/>
                    <Text style={{color: colors.ERROR, opacity: (GenerateErrorVisible) ? 0.8 : 0}}>Введите тему для генерации!</Text>
                    </>: null}
                    {(Prompt == "Refactor") ? <>
                    <SelectList search={false} dropdownTextStyles={{color: textColor}} inputStyles={{color: textColor}} placeholder='Выберите тон' setSelected={(v) => setTone(v)} data={tonsChoses} save="value"/>
                    <View style={{height: 5}}/>
                    <SelectList search={false} dropdownTextStyles={{color: textColor}} inputStyles={{color: textColor}} placeholder='Выберите стиль' setSelected={(v) => setTStyle(v)} data={TstyleChoses} save="value"/>
                    </>
                    : null}
                    <TouchableOpacity onPress={onRequest}>
                        <View style={styles.funcBlock}>
                            <IconView IconName='paper-plane' size={25} type='FontAwesome5' theme={theme}/>
                            <Text style={[styles.funcText, {color: textColor}]}>Запрос</Text>
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
        borderColor: colors.GRAY,
        borderWidth: 0.3,
        borderRadius: 20,
        borderBottomEndRadius: 0,
    },
    container: {
        padding: 16,
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
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    input: {
        borderColor: '#f0f0f0',
        borderRadius: 8,
        paddingLeft: 15,
        paddingVertical: 5,
        fontSize: 15,
    },
})