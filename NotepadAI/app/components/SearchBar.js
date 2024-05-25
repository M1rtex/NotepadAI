import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../misc/colors'

export default function SearchBar({containerStyle, value, onChangeText, onClear, theme}) {

  const backgroundColor = (theme === 'light') ? colors.SEARCH : colors.SEARCH_BG_DARK
  const textColor = (theme === 'light') ? colors.DARK : colors.SEARCH_TEXT_DARK

  return (
    <>
    <View style={[styles.container, {...containerStyle}]}>
        <TextInput value={value} onChangeText={onChangeText} style={[styles.searchBar, {borderColor: backgroundColor, backgroundColor: backgroundColor, color: textColor}]} placeholderTextColor={textColor} placeholder='Поиск...' />
        {value ? <FontAwesome5 name="redo-alt" onPress={onClear} size={20} style={styles.clearIcon} color={textColor} />: null}
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    searchBar : {
        borderWidth: 0.5,
        borderRadius: 8,
        paddingLeft: 15,
        paddingVertical: 5,
        fontSize: 15,
    },
    container: {
      height: 50
    },
    clearIcon: {
      position: 'absolute',
      right: 10,
      top: 8
    }
})