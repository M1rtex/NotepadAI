import { StyleSheet, Text, View, Button, Image } from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import TesseractOcr, {
  LANG_ENGLISH,
  LANG_RUSSIAN,
} from "react-native-tesseract-ocr";

export default function OCR() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  const recognizeTextFromImage = async (path) => {
    console.log("Recognize Started");
    try {
      const tesseractOptions = {};
      const recognizedText = await TesseractOcr.recognize(
        path,
        [LANG_ENGLISH, LANG_RUSSIAN],
        tesseractOptions
      );
      setText(recognizedText);
      console.log(recognizedText);
    } catch (err) {
      console.error(err);
      setText("");
    }
  };

  const extractText = async () => {
    await recognizeTextFromImage(image);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log("Image picked");

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image ? <Button title="Use OCR" onPress={extractText} /> : null}
      {image && (
        <Image source={{ uri: image }} style={{ width: 400, height: 200 }} />
      )}
      <Text style={{ backgroundColor: "red" }}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
