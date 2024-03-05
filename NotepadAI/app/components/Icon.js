import { StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome6, AntDesign, FontAwesome5 } from '@expo/vector-icons'
import colors from '../misc/colors'

export default function IconView({type, IconName, size, style, onPress}) {
    if (type === "FontAwesome6") {
        return (
            <FontAwesome6 
            name={IconName} 
            size={size || 21} 
            color={colors.DARK} 
            style={[styles.icon, {...style}]}
            onPress={onPress}/>
          )
    }
    if (type === "FontAwesome5") {
        return (
            <FontAwesome5 
            name={IconName} 
            size={size || 21} 
            color={colors.DARK} 
            style={[styles.icon, {...style}]}
            onPress={onPress}/>
          )
    }
    if (type === "AntDesign") {
        return (
            <AntDesign 
            name={IconName} 
            size={size || 21} 
            color={colors.DARK} 
            style={[styles.icon, {...style}]}
            onPress={onPress}/>
          )
    }
  
}

const styles = StyleSheet.create({
    icon: {
        justifyContent: 'center',
      }
})