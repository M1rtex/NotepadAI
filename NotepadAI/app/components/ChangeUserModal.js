import { View, Text, Modal, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/NoteContext';
import colors from '../misc/colors';
import AsyncStorage from '@react-native-async-storage/async-storage'
import IconView from './Icon';



export default function ChangeUserModal({visible, onClose, onConfirm}) {
    const [newUser, setnewUser] = useState('')
    const {theme, backgroundColor, textColor, setCurrentColorNavBar} = useTheme();

    const getUser = async () => {
        const result = await AsyncStorage.getItem("user");
        if (result !== null) setnewUser(JSON.parse(result).name);
      };

    useEffect(() => {
        getUser();
    }, [])

  return (
    <View style={StyleSheet.absoluteFill}>
        <Modal visible={visible} animationType='fade' transparent={true}>
            <TouchableWithoutFeedback onPress={onClose}><View style={StyleSheet.absoluteFillObject}/></TouchableWithoutFeedback>
            <View style={[styles.modal]}>
                <View style={[styles.box, {backgroundColor: backgroundColor}]}>
                    <TextInput value={newUser} onChangeText={setnewUser} style={[styles.textInput, {color: textColor}]}></TextInput>
                    <TouchableOpacity
                        style={[styles.changeNameBtn, { borderColor: colors.PURPLE }]} onPress={() => {onConfirm(newUser)}}>
                        <IconView
                        IconName="save"
                        type="FontAwesome5"
                        size={21}
                        style={{ color: colors.PURPLE }}/>
                        <Text style={[styles.changeNameText, { color: colors.PURPLE }]}>Сохранить</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        alignContent: 'center',
    },
    box: {
        maxWidth: "90%",
        minWidth: "90%",
        minHeight: 200,
        maxHeight: "30%",
        flex: 1,
        justifyContent: 'center',
        borderRadius: 17,
        elevation: 4,
        paddingHorizontal: "5%"
    },
    textInput: {
        borderWidth: 2,
        borderColor: colors.GRAY,
        height: 40, 
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 20,
        marginBottom: 15
    },
    changeNameBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 20,
        padding: 7,
      },
    changeNameText: {
        paddingLeft: 8,
        fontSize: 18,
      },
})