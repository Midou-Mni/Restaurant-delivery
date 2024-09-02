import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { getCategories } from '../api';
import { urlFor } from '../sanity';

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(null);
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
      })
  }, [])


  return (
    <View className="mt-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} className="overflow-visible">
        {categories.map(({ _id, name, image }) => {
          let isActive = _id === activeCategory;
          let btn = isActive ? "bg-gray-600" : "bg-gray-200";
          let text = isActive ? "font-semibold text-gray-800" : "text-gray-500";

          return (
            <View key={_id} className="flex justify-center items-center mr-6">
              <TouchableOpacity 
                onPress={() => setActiveCategory(_id)}
                className={"p-1 rounded-full shadow "+btn}>
                <Image source={{ uri: urlFor(image).url() }} style={{ width: 45, height: 45 }} />
              </TouchableOpacity>
                <Text className={"text-sm "+text}>{name}</Text>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}