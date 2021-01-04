/* eslint-disable prettier/prettier */
import React  from 'react';
import {View, Image, StyleSheet,Animated, Easing, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { IconButton } from 'react-native-paper';

const { height, width } = Dimensions.get('screen');

const PhonePhamplate = ( {item, bookMarkPress} ) => {
    const {imageUrl} =  item ;

        let rotate = new Animated.Value(0);
        let scaleValue = new Animated.Value(0);
      
        
        const cardScale = scaleValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.1, 1.2],
        });

        let rotation = rotate.interpolate({
            inputRange: [0, 1],
            outputRange: [ "0deg", "180deg"],
          });

        const cardPress = () => {
            scaleValue.setValue(0);
            Animated.timing(scaleValue, {
                toValue : -1,
                duration : 250,
                easing : Easing.linear,
                useNativeDriver : true,
            }).start();
        };

        const cardPressOut = () =>{
            Animated.timing(scaleValue, {
                toValue : 0,
                duration :100,
                easing : Easing.linear,
                useNativeDriver : true,
            }).start();

        };
        const bookmarkPress = () =>{
            Animated.timing(rotate, {
                toValue : 1,
                duration :200,
                easing : Easing.linear,
                useNativeDriver : true,
            }).start();
        };
        const bookmarkPressIn = () =>{
            Animated.timing(rotate, {
                toValue : 0,
                duration : 800,
                easing : Easing.linear,
                useNativeDriver : true,
            }).start();
            };
            
            let rotationBookmart = { transform : [{ rotate : rotation }] };
            let transformStyle = { ...styles.container, transform: [{ scale : cardScale }] };

  return (
    <TouchableWithoutFeedback  onPressIn={cardPress} onPressOut={cardPressOut}>
      <Animated.View style={transformStyle}>
        <Image
            source={{ uri : imageUrl}}
            style={styles.image}
            resizeMode="contain"
        />
        <View style={ styles.iconArray}>
            <IconButton icon="search-web" onPress={bookMarkPress}/>
            <TouchableWithoutFeedback onPressIn={bookmarkPress} onPressOut={bookmarkPressIn}>
            <Animated.View style={rotationBookmart} >
                <IconButton icon="bookmark"  />
            </Animated.View>
            </TouchableWithoutFeedback>
            <IconButton icon="share" onPress={()=>{}} />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#fff',
      padding : 40,
      width  : width / 2 - 5,
      elevation : 5,
      margin : 5,
      borderRadius : 10,
    },
    image : {
        height :140,
        width :100,
    },
    iconArray : {
        flexDirection : 'row',
        justifyContent : 'space-evenly',
    },
});

export default PhonePhamplate;