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
import {getMovieById, getPoster} from "../services/MovieService";
import ItemSeparator from '../components/itemSeparator';
import {LinearGradient} from "expo-linear-gradient"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather, Ionicons } from '@expo/vector-icons';

const {height, width} = Dimensions.get('screen')

const setHeight = (h) => (height/100) * h
const setWidth = (w) => (width/100) * w

const MovieScreen = ({route, navigation}) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState({})

  useEffect(()=>{
    getMovieById(movieId).then((response) => setMovie(response.data));
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
          source={{uri: getPoster(movie.backdrop_path)}}
        />
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Feather name='chevron-left' size={35} color={Colors.BASIC_COLR}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Share</Text>
      </View>
      <TouchableOpacity style={styles.playButton}>
        <Ionicons name='play-circle-outline' size={70} color={Colors.BASIC_COLR}/>
      </TouchableOpacity>
      <ItemSeparator height={setHeight(37)}/>
      <Text>{movie.title}</Text>
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
    left: setWidth((100-145)/2),
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
  playButton:{
    // position: "absolute",
    top: 75,
    left: setWidth(50) - 70/2,
    elevation: 11
  }
});

export default MovieScreen;