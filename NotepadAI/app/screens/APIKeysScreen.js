import { Alert, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import colors from "../misc/colors";
import IconView from "../components/Icon";
import React, { useState } from 'react'
import { useAPIS, useTheme } from '../context/NoteContext';
import BackButton from '../components/BackButton';

export default function APIKeysScreen(props) {
    const navigation = props.navigation;
    const { theme, backgroundColor, textColor } = useTheme();
    const [isKeyGoogleSecured, setIsKeyGoogleSecured] = useState(true)
    const [isKeyTogetherSecured, setIsKeyTogetherSecured] = useState(true)
    const {GoogleAPIKey, setGoogleAPIKey, TogetherAPIKey, setTogetherAPIKey, saveAPIs} = useAPIS();
    const [google, setGoogle] = useState(GoogleAPIKey);
    const [together, setTogether] = useState(TogetherAPIKey);
    
    const saveNewKeys = async () => {
        setGoogleAPIKey(google);
        setTogetherAPIKey(together);
        await saveAPIs(google, together);
        Alert.alert("Данные сохранены!", "", [{text: "Ок", onPress: navigation.goBack()}])
    }

    const displayAlert = () => {
        Alert.alert(
            "Вы уверены?",
            "Это пермаментно заменит API ключи!",
            [
              {
                text: "Сохранить",
                onPress: saveNewKeys,
              },
              {
                text: "Отмена",
              },
            ],
            { cancelable: true }
          );
    }

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: backgroundColor },
          StyleSheet.absoluteFill,
        ]}
      >
        <View
          style={[styles.statusBtns, { paddingBottom: 24, paddingTop: 21 }]}
        >
          <BackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
          <View style={[styles.header, StyleSheet.absoluteFill]}>
            <Text style={[styles.headerText, { color: textColor }]}>
              Change API Keys
            </Text>
          </View>
        </View>
        <Text style={[styles.hintText, { color: colors.PURPLE }]}>
        {"Будьте внимательны!\nНеверный API ключ приведёт к потере функционала!"}
        </Text>
        <View style={[styles.keyBlock, {marginBottom: 15}]}>
            <Text style={[styles.headerText, {color: textColor}]}>Google API Key</Text>
            <TextInput secureTextEntry={isKeyGoogleSecured} value={google} onChangeText={setGoogle} onPressIn={() => {setIsKeyGoogleSecured(false)}} style={[styles.textInput, {color: textColor, borderColor: (theme == 'light') ? colors.PLACEHOLDER : colors.GRAY_TIME}]}></TextInput>
        </View>
        <View style={styles.keyBlock}>
            <Text style={[styles.headerText, {color: textColor}]}>TogetherAI API Key</Text>
            <TextInput secureTextEntry={isKeyTogetherSecured} value={together} onChangeText={setTogether} onPressIn={() => {setIsKeyTogetherSecured(false)}} style={[styles.textInput, {color: textColor, borderColor: (theme == 'light') ? colors.PLACEHOLDER : colors.GRAY_TIME}]}></TextInput>
        </View>
        <View style={[styles.saveBlock, StyleSheet.absoluteFill]}>
            <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.PURPLE }]} onPress={displayAlert}>
                <Text style={[styles.saveText, { color: colors.LIGHT }]}>
                Сохранить
                </Text>
                <IconView
                IconName="arrowright"
                type="AntDesign"
                size={25}
                style={{ color: colors.LIGHT }}
                />
            </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
      },
      statusBtns: {
        flexDirection: "row",
      },
      headerText: {
        fontSize: 17,
        fontWeight: "600",
        bottom: 3,
      },
      backBtn: {
        backgroundColor: colors.ERROR,
      },
      textInput: {
        borderWidth: 2,
        borderColor: colors.GRAY,
        height: 54, 
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 20,
        marginBottom: 15,
        marginTop: 8
    },
      header: {
        alignItems: "center",
        justifyContent: "center",
        zIndex: -1,
      },
      nameBlock: {
        paddingBottom: 48,
      },
      saveBtn: {
        flexDirection: "row",
        width: '85%',
        height: '7%',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 35,
        padding: 7,
      },
      saveText: {
        marginRight: 8,
        fontSize: 16,
      },
      saveBlock: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 10,
      },
      versionText: {
        opacity: 0.5,
        fontWeight: "bold",
      },
      hintText: {
        fontSize: 12,
        opacity: 0.8,
        paddingBottom: 8,
      },
      funcBlock: {
        maxHeight: 60,
        minHeight: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      },
      funcText: {
        paddingLeft: 10,
        fontSize: 18,
        fontWeight: "bold",
      },
      funcBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      settingsBlock: {
        paddingBottom: 16,
      },
      keyBlock:{
      }
})