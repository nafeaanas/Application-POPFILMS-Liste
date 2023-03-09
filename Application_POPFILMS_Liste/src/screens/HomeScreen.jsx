import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import GenreCard from '../components/GenreCard';
import MovieCard from '../components/MovieCard';
import ItemSeparator from '../components/itemSeparator';

const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];

const HomeScreen = () => {
  const [activeGenre, setActiveGenre] = useState("All")
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
          data={Genres} 
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={()=> <ItemSeparator width={20}/>}
          renderItem={({ item }) => (
            <GenreCard 
            genreName={item} 
            active={item === activeGenre ? true : false}
            onPress={setActiveGenre} 
          />
          )}
        />
      </View>
      <View>
        <FlatList
          data={Genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={()=> <ItemSeparator width={20}/>}
          renderItem={({ item }) => <MovieCard/>}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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