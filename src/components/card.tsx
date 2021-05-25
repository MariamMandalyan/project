import React, { useEffect, useState, useRef } from 'react';
import { StatusBar, View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { calcHeight, calcWidth } from '../utils/demensions';
export interface IProps {
    item: {
        firstName: string,
        photo: string,
        isOnline: boolean
    }
}

const Card: React.FC<IProps> = (props) => {
    const { item } = props
    return (
        <View style={styles.container}>
            <Image
                style={styles.imageContainer}
                source={{ uri: `https://images.heysingles.com/photos/fullhd/${item.photo}` }}
            />
            {item.isOnline && <View style={styles.circle} />}
            <View style={styles.fullNameContainer}>
                <Text numberOfLines={1} style={styles.text}>
                    {item.firstName}
                </Text>
            </View>
        </View>
    );
};

export default Card;
const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    imageContainer: {
        width: calcWidth(100),
        height: calcHeight(130),
        borderRadius: 15
    },
    fullNameContainer: {
        width: calcWidth(90),
        height: calcHeight(40),
        backgroundColor: "white",
        borderRadius: 15,
        position: "absolute",
        bottom: calcHeight(-20),
        borderColor: "grey",
        borderWidth: 2
    },
    text: {
        color: "grey",
        textAlign: "center",
        width: calcWidth(90),
        height: calcHeight(40),
        justifyContent: "center",
        paddingVertical: calcHeight(7)
    },
    circle: {
        width: calcWidth(12),
        height: calcWidth(12),
        borderRadius: calcWidth(6),
        backgroundColor: "#34eb58",
        position: "absolute",
        bottom: calcHeight(15),
        zIndex: 1,
        borderWidth: 1,
        borderColor: "white"
    }
});