import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker';
import {
  getText,
  DataInputType,
  OcrEngineMode,
  OCREvent,
  useOCREventListener,
} from 'rn-ocr-lib';


export default function OCR() {
    const [image, setImage] = useState(null);
    const [text, setText] = useState("");

    const extractText = async () => {
      let uri = image
      try {
        getText(uri.replace('file://', ''), DataInputType.file, {
          ocrEngineMode: OcrEngineMode.ACCURATE,
          lang: ['rus', 'eng'],
        });
      } catch (err) {
        setError(err.message);
      }
    }

    useOCREventListener((event, data) => {
      switch (event) {
        case OCREvent.FINISHED:
          setText(data.text);
          return;
        case OCREvent.PROGRESS:
          setProgress(data.percent.toString() + "%");
          return;
        case OCREvent.ERROR:
          setError(data.error);
          return;
        default:
          return;
      }
    });

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
        {image ? <Button title="Use OCR" onPress={extractText} /> : null}
        {image && <Image source={{ uri: image }} style={{width: 400, height: 200}} />}
        <Text style={{backgroundColor: "red"}}>{text}</Text>
      </View>
    )
}

const styles = StyleSheet.create({})