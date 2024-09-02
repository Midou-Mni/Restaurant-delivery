import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import * as Icon from 'react-native-feather'
import { themeColors } from '../theme'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../slices/restaurantSlice';
import { removeFromCart, selectCartItems, selectCartTotal } from '../slices/cartSlice';
import { urlFor } from '../sanity';

export default function CartScreen() {
    const Restaurant = useSelector(selectRestaurant)
    const navigation = useNavigation()
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)
    const [groupedItems, setGroupedItems] = useState({})
    const deliveryFee = 2;
    const dispatch = useDispatch();

    useEffect(() => {
        const items = cartItems.reduce((group, item) => {
            if(group[item._id]) {
                group[item._id].push(item);
            } else {
                group[item._id] = [item];
            }
            return group;
        }, {})
        setGroupedItems(items);
    }, [cartItems])

  return (
    <View className="flex-1 bg-white">
        {/* Back Button */}
        <View className="relative py-4 shadow-sm">
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ backgroundColor: themeColors.bgColor(1) }}
                className="absolute z-10 p-1 rounded-full shadow top-5 left-2"
            >
                <Icon.ArrowLeft strokeWidth={3} stroke="white" />
            </TouchableOpacity>
            <View>
                <Text className="text-center text-2xl font-extrabold">Your Cart</Text>
                <Text className="text-center text-gray-500">{Restaurant?.name}</Text>
            </View>
        </View>

        {/* Delivery Time */}
        <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className="flex-row px-4 items-center">
            <Image source={require('../assets/images/delivery.png')} className="h-20 w-20"/>
            <Text className="flex-1 pl-4">Deliver in 30-40 min</Text>
            <TouchableOpacity>
                <Text style={{ color: themeColors.text }} className="font-bold">Change</Text>
            </TouchableOpacity>
        </View>
        
        {/* Dishes */}
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            className="bg-white pt-5"
        >
            {Object.entries(groupedItems).map(([key, items]) => {
                let dish = items?.[0];
                return (
                    <View 
                        key={key} 
                        className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
                    >
                        <Text style={{ color: themeColors.text }} className="font-bold">{items.length} x</Text>
                        <Image 
                            source={{ uri: urlFor(dish.image).url() }} 
                            className="h-14 w-14 rounded-full"
                            style={{ resizeMode: 'cover' }} 
                        />
                        <View className="flex-1">
                            <Text className="text-lg font-bold">{dish.name}</Text>
                            <Text className="text-gray-500">{dish.description}</Text>
                        </View>
                        <Text className="text-lg font-bold">{dish.price} $</Text>
                        <TouchableOpacity
                            className="p-1 rounded-full"
                            onPress={() => dispatch(removeFromCart({ id: dish._id }))}
                            style={{ backgroundColor: themeColors.bgColor(1) }}
                        >
                            <Icon.Minus strokeWidth={2} height={20} width={20} stroke={"white"} />
                        </TouchableOpacity>
                    </View>
                )
            }
            )}
        </ScrollView>

        {/* Totals */}
        <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className="p-6 px-8 rounded-t-3xl space-y-4">
            <View className="flex-row justify-between">
                <Text className="text-gray-700">Subtotal</Text>
                <Text className="text-gray-700">${cartTotal}</Text>
            </View>
            <View className="flex-row justify-between">
                <Text className="text-gray-700">Delivery Fee</Text>
                <Text className="text-gray-700">${deliveryFee}</Text>
            </View>
            <View className="flex-row justify-between">
                <Text className="text-gray-700 font-extrabold">Order Total</Text>
                <Text className="text-gray-700 font-extrabold">${cartTotal + deliveryFee}</Text>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Order')}
                    style={{ backgroundColor: themeColors.bgColor(1) }}
                    className="p-3 rounded-full"
                >
                    <Text className="text-white text-center font-bold text-lg">Place Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}