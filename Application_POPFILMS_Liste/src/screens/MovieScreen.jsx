import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { 
  Dimensions, 
  StyleSheet, 
  ScrollView, 
  Text, 
  View, 
  Image 
} from 'react-native';
import  { Colors }  from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import {getLanguage, getMovieById, getPoster} from "../services/MovieService";
import ItemSeparator from '../components/itemSeparator';
import CastCard from '../components/CastCard';
import {LinearGradient} from "expo-linear-gradient"
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather, Ionicons } from '@expo/vector-icons';
import {APPEND_TO_RESPONSE as AR} from "../constants/Urls"

const {height, width} = Dimensions.get('screen')

const setHeight = (h) => (height/100) * h
const setWidth = (w) => (width/100) * w

const MovieScreen = ({route, navigation}) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState({})

  useEffect(()=>{
    getMovieById(movieId, `${AR.CREDITS}`).then((response) => setMovie(response?.data));
  }, [])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style='light'/>
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "rgba(217, 217, 217, 0)"]}
        start={[0, 0.3]}
        style={styles.LinearGradient}
      />
      <View style={styles.moviePosterImageContainer}>
        <Image 
          style={styles.moviePosterImage} 
          resizeMode="cover" 
          source={{uri: getPoster(movie?.backdrop_path)}}
        />
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          activeOpacity={0.5} 
          onPress={()=> navigation.goBack()}
        >
          <Feather name='chevron-left' size={35} color={Colors.BASIC_COLR}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Share</Text>
      </View>
      {/* <TouchableOpacity style={styles.playButton}>
        <Ionicons name='play-circle-outline' size={70} color={Colors.BASIC_COLR}/>
      </TouchableOpacity> */}
      <ItemSeparator height={setHeight(37)}/>
      <View style={styles.movieTitleContainer}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {movie?.original_title}
        </Text>
        <View style={styles.row}>
          <Ionicons name='heart' size={22} color={Colors.HEART}/>
          <Text style={styles.ratingText}>{movie?.vote_average}</Text>
        </View>
      </View>
      <Text style={styles.genreText}>
        {movie?.genres?.map((genre) => genre?.name)?.join(", ")} |{" "} 
        {movie?.runtime} Min
      </Text>
      <Text style={styles.genreText}>
        {getLanguage(movie?.original_language)?.english_name}
      </Text>
      <View style={styles.overviewContainer}>
        <Text style={styles.overViewTitle}>Overview</Text>
        <Text style={styles.overViewText}>{movie?.overview}</Text>
      </View>
      <View>
        <Text>Cast</Text>
        <FlatList
          data={movie?.credits?.cast}
          keyExtractor={(item) => item?.credit_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <ItemSeparator width={20}/>}
          ItemSeparatorComponent={() => <ItemSeparator width={20}/>}
          ListFooterComponent={() => <ItemSeparator width={20}/>}
          renderItem={({item}) => <CastCard name={item?.name}/> }

        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASIC_BACKGROUND
  },
  moviePosterImageContainer: {
    height: setHeight(35),
    width: setWidth(145),
    alignItems: 'center',
    position: 'absolute',
    left: setWidth((100 - 145) / 2),
    top: 0,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8,
  },
  moviePosterImage: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    width: setWidth(145),
    height: setHeight(35)
  },
  LinearGradient:{
    width: setWidth(100),
    height: setHeight(6),
    position: "absolute",
    top: 0,
    elevation: 9
  },
  headerContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    left: 0,
    top: 50,
    elevation: 20,
  },
  headerText:{
    color: Colors.BASIC_COLR,
    fontFamily: Fonts.BOLD
  },
  // playButton:{
  //   position: "absolute",
  //   top: 110,
  //   left: setWidth(50) - 70/2,
  //   elevation: 10
  // },
  movieTitleContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  movieTitle:{
    color: Colors.BASIC_COLR,
    fontFamily: Fonts.EXTRA_BOLD,
    fontSize: 18,
    width: setWidth(60)
  },
  ratingText:{
    marginLeft: 5,
    color: Colors.BASIC_COLR,
    fontSize: 15
  },
  row:{
    flexDirection: "row",
    alignItems: "center",
  },
  genreText:{
    color: Colors.ACTVE,
    paddingHorizontal: 20,
    paddingTop: 5,
    fontFamily: Fonts.BOLD,
    fontSize: 13
  },
  overviewContainer:{
    backgroundColor: Colors.ACTVE,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10
  },
  overViewTitle:{
    color: Colors.YELLOW,
    fontFamily: Fonts.BOLD,
    fontSize: 18
  },
  overViewText:{
    color: Colors.BASIC_COLR,
    paddingVertical: 5,
    fontFamily: Fonts.BOLD,
    fontSize: 13,
    textAlign:"justify"
  }
});

export default MovieScreen;