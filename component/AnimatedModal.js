/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Easing,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { height, width} = Dimensions.get('screen');

const AnimatedModal = ({ onClose, children }) => {

  useEffect(( prevProps, prevState )=>{
  
      yTranslate.setValue(0); 
      Animated.spring(yTranslate, {
        toValue: 1,
        friction: 6,
        useNativeDriver : true,
      }).start();
  
  },[])

  let yTranslate = new Animated.Value(0);
  let negativeHeight = -height + 120 ;
  let modalMoveY = yTranslate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, negativeHeight],
  });
 // let bottomStyle = this.props.visible ? { bottom: 0 } : { bottom: -height };
  let translateStyle = {transform: [{translateY: modalMoveY}]};

  return (
    <Animated.View style={[styles.container, translateStyle]}>
      <View style={styles.modalContent}>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: height,
    width: width,
    bottom: -height,
    backgroundColor: '#fff',
  },
  modalContent : {
      flex : 1,
      backgroundColor : '#fff',
  },
});

export default AnimatedModal;
