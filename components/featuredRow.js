import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import RestaurantCard from './restaurantCard'

export default function ({ title, description, restaurants }) {
  return (
    <View>
        <View className="flex-row items-center justify-between px-4">
            <View>
                <Text className="text-lg font-bold">{title}</Text>
                <Text className="text-xs text-gray-500">{description}</Text>
            </View>
            <TouchableOpacity>
                <Text style={{ color: themeColors.text }} className="font-semibold">Show all</Text>
            </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="overflow-visible py-5"
          >
            {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant._id} item={restaurant} />
            ))}
        </ScrollView>
    </View>
  )
}