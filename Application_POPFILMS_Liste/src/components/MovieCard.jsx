import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableNativeFeedback} from "react-native";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";
import {Images} from "../constants/Images"
import { Ionicons } from '@expo/vector-icons'; 

const MovieCard = () => {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.imdbContainer}>
                    <Image 
                    source={Images.IMDB} 
                    resizeMode="cover" 
                    style={styles.imdbImage}
                    />
                    <Text style={styles.imdbRating}>9.0</Text>
                </View>
                <TouchableNativeFeedback>
                <Ionicons name="heart-outline" size={24} color="black" />
                </TouchableNativeFeedback>
            </View>
            <View>
                <Text style={styles.movieTitle} numberOfLines={3}>URI - Lacasa de papel</Text>
                <View style={styles.movieSubTitleContainer}>
                    <Text style={styles.movieSubTitle}>Anas UI</Text>
                    <View style={styles.rowAndCenter}>
                        <Ionicons 
                            name="heart" 
                            size={17} 
                            color={Colors.HEART} 
                            style={{ marginRight: 5}} />
                        <Text style={styles.movieSubTitle}>75%</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.ACTVE,
        height: 340,
        width: 230,
        borderRadius: 12,
        elevation: 5,
        marginVertical: 2
    },
    movieTitle:{
        fontFamily: Fonts.EXTRA_BOLD,
        color: Colors.BASIC_COLR,
        paddingVertical: 2,
        marginTop: 5,
        width: 230  
    },
    movieSubTitleContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"

    },
    movieSubTitle:{
        fontSize: 12,
        fontFamily: Fonts.REGULAR
    },
    rowAndCenter:{
        flexDirection: "row",
        alignItems: "center"
    },
    imdbContainer:{
        flexDirection:"row",
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: Colors.YELLOW,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 12,
        paddingVertical: 3,
    },
    imdbImage:{
        height: 20,
        width: 50,
        borderBottomLeftRadius: 5,
    },
    imdbRating:{
        marginRight: 5,
        color: Colors.HEART,
        fontFamily: Fonts.EXTRA_BOLD
    }

})

export default MovieCard;