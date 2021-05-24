import React, { useEffect, useState, useRef } from 'react';
import { StatusBar, View, Text, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { calcFontSize, calcHeight, calcWidth } from '../utils/demencions';
import Sound from 'react-native-sound';
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from 'react-navigation-hooks';
import { Screens } from '../navigation/screens';
import { graphs } from '../utils/function';

const ResultTest: React.FC = () => {
    const navigation = useNavigation()
    const [resultList, setResultList] = useState([])
    const [count, setCount] = useState<string>()
    const [up, setUp] = useState<number>()
    useEffect(() => {
        setTimeout(() => {
            const getCounterMain = AsyncStorage.getItem('counterMain').then((counterMain) => {
                if (counterMain) {
                    let historyMain = JSON.parse(counterMain)
                    let result = graphs(historyMain);
                    let historyResults: any = []
                    result.newList.map((el) => {
                        historyResults.push(el.result)
                    })
                    setResultList(historyResults)
                    if (historyResults.length == 1) {
                        if (historyResults[0] > 66) {
                            setUp(1)
                            var whoosh = new Sound('obladismenti.mp3', Sound.MAIN_BUNDLE, (error) => {
                                const getVolume = AsyncStorage.getItem('volume').then((volume) => {
                                    JSON.parse(volume) && whoosh.play() && whoosh.setVolume(0.05)
                                })
                            });
                        }
                        else {
                            setUp(2)
                            var whoosh = new Sound('razochirovanie.mp3', Sound.MAIN_BUNDLE, (error) => {
                                const getVolume = AsyncStorage.getItem('volume').then((volume) => {
                                    JSON.parse(volume) && whoosh.play() && whoosh.setVolume(0.05)
                                })
                            });
                        }
                    } else {
                        setCount((historyResults[historyResults.length - 1] - historyResults[historyResults.length - 2]).toString())
                        if (historyResults[historyResults.length - 1] - historyResults[historyResults.length - 2] <= -9) {
                            setUp(2)
                            var whoosh = new Sound('razochirovanie.mp3', Sound.MAIN_BUNDLE, (error) => {
                                const getVolume = AsyncStorage.getItem('volume').then((volume) => {
                                    JSON.parse(volume) && whoosh.play() && whoosh.setVolume(0.05)
                                })
                            });
                        }
                        else if (historyResults[historyResults.length - 1] - historyResults[historyResults.length - 2] <= 0) {
                            setUp(2)
                            var whoosh = new Sound('razochirovanie.mp3', Sound.MAIN_BUNDLE, (error) => {
                                const getVolume = AsyncStorage.getItem('volume').then((volume) => {
                                    JSON.parse(volume) && whoosh.play() && whoosh.setVolume(0.05)
                                })
                            });
                        }
                        else if (historyResults[historyResults.length - 1] - historyResults[historyResults.length - 2] <= 9) {
                            setUp(1)
                            var whoosh = new Sound('obladismenti.mp3', Sound.MAIN_BUNDLE, (error) => {
                                const getVolume = AsyncStorage.getItem('volume').then((volume) => {
                                    JSON.parse(volume) && whoosh.play() && whoosh.setVolume(0.05)
                                })
                            });
                        }
                        else {
                            setUp(1)
                            var whoosh = new Sound('obladismenti.mp3', Sound.MAIN_BUNDLE, (error) => {
                                const getVolume = AsyncStorage.getItem('volume').then((volume) => {
                                    JSON.parse(volume) && whoosh.play() && whoosh.setVolume(0.05)
                                })
                            });
                        }
                    }
                    setTimeout(()=>{
                        navigation.navigate(Screens.MAIN)
                    },1000)
                }
            });
        }, 2000)
    }, [])

    if (resultList.length == 0) return <View style={[styles.container, { justifyContent: "center" }]}><ActivityIndicator size="large" color='white' /></View>
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2f879d" />
                <View style={styles.imageContainer}>
                    {up == 2 ? <ImageBackground
                        resizeMode='cover'
                        style={styles.image}
                        source={require('../assets/icons/down.png')}
                    >
                        {count ? <Text style={[styles.text, { top: calcHeight(50) }]}>{count}</Text> : null}

                    </ImageBackground> : <ImageBackground
                        resizeMode='cover'
                        style={styles.image}
                        source={require('../assets/icons/up.png')}
                    >
                            {count ? <Text style={[styles.text, { top: calcHeight(110) }]}>{`+${count}`}</Text> : null}
                        </ImageBackground>}
                </View>
        </View>
    );
};

export default ResultTest;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2f879d",
        width: "100%",
        alignItems: "center"
    },
    text: {
        position: "absolute",
        fontSize: calcFontSize(50),
        color: '#2f879d'
    },
    imageContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: calcHeight(150)
    },
    image: {
        width: calcWidth(200),
        height: calcHeight(260),
        alignItems: "center"
    }
});