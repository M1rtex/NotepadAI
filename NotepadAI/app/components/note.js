import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../misc/colors'

export default function Note({item, onPress}) {
    const {title, desc} = item
  return (
    <TouchableOpacity onPress={onPress} style={styles.container} >
      <Text numberOfLines={2} style={styles.title}>{title}</Text>
      <Text numberOfLines={3} style={styles.desc}>{desc}</Text>
    </TouchableOpacity>
  )
}

const width = (Dimensions.get('window').width - 40) / 2

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.LIGHT,
        width: width - 10,
        padding: 7,
        border: 2,
        borderColor: colors.DARK,
        borderRadius: 10,
        elevation: 3,
    },
    title: {
        fontWeight: 'bold',
        color: colors.TEXT,
        fontSize: 20
    }
})