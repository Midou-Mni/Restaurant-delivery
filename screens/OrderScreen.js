import { View, Text,Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function OrderScreen() {
  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery')
    }, 2000)
  }, [])
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image source={require('../assets/images/delivery.gif')} className="w-80 h-80"/>
    </View>
  )
}