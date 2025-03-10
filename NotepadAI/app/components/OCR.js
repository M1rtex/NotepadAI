import { StyleSheet, ToastAndroid, View } from 'react-native'
import React, {useState} from 'react'
import callGoogleVisionAsync from './GoogleVision.js';
import * as ImagePicker from 'expo-image-picker';
import IconView from './Icon.js';
import colors from '../misc/colors.js';
import { useAPIS } from '../context/NoteContext.js';

export default function OCR({onResult, setLoading, setLoadingType, theme}) {
    const [language, setLanguage] = useState(null);
    const [text, setText] = useState(null);
    const {GoogleAPIKey} = useAPIS();

    const getText = async (image) => {
        let resp = null
        await callGoogleVisionAsync(image, API_KEY=GoogleAPIKey).then(data=>{
        var txt = ""
        var locale = ""
        if (data.responses) {
        data.responses.forEach((response) => {
            if (response.fullTextAnnotation) {
                txt = response.fullTextAnnotation.text;
                locale = response.textAnnotations[0].locale;
            }
        });
        }
        setLanguage(locale);
        setText(txt);
        console.log(language, text);
        resp = {"text": txt, "locale": locale}
        }).catch((error)=>{
        ToastAndroid.showWithGravity(
            'Error',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
        console.error(error)
        })
        return resp
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
          base64: true
        });
    
        if (!result.canceled) {
          return result.assets[0].base64
        }
        return null
      };

    const onRequest = async () => {
      setLoadingType("OCR");
        await pickImage().then( async (image) => {
            if (image) {
                setLoading(true);
                await getText(image).then((data) => {
                    console.log(data)
                    if (!data.error) {
                        onResult(data.text, data.locale)
                        setLoading(false)
                    } else {
                      onRequest(data.error)
                      setLoading(false)
                    }
                })
            }
            setText(null)
            setLanguage(null)
        })
        
    }
    
  return (
    <View style={styles.container}>
      <IconView IconName="photo-film" type="FontAwesome6" size={28} onPress={onRequest} theme={theme} />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  }
})