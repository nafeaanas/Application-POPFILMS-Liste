import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import GenreCard from '../components/GenreCard';
import MovieCard from '../components/MovieCard';
import ItemSeparator from '../components/itemSeparator';
import { getNowPlayingMovies, getUpcomingMovies, getAllGenres } from '../services/MovieService'; 

const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];

const HomeScreen = () => {
  const [activeGenre, setActiveGenre] = useState("All");
  const [nowPlayingMovies, setNowPlayingMovies] = useState({})
  const [upcomingMovies, setUpcomingMovies] = useState({})
  const [genres, setGenres] = useState([{ id: 10110, name: "All" }])

  useEffect(()=>{
    getNowPlayingMovies().then(movieResponse => 
      setNowPlayingMovies(movieResponse.data)
      );
    getUpcomingMovies().then(movieResponse => 
      setUpcomingMovies(movieResponse.data)
      );
    getAllGenres().then(genresResponse => 
      setGenres([...genres, ...genresResponse.data.genres])
      );
  },[]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar 
      style="auto" 
      translucent={false}
      backgroundColor={Colors.BASIC_BACKGROUND}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>New Playing</Text>
        <Text style={styles.headerSubTitle}>VIW ALL</Text>
      </View>
      <View style={styles.generListContainer}>
        <FlatList
          data={genres} 
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={()=> <ItemSeparator width={20}/>}
          renderItem={({ item }) => (
            <GenreCard 
            genreName={item.name} 
            active={item.name === activeGenre ? true : false}
            onPress={setActiveGenre} 
          />
          )}
        />
      </View>
      <View>
        <FlatList
          data={nowPlayingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={()=> <ItemSeparator width={20}/>}
          renderItem={({ item }) => 
          <MovieCard 
          title={item.title} 
          language={item.original_language} 
          voteAverage={item.vote_average} 
          voteCount={item.vote_count}
          poster={item.poster_path}
          heartLess={false}
          />
        }
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Coming Soon</Text>
        <Text style={styles.headerSubTitle}>VIW ALL</Text>
      </View>
      <View>
        <FlatList
          data={upcomingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={()=> <ItemSeparator width={20}/>}
          renderItem={({ item }) =>(
          <MovieCard 
          title={item.title} 
          language={item.original_language} 
          voteAverage={item.vote_average} 
          voteCount={item.vote_count}
          poster={item.poster_path}
          size={0.6} 
          
          />
        )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.BASIC_BACKGROUND,
  },
  headerContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal:20,
    paddingVertical: 10,
  },
  headerTitle:{
    fontSize: 28,
    color:Colors.BASIC_COLR,
    fontFamily:Fonts.REGULAR
  },
  headerSubTitle:{
    fontSize: 13,
    color: Colors.ACTVE,
    fontFamily: Fonts.BOLD
  },
  generListContainer: {
    paddingVertical: 10
  }
});

export default HomeScreen;