import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { View, Text, TextInput, ScrollView } from 'react-native'

import Categories from '../components/categories'
import FeaturedRow from '../components/featuredRow'

import * as Icon from 'react-native-feather'
import { themeColors } from '../theme'
import { getFeateuredRestaurant } from '../api'

export default function HomeScreen() {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([])

  useEffect(() => {
    getFeateuredRestaurant().then((data) => {
      setFeaturedRestaurants(data)
    })
  }, [])

  return (
    <SafeAreaView className="bg-white pb-20">
      <StatusBar barStyle="dark-content" />
      {/* Search Bar */}
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-1 flex-row items-center p-3 rounded-full border border-gray-300">
            <Icon.Search height={25} width={25} stroke={"gray"} />
            <TextInput className="ml-2 flex-1" placeholder="Restaurants" />
            <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
                <Icon.MapPin height={20} width={20} stroke={"gray"} />
                <Text className="text-gray-600">Moscow</Text>
            </View>
        </View>
        <View style={{ backgroundColor:themeColors.bgColor(1) }} className="p-3 rounded-full">
            <Icon.Sliders height={20} width={20} strokeWidth={2.5} stroke={"white"} />
        </View>
      </View>

      {/* Body */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Categories */}
        <Categories />

        {/* Featured */}
        <View className="mt-5">
          {
            featuredRestaurants.map((item, index) => {
              return (
                <FeaturedRow
                  key={item._id}
                  title={item.name}
                  restaurants={item.restaurants}
                  description={item.description}
                />
              )
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}