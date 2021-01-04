/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { PhonelistData } from '../component/Data';
import { HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE } from '../component/LengthData';
import PhonePhamplate from '../component/PhonePamphlate';

const stack = createStackNavigator()

const PhoneGallery = ({ navigation }) => {
    
    
    let nativeScrollY  = new Animated.Value(0);

    const headerTranslate = nativeScrollY.interpolate({
        inputRange : [ 0, HEADER_SCROLL_DISTANCE ],
        outputRange : [ 0, -HEADER_SCROLL_DISTANCE],
        extrapolate : 'clamp',
    })
    const titleScale = nativeScrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.9, 0.8],
        extrapolate: "clamp"
      });
  
      const titleTranslateY = nativeScrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [25, 45, 15 ],
        extrapolate: "clamp",
      });
      const BGImageOpacity = nativeScrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.2, 0],
        extrapolate: "clamp"
      });
  
      const BGImageTranslate = nativeScrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 100],
        extrapolate: "clamp"
      });
    return (
        <>
        
            <Animated.View
            pointerEvents="none"
            style={[styles.header, { transform: [{ translateY: headerTranslate }] }]}
            >
            <Animated.Image
                style={[styles.header_bg, {
                    opacity: BGImageOpacity,
                    transform: [{ translateY: BGImageTranslate }]
                  }]}
                resizeMode={"cover"}
                source={{ uri : 'https://cnet4.cbsistatic.com/img/iJxo9AIxiXHqVoqm6nGISKtKwPI=/2020/08/18/b7168aea-9f7e-47bb-9f31-4cb8ad92fbc7/lg-note-20-ultra-5g-iphone-11-se-google-pixel-4a-lg-velvet-6133.jpg'}}
            />
            </Animated.View>
            <Animated.View style={[styles.textView, {transform: [{ scale: titleScale }, { translateY: titleTranslateY }]}]}>
               <Text style={styles.Title}>Mobile For You</Text>
            </Animated.View>
       
        <Animated.FlatList
            data={PhonelistData}
            style={{flex:1}}
            onScroll={
                Animated.event(
                [{ nativeEvent: { contentOffset: { y : nativeScrollY } } }],
                { useNativeDriver: true }
              )
            }
            scrollEventThrottle={1}
            contentInset ={{top: HEADER_MAX_HEIGHT }}
            contentOffset={{ y: -HEADER_MAX_HEIGHT}}
            numColumns ={2} 
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => {
               return ( 
                 <PhonePhamplate 
                    item ={item}
                    bookMarkPress ={()=>navigation.navigate('PhoneDetailScreen',item)}
                 />
                 )
            }}

        />
        </>
    );

};
const styles = StyleSheet.create({
    Title : { 
        color : '#fff',
        fontSize: 25,
        fontWeight : 'bold',
        alignItems: "center",
    },


    textView : {
        backgroundColor: "transparent",
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
      },
      header_bg: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor :'black',
        width: null, 
        height: HEADER_MAX_HEIGHT
      },
      header: {
        // position: "absolute",
        // top: 0,
        // left: 0,
        // right: 0, 
        backgroundColor: "#b30000",
        overflow: "hidden",
        height: HEADER_MAX_HEIGHT,
        zIndex: 1
      },

})

export default PhoneGallery;