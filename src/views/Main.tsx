import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, Animated, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../store/actions/mainActions';
import Card from '../components/card';
import { setMasteriumApiAuthorizationHeader } from '../services/api/authInstance';
import { usersSelector } from '../store/selector/mainSelector';
import { calcHeight, calcWidth } from '../utils/demensions';
import Filter from './Filter';

const Main: React.FC = () => {
    const dispatch = useDispatch();
    const usersList = useSelector(usersSelector)
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [openToaster, setOpenToaster] = useState<boolean>(false)
    useEffect(() => {
        setMasteriumApiAuthorizationHeader("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTMzOTYzNTgsInVzZXJJZCI6MTE4MzA0fQ.oUYHELxRGD3BU9EeowerKh-E8XjOzW9bZUSo31uXdA0");
        dispatch(getUsers({
            minAge: 18,
            maxAge: 80,
            city: "Kiev",
            country: "Ukraine",
            targetGender: "Female",
            lat: 0,
            lng: 0,
            page: 1,
            limit: 24
        }))
    }, [])
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000
        }).start();
    };
    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000
        }).start();
    };

    return (
        <ScrollView>
            <TouchableOpacity onPress={() => {
                setOpenToaster(true)
                fadeIn()
            }}
                style={styles.filter}>
                <Image
                    style={{ width: calcHeight(20), height: calcHeight(17) }}
                    source={require('../assets/icons/filter.png')}
                />
            </TouchableOpacity>
            <Animated.View
                style={[
                    styles.fadingContainer,
                    openToaster && {
                        position: "absolute",
                    },
                    {
                        opacity: fadeAnim,
                    }
                ]}
            >
                {openToaster && <Filter closeToaster={() => {
                    setOpenToaster(false)
                    fadeOut()
                }} />}
            </Animated.View>
            <View style={styles.wrap} >
                {usersList.map((item, i: number) => {
                    return <View key={i} style={{
                        marginTop: i % 2 != 0 ? calcHeight(50) : calcHeight(30),
                        paddingHorizontal: i % 2 != 0 ? calcWidth(10) : 0
                    }}>
                        <Card item={item} />
                    </View>
                })
                }
            </View>
        </ScrollView>
    );
};

export default Main;
const styles = StyleSheet.create({
    wrap: {
        flexDirection: "row",
        flexWrap: 'wrap',
        paddingBottom: calcHeight(50),
        justifyContent: "center",
        marginTop: calcHeight(10)
    },
    fadingContainer: {
        zIndex: 1,
        width: "100%",
        top: calcHeight(0)
    },
    filter: {
        alignItems: "flex-end",
        padding: calcHeight(20),
    }
});