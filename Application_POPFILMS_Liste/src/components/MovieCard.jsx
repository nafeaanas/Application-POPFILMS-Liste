import React, {useState} from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    TouchableNativeFeedback,
    ImageBackground
} from "react-native";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";
import {Images} from "../constants/Images"
import { Ionicons } from '@expo/vector-icons';
import { getPoster, getLanguage } from "../services/MovieService"; 

const MovieCard = ({
    title, 
    poster, 
    language, 
    voteAverage, 
    voteCount, 
    size,
    heartLess,
    onPress
}) => {
    const [liked, setLiked] = useState(false);
    const [voteCountValue, steVoteCountValue] = useState(voteCount)

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <ImageBackground 
                style={{...styles.container, width: 230 * size, height: 340 * size}} 
                source={{uri: getPoster(poster)}}
                imageStyle={{ borderRadius: 12}}
                >

                <View style={{...styles.imdbContainer, paddingVertical: 3 * size}}>
                    <Image 
                    source={Images.IMDB} 
                    resizeMode="cover" 
                    style={{...styles.imdbImage, height: 20 * size, width: 50 * size}}
                    />
                    <Text style={{...styles.imdbRating, marginRight: 5 * size, fontSize: 14 * size}}>{voteAverage}</Text>
                </View>
                {!heartLess ? (
                    <TouchableNativeFeedback 
                        onPress={()=> {
                            setLiked(!liked);
                            steVoteCountValue(
                                liked ? voteCountValue - 1 : voteCountValue + 1
                            );
                        }}
                    >
                        <Ionicons 
                            name={liked ? "heart" : "heart-outline"} 
                            size={25 * size} 
                            color={liked ? Colors.HEART : Colors.BASIC_COLR}
                            style={{position: "absolute", bottom: 10, left: 10}}
                        />
                    </TouchableNativeFeedback>
                ) : null }
            </ImageBackground>
            <View>
                <Text style={{...styles.movieTitle, width: 230 * size}} numberOfLines={3}>
                    {title}
                </Text>
                <View style={styles.movieSubTitleContainer}>
                    <Text style={styles.movieSubTitle}>{getLanguage(language).english_name}</Text>
                    <View style={styles.rowAndCenter}>
                        <Ionicons 
                            name="heart" 
                            size={17 * size} 
                            color={Colors.HEART} 
                            style={{ marginRight: 5}} />
                        <Text style={styles.movieSubTitle}>{voteCountValue}</Text>
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
        justifyContent: "space-between",

    },
    movieSubTitle:{
        fontSize: 12,
        fontFamily: Fonts.REGULAR,
        color: Colors.BASIC_COLR
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

});
MovieCard.defaultProps = {
    size: 1,
    heartLess: true
}

export default MovieCard;