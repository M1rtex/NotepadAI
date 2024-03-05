import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import colors from '../misc/colors';

export default function TranslateSelectorModal(visible, onClose) {
    const [selected, setSelected] = useState("");
  
    const data = [
        {key:'1', value:'Mobiles', disabled:true},
        {key:'2', value:'Appliances'},
        {key:'3', value:'Cameras'},
        {key:'4', value:'Computers', disabled:true},
        {key:'5', value:'Vegetables'},
        {key:'6', value:'Diary Products'},
        {key:'7', value:'Drinks'},
    ]

    return(
    <View style={[styles.box, StyleSheet.absoluteFill]}>
    
    <Modal visible={visible} animationType='slide' transparent={false}>
            <TouchableWithoutFeedback onPress={onClose}>
                {/* <View style={styles.header}/> */}
                <View style={styles.modal}>
                    <View style={styles.container}>
                    {/* <SelectList 
                            setSelected={(val) => setSelected(val)} 
                            data={data} 
                            save="value"
                        /> */}
                        <Text>123</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
    </Modal>
    </View>
    )
}

const styles = StyleSheet.create({
    header: {
        minHeight: 475,
    },
    modal: {
        paddingTop: 1,
        borderColor: colors.PLACEHOLDER,
        borderWidth: 1,
        borderRadius: 20,
        borderBottomEndRadius: 0,
        backgroundColor: colors.LIGHT,
        minHeight: 100,
        minWidth: 100,
    },
    container: {
        padding: 16,
    },
})