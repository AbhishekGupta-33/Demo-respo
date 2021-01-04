import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated  } from 'react-native';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
//const { height, width } = Dimensions.get('window')

const AnimatedBar = ({ item, index }) =>{
    const { title, value } = item ;

    let getWidth = new Animated.Value(0);

    useEffect(()=>{
        animatedBarrrr();
    },[]);
   
     const animatedBarrrr = () =>{
           console.log('kk',index,getWidth)
        getWidth.setValue(0)
        Animated.timing( getWidth, {
            toValue : value * .2,
            delay :  index * 300,
            useNativeDriver : false,
        }).start()
     }
    
    return (
        <View style={styles.innerView} >
            <Text style={styles.detailtitle}>{title}</Text>
            <Text style={styles.detailtext}>{value}</Text>
             <Animated.View style={[styles.bar, { width : getWidth }]}/>
         </View>
    )
}

const styles = StyleSheet.create({
    innerView : {
        flexDirection : 'row',
    },
    bar : {
        height : 15,
        borderRadius : 7,
        alignSelf : 'center',
        borderWidth: 2,
        borderColor: "#c72f06",
        backgroundColor: "#e75832"
    },
    detailtitle : {
        marginRight : 20,
        fontSize : 20,
        fontWeight : 'bold',
        width : 100//width * .25
    },
    detailtext : {
        marginRight : 15,
        fontSize : 20,
        fontWeight : 'bold',
        width :  90//width * .12
    }
})

export default AnimatedBar;