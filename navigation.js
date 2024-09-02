import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import React from 'react'
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import CartScreen from "./screens/cartScreen";
import OrderScreen from "./screens/OrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen name="Cart" options={{ presentation: "modal" }} component={CartScreen} />
        <Stack.Screen name="Order" options={{ presentation: "fullScreenModal" }} component={OrderScreen} />
        <Stack.Screen name="Delivery" options={{ presentation: "fullScreenModal" }} component={DeliveryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}