import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../misc/colors'

const formatNum = (num) => {
  if (num.toString().length < 2) {
      num = "0" + num.toString()
  };
  return num
}

export default function Note({item, onPress}) {
    const {title, desc, time, color} = item
    const [bgColor, setBgColor] = useState('')
    const [timeColor, setTimeColor] = useState('')
    const [timeTextColor, setTimeTextColor] = useState(colors.TEXT)

    const formatTime = time => {
      const date = new Date(time);
      var day = formatNum(date.getDate());
      var month = formatNum(date.getMonth() + 1);
      const hrs = formatNum(date.getHours());
      const minuts = formatNum(date.getMinutes());
      return `${day}.${month} - ${hrs}:${minuts}`;
  }

  useEffect(() => {
    if (color === 'white') {
      setBgColor(colors.LIGHT);
      setTimeColor(colors.LIGHT_TIME);
      setTimeTextColor(colors.TEXT);
    }
    if (color === 'red') {
      setBgColor(colors.RED_CARD);
      setTimeColor(colors.RED_TIME);
      setTimeTextColor(colors.LIGHT);
    }
    if (color === 'purple') {
      setBgColor(colors.PURPLE_CARD);
      setTimeColor(colors.PURPLE_TIME);
      setTimeTextColor(colors.LIGHT);
    }
    if (color === 'green') {
      setBgColor(colors.GREEN_CARD);
      setTimeColor(colors.GREEN_TIME);
      setTimeTextColor(colors.LIGHT);
    }
    if (color === 'yellow') {
      setBgColor(colors.YELLOW_CARD);
      setTimeColor(colors.YELLOW_TIME);
      setTimeTextColor(colors.TEXT);
    }
  }, [color])


  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {backgroundColor: bgColor}]} >
      <View style={styles.text_zone}>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
        <Text numberOfLines={5} style={styles.desc}>{desc}</Text>
      </View>
      <View style={[styles.time_zone, {backgroundColor: timeColor}]}>
        <Text style={[styles.time, {color: timeTextColor}]}>{formatTime(time)}</Text>
      </View>
    </TouchableOpacity>
  )
}

const width = (Dimensions.get('window').width - 40) / 2

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.LIGHT,
        width: width - 10,
        height: 150,
        border: 2,
        borderColor: colors.DARK,
        borderRadius: 10,
        elevation: 3,
    },
    title: {
        fontWeight: 'bold',
        color: colors.TEXT,
        fontSize: 20
    },
    desc: {
      color: colors.TEXT,
      fontSize: 12,
    },
    time_zone: {
      backgroundColor: colors.LIGHT_TIME,
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 10,
      padding: 4,
    },
    time: {
      fontSize: 10,
    },
    text_zone: {
      padding: 7,
      height: '86%'
    }
})