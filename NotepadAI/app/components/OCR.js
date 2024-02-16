import { StyleSheet, Text, View, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import callGoogleVisionAsync from './GoogleVision.js';
import * as ImagePicker from 'expo-image-picker';

export default function OCR() {
    const [language, setLanguage] = useState(null);
    const [subtitle, setSubtitle] = useState(null);
    const [loading, SetLoading] = useState(false);

    const getText = async () => {
        callGoogleVisionAsync(image).then(data=>{
        let text = ""
        let locale = null
        data.responses.forEach((response)=>{
            response.textAnnotations.forEach((textAnnotation)=>{
            text = text +" "+ textAnnotation.description;
            if(locale===null){
                locale = textAnnotation.locale
            }
            })
        })
        setLanguage(locale)
        setSubtitle(text)
        SetLoading(false)
        }).catch((error)=>{
        ToastAndroid.showWithGravity(
            'Error',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
        SetLoading(false)
        })
    }
    

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
          base64: true
        });
    
        console.log(result.assets);
    
        if (!result.canceled) {
          setImage(result.assets[0].base64);
        }
      };
    
  return (
    <View>
      <Text style={styles.title}>OCR</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={SelectPhoto}>
        <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
          {
            (loading===false)?
             (subtitle!==null)?
                <View>
                  <Text style={styles.languagetitle}>{language}</Text>
                  <Text style={styles.subtitle}>{subtitle}</Text>
                </View>:<></>
              :<ActivityIndicator size="large" />
            
          }
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        marginVertical: 40,
      },
    subtitle: {
        fontSize: 20,
        marginVertical: 10,
        textAlign:'center'
      },
    languagetitle: {
        fontSize: 30,
        marginVertical: 10,
        textAlign:'center'  
      },
    button: {
        backgroundColor: '#47477b',
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 50,
        marginTop: 20,
      },
    buttonText: {
        color: '#fff',
      },
})