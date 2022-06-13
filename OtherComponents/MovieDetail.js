/* eslint-disable */

import React from "react";
import {FlatList, Image, ScrollView, StyleSheet, Text, View} from 'react-native';


const MovieDetail = ({movie, genres, persons}) => {

    console.log("movie: " + JSON.stringify(movie));
    console.log(movie.posterPath);
    console.log(genres);

    const posterURI = "https://image.tmdb.org/t/p/original" + movie.posterPath;
    const backdropURI = "https://image.tmdb.org/t/p/w500/" + movie.backdropPath;

    console.log("posterURI: " + posterURI);
    console.log("backdropURI: " + backdropURI);

    return (

        <ScrollView style={styles.container}>

            <Image
                style={styles.backdropImage}
                source={{
                    uri: backdropURI
                }}
            />
            <Image
                style={styles.posterImage}
                source={{
                    uri: posterURI
                }}
            />

            <Text>{movie.title}</Text>
            <Text>{movie.year}</Text>
            <Text>Directed by: {movie.director}</Text>
            <Text>Rating: {movie.rating}/10</Text>
            <Text>Budget: ${!!movie.budget ? parseInt(movie.budget) / 100 : 0 }</Text>
            <Text>Revenue: ${!!movie.revenue ? parseInt(movie.revenue) / 100 : 0 }</Text>
            <Text>Overview:</Text>
            <Text>{movie.overview}</Text>

            <Text>Genres: </Text>
            <FlatList
                data={genres}
                renderItem={( {item} ) => (
                    <Text>{item.name}</Text>
                )}
                keyExtractor={item => item.id}
            />

            <Text>Persons: </Text>
            <FlatList
                data={persons}
                renderItem={( {item} ) => (
                    <Text>{item.name}</Text>
                )}
                keyExtractor={item => item.id}
            />
        </ScrollView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    posterImage: {
        width: 150,
        height: 200,
        resizeMode: 'stretch',
    },
    backdropImage: {
        width: 500,
        height: 300,
        resizeMode: 'stretch',
    }
});

export default MovieDetail;
