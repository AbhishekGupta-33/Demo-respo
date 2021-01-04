import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PhoneGallery from "../src/Phonegallery";
import PhoneDetailScreen from "../src/PhoneDetailScreen";

const Stack = createStackNavigator();

const DetailNavigation = () =>{
    return (
        <Stack.Navigator mode='modal'>
            <Stack.Screen
              name='PhoneGallery'
              component={PhoneGallery}
              options ={{
                headerShown : false
              }}
            />
            <Stack.Screen
              name='PhoneDetailScreen'
              component={PhoneDetailScreen}
            />
        </Stack.Navigator>
    )

}

export default DetailNavigation;