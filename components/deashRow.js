import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { themeColors } from '../theme'
import * as Icon from 'react-native-feather'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, selectCartItemsById } from '../slices/cartSlice'
import { urlFor } from '../sanity'

export default function DeashRow({ item }) {
    const dispatch = useDispatch();
    const totalItems = useSelector((state) =>selectCartItemsById(state, item._id));

    const handleIncrease = () => {
        dispatch(addToCart({ ...item }))
    }
    const handleDecrease = () => {
        dispatch(removeFromCart({ id: item._id }))
    }
  return (
    <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
        <Image source={{ uri: urlFor(item.image).url() }} style={{ width: 100, height: 100 }} className="rounded-3xl" />
        <View className="flex flex-1 space-y-3">
            <View className="pl-3">
                <Text className="text-xl font-bold">{item.name}</Text>
                <Text className="text-gray-700">{item.description}</Text>
            </View>
            <View className="flex-row justify-between items-center pl-3">
                <Text className="text-gray-700 text-lg font-bold">${item.price}</Text>
                <View className="flex-row items-center space-x-1">
                    <TouchableOpacity
                        onPress={handleDecrease}
                        disabled={!totalItems.length}
                        className="p-1 rounded-full"
                        style={{ backgroundColor: themeColors.bgColor(1) }}>
                            <Icon.Minus strokeWidth={2} width={20} height={20} stroke={"white"} />
                    </TouchableOpacity>
                    <Text className="px-3">
                        {totalItems.length}
                    </Text>
                    <TouchableOpacity
                        onPress={handleIncrease}
                        className="p-1 rounded-full"
                        style={{ backgroundColor: themeColors.bgColor(1) }}>
                            <Icon.Plus strokeWidth={2} width={20} height={20} stroke={"white"} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  )
}