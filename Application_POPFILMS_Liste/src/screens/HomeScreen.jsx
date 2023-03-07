import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Colors } from '../constants/Colors';

const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];

const HomeScreen = () => {
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
      <View>
        <FlatList
          data={Genres} 
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => {
          return <View></View>;
          }}
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
    color:Colors.BASIC_COLR
  },
  headerSubTitle:{
    fontSize: 13,
    color: Colors.ACTVE
  }
});

export default HomeScreen;