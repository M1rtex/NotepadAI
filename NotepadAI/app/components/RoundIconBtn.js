import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'
import colors from '../misc/colors'

export default function RoundIconBtn({IconName, size, color, style, onPress}) {
  return <FontAwesome6 
            name={IconName} 
            size={size || 24} 
            color={color || colors.DARK} 
            style={[styles.icon, {...style}]}
            onPress={onPress}
		/>
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: colors.PURPLE,
    padding: 15,
    borderRadius: 50,
    elevation: 5
  }
})