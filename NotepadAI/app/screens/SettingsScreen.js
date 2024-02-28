import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../misc/colors';
import IconView from '../components/Icon'
import BackButton from '../components/BackButton'

export default function SettingsScreen(props) {
    const navigation = props.navigation;
    const [user, setUser] = useState("");

    const getUser = async () => {
        const result = await AsyncStorage.getItem('user');
        if (result !== null) setUser(JSON.parse(result));
      };

    
    const deleteData = async () => {
        await AsyncStorage.clear();
        console.log("Storage cleared")
    }

    const displayDeleteAlert = () => {
        Alert.alert("Вы уверены?", "Это пермаментно удалит все данные!", [
            {
                text: "Удалить",
                onPress: deleteData
            },
            {
                text: "Отмена"
            }
        ], {cancelable: true})
    }


    useEffect(() => {
        getUser();
    }, [])

  return (
    <View style={styles.container}>
        <View style={[styles.statusBtns, {paddingBottom: 24, paddingTop: 21}]}>
            <BackButton onPress={() => {navigation.goBack()}}/>
            <View style={[styles.header, StyleSheet.absoluteFill]}>
                <Text style={styles.headerText}>Настройки</Text>
            </View>
        </View>
        <View style={styles.nameBlock}>
            <View style={styles.avatarBlock}>
                <View style={styles.avatar}>
                    <IconView IconName='user-alt' type='FontAwesome5' size={42}/>
                </View>
                <Text style={styles.name}>{user.name}</Text>
            </View>
            <TouchableOpacity style={styles.changeNameBtn}>
                <IconView IconName='pencil-alt' type='FontAwesome5' size={21}/>
                <Text style={styles.changeNameText}>Изменить имя</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.settingsBlock}>
            <Text style={styles.hintText}>НАСТРОЙКИ ПРИЛОЖЕНИЯ</Text>
            <View style={styles.changeAPIBtn}>
                <TouchableOpacity style={styles.funcBtn} onPress={() => {}}>
                    <View style={styles.funcBlock}>
                        <IconView IconName='wand-magic' size={27} type='FontAwesome6'/>
                        <Text style={styles.funcText}>Change API Keys</Text>
                    </View>
                    <IconView IconName='angle-right' size={20} type='FontAwesome6'/>
                </TouchableOpacity>
            </View>
            <View style={styles.changeThemeBtn}>
                <TouchableOpacity style={styles.funcBtn} onPress={() => {}}>
                    <View style={styles.funcBlock}>
                        <IconView IconName='adjust' size={27} type='FontAwesome5'/>
                        <Text style={styles.funcText}>Тема</Text>
                    </View>
                    <Text style={styles.currTheme}>Светлая</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.deleteDataBtn}>
            <TouchableOpacity onPress={displayDeleteAlert}>
                <View style={styles.funcBlock}>
                    <IconView IconName='trash-alt' size={27} type='FontAwesome5' style={{color: colors.RED}}/>
                    <Text style={[styles.funcText, {color: colors.RED}]}>Стереть все данные</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={[styles.version, StyleSheet.absoluteFillObject]}>
            <Text style={styles.versionText}>NotepadAI v1.0</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        backgroundColor: colors.LIGHT
    },
    statusBtns: {
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 16,
        fontWeight: '600',
        bottom: 3
    },
    backBtn: {
        backgroundColor: colors.ERROR,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1
    },
    nameBlock: {
        paddingBottom: 48
    },
    versionText: {
        top: 713,
        left: 130,
        opacity: 0.5,
        fontWeight: 'bold'
    },
    avatarBlock: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 48
    },
    avatar: {
        padding: 15,
        borderRadius: 40,
        backgroundColor: colors.LIGHT_TIME,
    },
    name: {
        paddingLeft: 16,
        fontWeight: 'bold',
        fontSize: 23    
    },
    changeNameBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 20,
        padding: 7
    },
    changeNameText: {
        paddingLeft: 8,
        fontSize: 18
    },
    hintText: {
        fontSize: 11,
        opacity: 0.5,
        paddingBottom: 8
    },
    funcBlock: {
        maxHeight: 60,
        minHeight: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    funcText: {
        paddingLeft: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    funcBtn: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    settingsBlock: {
        paddingBottom: 16
    },
})