import React, { useEffect } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Easing } from 'react-native-reanimated';
import AnimatedBar from '../component/AnimatedBar';
import AnimatedModal from '../component/AnimatedModal';

const { height, width } = Dimensions.get('window');

const  PhoneDetailScreen = ({ route }) =>{
    const getData = route.params;

    let imageOpacityValue    = new Animated.Value(0); 
    let titleTranslateYValue = new Animated.Value(0);
    let titleScaleValue      = new Animated.Value(0);
    useEffect(()=>{
            imageOpacityValue.setValue(0);
            titleTranslateYValue.setValue(0);
            titleScaleValue.setValue(0);
      
            Animated.sequence([
              Animated.timing(imageOpacityValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver : true,
              }),
              Animated.timing(titleTranslateYValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver : true,
              }),
              Animated.timing(titleScaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver : true,
                easing: Easing.linear,
              })
            ]).start();
          
    },[])
    
    const imageOpacity = imageOpacityValue.interpolate({
        inputRange : [ 0, 0.25, 0.5, 0.75, 1],
        outputRange : [ 0, 0.25, 0.5, 0.75, 1]
    })
    const titleY = titleTranslateYValue.interpolate({
        inputRange : [0, 1],
        outputRange : [ 0, height * .5 ]
    })
    const titleScale = titleScaleValue.interpolate({
        inputRange: [0, 0.54,  1],
        outputRange: [0.5, 0.5,  1]
      });


    return(
        <AnimatedModal>
            <Animated.Image
              source={{uri : getData.imageUrl}}
              resizeMode = 'contain'
              style={[styles.imageStyle,{ opacity : imageOpacity}]}
            />
            <Animated.View style={[styles.titleContainer,{ transform : [{translateY : titleY}, { scale : titleScale}] }]}>
              <Text style={styles.title}>{getData.name}</Text>
            </Animated.View>
            <View style={styles.detailView}>
                {
                    getData.detail.map((data, index) =>{
                       return( 
                         <AnimatedBar key={index} item={data} index = {index}/>
                    )})
                }
            </View>
        </AnimatedModal>
    )
}

const styles = StyleSheet.create({
    imageStyle : {
        height : height * .4,
        width :  width * .5,
        alignSelf : 'center',
        marginTop : 20,
    },
    detailView : {
        marginBottom : 15,
        marginTop :120
    },
    innerView : {
        flexDirection : 'row'
    },
    bar : {
        height : 10,
        backgroundColor : '#b30000',
        borderRadius : 5,
    },
    detailtext : {
        marginRight : 20,
        fontSize : 20,
        fontWeight : 'bold',
        width : width * .25
    },
    title : {
        alignSelf : 'center',
        fontSize : 24,
        fontWeight : 'bold',
        textShadowColor: 'gray',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 10
      },
      titleContainer : {
       position: "absolute",
       top: 0,
       alignSelf : 'center',
      }
    
})

export default  PhoneDetailScreen