import React, { useEffect, useState, useRef } from 'react';
import { StatusBar, View, Text, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';


const Card: React.FC = () => {


    return (
        <View style={styles.container}>
            <View style={styles.fullNameContainer}>
                <Text numberOfLines={1} style={styles.text}>
                    dkbsdbvhdbvhdbv
                </Text>
            </View>
        </View>
    );
};

export default Card;
const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 200,
        backgroundColor: "black",
        borderRadius: 15,
        alignItems:"center"
    },
    fullNameContainer: {
        width: 120,
        height: 50,
        backgroundColor: "white",
        borderRadius: 15,
        position:"absolute",
        bottom: -25,
        borderColor:"grey",
        borderWidth:2
    },
    text: {
        color: "grey",
        textAlign:"center",
        width: 120,
        paddingVertical: 10
    }
});