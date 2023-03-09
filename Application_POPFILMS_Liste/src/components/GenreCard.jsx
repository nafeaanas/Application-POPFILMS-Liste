import React from "react"
import {TouchableOpacity, View, Text, StyleSheet, Dimensions} from "react-native"
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get("screen")

const setWidth = (w) => (width/100)*w;

const GenreCard = ({ genreName, active, onPress}) => {
    return(
        <TouchableOpacity style={{
            ...Styles.container,
            backgroundColor: active ? Colors.ACTVE : Colors.BASIC_COLR,
            }} 
            activeOpacity={0.5}
            onPress={() => onPress(genreName)}
        >
            <Text style={{...Styles.genreText, color: active ? Colors.BASIC_COLR : Colors.BASIC_BACKGROUND}}>{genreName}</Text>
        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: Colors.ACTVE,
        paddingVertical: 8,
        elevation: 3,
        marginVertical: 2,
        width: setWidth(25)
    },
    genreText:{
        fontSize:13,
        color: Colors.BASIC_COLR
    }
})

export default GenreCard;