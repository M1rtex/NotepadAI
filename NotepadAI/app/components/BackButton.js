import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import colors from '../misc/colors'

export default function BackButton({onPress}) {
  return (<>
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.container}>
        <AntDesign name='left' 
            size={13} 
            color={colors.DARK} 
            style={styles.icon}/>
        <Text style={styles.text}>Назад</Text>
    </View>
  </TouchableWithoutFeedback>
  </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 17,
        maxWidth: 73,

    },
    text: {
        paddingBottom: 2,
        color: colors.PURPLE,
        fontWeight: 'bold'
    },
    icon: {
        color: colors.PURPLE
    }
})