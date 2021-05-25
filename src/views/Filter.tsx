import React, { useEffect, useState, useRef } from 'react';
import { StatusBar, View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { getUsers } from '../store/actions/mainActions';
import { calcFontSize, calcHeight, calcWidth } from '../utils/demensions';

export interface IProps {
    closeToaster: () => void
}
const Filter: React.FC<IProps> = (props) => {
    const { closeToaster } = props
    const dispatch = useDispatch();
    const [selectedGender, setSelectedGender] = useState<boolean[]>([false, false, true])
    const [genderTypes, setGenderTypes] = useState<string[]>(["Guys", "Girls", "Both"])
    const [selectedFilter, setSelectedFilter] = useState<boolean[]>([true, false, false])
    const [filter, setFilter] = useState<string[]>(["All", "Online", "New"])
    const [filterGenderType, setFilterGenderType] = useState<string[]>(['Male','Female','Both'])
    const [filterElements, setFilterElements] = useState({
        minAge: 18,
        maxAge: 80,
        city: "Kiev",
        country: "Ukraine",
        targetGender: "Female",
        lat: 0,
        lng: 0,
        page: 1,
        limit: 24
    })
    return (<View style={{ backgroundColor: "white", paddingBottom: calcHeight(30) }}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#eb3458', '#eb34d9', '#e834eb']}
            style={styles.header}>
            <TouchableOpacity onPress={() => { }}>
                <Image
                    style={{ width: calcHeight(20), height: calcHeight(20) }}
                    source={require('../assets/icons/microphone.png')}
                />
            </TouchableOpacity>
            <Text style={styles.text}>
                Filter
    </Text>
            <TouchableOpacity onPress={() => {
                closeToaster()
                dispatch(getUsers({
                    minAge: filterElements.minAge,
                    maxAge: filterElements.maxAge,
                    city: filterElements.city,
                    country: filterElements.country,
                    targetGender: filterElements.targetGender,
                    lat: filterElements.lat,
                    lng: filterElements.lng,
                    page: filterElements.page,
                    limit: filterElements.limit
                }))
            }}>
                <Image
                    style={{ width: calcHeight(20), height: calcHeight(20) }}
                    source={require('../assets/icons/check.png')}
                />
            </TouchableOpacity>
        </LinearGradient>
        <Text style={styles.location}>Location</Text>
        <View style={styles.input}>
            <TextInput placeholder='Current Location (Yerevan)' />
        </View>
        <Text style={styles.location}>Show me</Text>
        <View style={styles.gender}>
            {genderTypes.map((el: string, i: number) => {
                return <TouchableOpacity
                    onPress={() => {
                        let newArr = [false, false, false]
                        newArr[i] = !newArr[i]
                        setSelectedGender(newArr)
                        let newFilters = {...filterElements}
                        filterElements.targetGender = filterGenderType[i]
                    }}
                    key={i} style={[styles.itemContainer, { backgroundColor: selectedGender[i] ? "pink" : "white" }]}>
                    <Text style={{ color: "grey" }}>{el}</Text>
                </TouchableOpacity>
            })}
        </View>
        <Text style={styles.location}>Filter By</Text>
        <View style={styles.gender}>
            {filter.map((el: string, i: number) => {
                return <TouchableOpacity
                    onPress={() => {
                        let newArr = [false, false, false]
                        newArr[i] = !newArr[i]
                        setSelectedFilter(newArr)
                    }}
                    key={i} style={[styles.itemContainer, { backgroundColor: selectedFilter[i] ? "pink" : "white" }]}>
                    <Text style={{ color: "grey" }}>{el}</Text>
                </TouchableOpacity>
            })}
        </View>
    </View>
    );
};

export default Filter;
const styles = StyleSheet.create({
    header: {
        height: calcHeight(100),
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    text: {
        color: "white",
        fontSize: calcFontSize(20),
        fontWeight: "bold"
    },
    location: {
        color: "grey",
        fontWeight: "bold",
        padding: calcWidth(20)
    },
    gender: {
        borderWidth: 2,
        borderColor: "pink",
        borderRadius: 20,
        marginHorizontal: calcWidth(20),
        flexDirection: "row",
        height: calcHeight(40),
        justifyContent: "space-between",
    },
    input: {
        borderWidth: 2,
        borderColor: "pink",
        borderRadius: 20,
        marginHorizontal: calcWidth(20)
    },
    itemContainer: {
        paddingHorizontal: calcWidth(35),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 17,
    }
});