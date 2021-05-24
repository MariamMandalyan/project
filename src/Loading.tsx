import React, { useEffect, useState, useMemo } from 'react';
import { StatusBar, NativeModules, View, Text, Image, StyleSheet } from 'react-native';
import { calcHeight, calcWidth } from './utils/demencions';
import AsyncStorage from "@react-native-community/async-storage";

const Loading: React.FC = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2f879d" />
            <Text style={styles.title}>M99</Text>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require('./assets/icons/logo.jpg')}
                />
            </View>
        </View>
    );
};
export default Loading;
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#2f879d", 
        width: "100%",
        alignItems:"center"
    },
    title: {
        fontSize: 50, 
        position: "absolute", 
        right: calcWidth(20), 
        fontWeight: "bold", 
        color: "#a7e8f8"
    },
    imageContainer: {
        width: "100%",  
        justifyContent: "center", 
        alignItems:"center", 
        flex: 1,
        height:calcHeight(50)
    },
    image: {
        width: calcWidth(200), 
        height: calcHeight(200), 
        alignItems: "center"
    }
});