
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import DetailNavigation from './navigation/DetailNavigation';
import PhoneGallery from './src/Phonegallery';

const App = () => {
  return ( 
    <NavigationContainer>
      <DetailNavigation/>
    </NavigationContainer>
  )
};

export default App;
