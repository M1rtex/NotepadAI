import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';

export default function NotFound() {
  return (
    <View  style={[styles.container, StyleSheet.absoluteFillObject]}>
      <AntDesign name="frowno" size={92} color={colors.TEXT} />
      <Text style={{marginTop: 20, fontSize: 20}}>Ничего не найдено</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.6,
        zIndex: -1
    }
})