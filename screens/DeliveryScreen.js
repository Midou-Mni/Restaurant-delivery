import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Icon from 'react-native-feather'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../slices/restaurantSlice';
import { themeColors } from '../theme'
import { emptyCart, selectCartTotal } from '../slices/cartSlice';

export default function DeliveryScreen() {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const cartTotal = useSelector(selectCartTotal);
  const deliveryFee = 2;
  

  const cancelOrder = () => {
    navigation.navigate('Home');
    dispatch(emptyCart());
  }
  return (
    <View className="flex-1">
      {/* Map View */}
      <MapView
        initialRegion={{
          latitude: restaurant.lat || 0,
          longitude: restaurant.lng || 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        className="flex-1"
        mapType="standard">
          <Marker 
            coordinate={{
              latitude: restaurant.lat,
              longitude: restaurant.lng,
            }}
            title={restaurant.name}
            description={restaurant.address}
            pinColor={themeColors.bgColor(1)}
          />
        </MapView>

        <View className="rounded--t-3xl -mt-12 bg-white relative">
          <View className="flex-row justify-between px-5 pt-10">
            <View>
              <Text className="text-lg text-gray-700 font-semibold">Estimated Arrival</Text>
              <Text className="text-3xl font-extrabold text-gray-700">20-30 Minutes</Text>
              <Text className="text-gray-700 mt-2 font-semibold">Your order at is own it's way!</Text>
            </View>
            <Image className="w-24 h-24" source={require('../assets/images/DeliveryBoy.gif')}/>
          </View>

          <View
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2"
          >
            <View 
              className="p-1 rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.4)'}}
            >
              <Image source={require('../assets/images/deliveryGuy.jpg')} className="w-16 h-16 rounded-full" />
            </View>
            <View className="flex-1 ml-3">
              <Text className="text-lg font-bold text-white">Pitkovic Jarry</Text>
              <Text className="font-semibold text-white">Your Ride</Text>
            </View>

            <View className="flex-row items-center space-x-3 mr-3">
              <TouchableOpacity className="bg-white p-2 rounded-full">
                <Icon.Phone strokeWidth={1} stroke={themeColors.bgColor(1)} fill={themeColors.bgColor(1)} />
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelOrder} className="bg-white p-2 rounded-full">
                <Icon.X strokeWidth={5} stroke={'red'} />
              </TouchableOpacity>
            </View>
          </View>

          <View className="p-5">
            <View className="flex-row justify-between">
              <View>
                <Text className="text-gray-700 text-lg">Order Total</Text>
                <Text className="text-gray-700 text-xl font-extrabold">${cartTotal}</Text>
              </View>
              <View>
                <Text className="text-gray-700 text-lg">Delivery Fee</Text>
                <Text className="text-gray-700 text-xl font-extrabold">${deliveryFee}</Text>
              </View>
            </View>
            <View className="mt-5">
              <Text className="text-gray-700 text-lg">Your Total</Text>
              <Text className="text-gray-700 text-xl font-extrabold">${cartTotal + deliveryFee}</Text>
            </View>
          </View>
        </View>
    </View>
  )
}