import React, { useEffect, useState, useRef } from 'react';
import { StatusBar, View, Text, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import Card from '../components/card';


const Main: React.FC = () => {
  
    
    return (
        <View style={styles.mainContainer}>
        <Card />
        </View>
    );
};

export default Main;
const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 20
    }
});