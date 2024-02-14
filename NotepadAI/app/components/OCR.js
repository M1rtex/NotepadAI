import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker';
import MlkitOcr from 'react-native-mlkit-ocr';


export default function OCR() {
    const [image, setImage] = useState(null);
    const [text, setText] = useState("");

    const getText = async () => {
      let resultFromUri = await MlkitOcr.detectFromUri(image);
      console.log(resultFromUri[0].text)
      setText(resultFromUri[0].text)
    }

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
  
      console.log(result.assets);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image ? <Button title="Use OCR" onPress={getText} /> : null}
        {image && <Image source={{ uri: image }} style={{width: 400, height: 200}} />}
        <Text style={{backgroundColor: "red"}}>{text}</Text>
      </View>
    )
}

const styles = StyleSheet.create({})