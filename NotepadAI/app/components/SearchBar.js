import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../misc/colors'

export default function SearchBar({containerStyle, value, onChangeText, onClear}) {
  return (
    <>
    <View style={[styles.container, {...containerStyle}]}>
        <TextInput value={value} onChangeText={onChangeText} style={styles.searchBar} placeholder='Поиск...' />
        {value ? <FontAwesome5 name="redo-alt" onPress={onClear} size={20} style={styles.clearIcon} color={colors.DARK} />: null}
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    searchBar : {
        borderWidth: 0.5,
        borderColor: '#f0f0f0',
        borderRadius: 8,
        paddingLeft: 15,
        paddingVertical: 5,
        fontSize: 25,
        backgroundColor: colors.SEARCH,
    },
    container: {
      height: 50
    },
    clearIcon: {
      position: 'absolute',
      right: 10
    }
})