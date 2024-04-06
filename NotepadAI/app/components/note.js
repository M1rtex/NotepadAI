import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../misc/colors'

const formatNum = (num) => {
  if (num.toString().length < 2) {
      num = "0" + num.toString()
  };
  return num
}

export default function Note({item, onPress, theme}) {
    const {title, desc, time, color} = item
    const [bgColor, setBgColor] = useState('')
    const [timeColor, setTimeColor] = useState('')
    const [timeTextColor, setTimeTextColor] = useState(colors.TEXT)
    const [textColor, setTextColor] = useState(colors.TEXT)

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
      if (theme === 'light') {
        setTextColor(colors.TEXT);
        setBgColor(colors.LIGHT);
        setTimeColor(colors.LIGHT_TIME);
        setTimeTextColor(colors.TEXT);
      } else if (theme === 'dark') {
        setBgColor(colors.BLACK_CARD);
        setTimeColor(colors.SECONDARY_DARK);
        setTimeTextColor(colors.TEXT_DARK);
        setTextColor(colors.TEXT_DARK)
      }
    }
    if (color === 'red') {
      if (theme === 'light') {
        setTextColor(colors.TEXT);
        setBgColor(colors.RED_CARD);
        setTimeColor(colors.RED_TIME);
        setTimeTextColor(colors.LIGHT);
      } else if (theme === 'dark') {
        setBgColor(colors.RED_CARD_DARK);
        setTimeColor(colors.RED_TIME_DARK);
        setTimeTextColor(colors.LIGHT);
        setTextColor(colors.TEXT_DARK)
      }
    }
    if (color === 'purple') {
      if (theme === 'light') {
        setTextColor(colors.TEXT);
        setBgColor(colors.PURPLE_CARD);
        setTimeColor(colors.PURPLE_TIME);
        setTimeTextColor(colors.LIGHT);
      } else if (theme === 'dark') {
        setBgColor(colors.PURPLE_CARD_DARK);
        setTimeColor(colors.PURPLE_TIME_DARK);
        setTimeTextColor(colors.LIGHT);
        setTextColor(colors.TEXT_DARK);
      }
    }
    if (color === 'green') {
      if (theme === 'light') {
        setTextColor(colors.TEXT);
        setBgColor(colors.GREEN_CARD);
        setTimeColor(colors.GREEN_TIME);
        setTimeTextColor(colors.LIGHT);
      } else if (theme === 'dark') {
        setBgColor(colors.GREEN_CARD_DARK);
        setTimeColor(colors.GREEN_TIME_DARK);
        setTimeTextColor(colors.GRAY_TIME);
        setTextColor(colors.PRIMARY_DARK)
      }
    }
    if (color === 'yellow') {
      if (theme === 'light') {
        setBgColor(colors.YELLOW_CARD);
        setTimeColor(colors.YELLOW_TIME);
        setTimeTextColor(colors.TEXT);
      } else if (theme === 'dark') {
        setBgColor(colors.YELLOW_CARD_DARK);
        setTimeColor(colors.YELLOW_TIME_DARK);
        setTimeTextColor(colors.GRAY_TIME);
      }
    }
  }, [color, theme])


  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {backgroundColor: bgColor}]} >
      <View style={styles.text_zone}>
        <Text numberOfLines={2} style={[styles.title, {color: textColor}]}>{title}</Text>
        <Text numberOfLines={5} style={[styles.desc, {color: textColor}]}>{desc}</Text>
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
        width: width - 10,
        height: 150,
        border: 2,
        borderColor: colors.DARK,
        borderRadius: 10,
        elevation: 3,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    desc: {
      fontSize: 12,
    },
    time_zone: {
      backgroundColor: colors.LIGHT_TIME,
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 10,
      padding: 4,
      paddingHorizontal: 10
    },
    time: {
      fontSize: 10,
    },
    text_zone: {
      padding: 7,
      height: '86%'
    }
})