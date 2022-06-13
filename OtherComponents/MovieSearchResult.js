/* eslint-disable */

import React from "react";
import {Image, StyleSheet, Text, View} from 'react-native';


const MovieSearchResult = ({movie}) => {

    // console.log("movie: " + JSON.stringify(movie));
    // console.log(movie.posterPath);

    const imageURI = "https://image.tmdb.org/t/p/original" + movie.posterPath;
    // console.log(imageURI);

    return (

        <View style={styles.container}>
            <Image
                style={styles.stretch}
                source={{
                    uri: imageURI
                }}
            />

            <Text>Rating: {movie.rating}/10</Text>
            <Text>{movie.title}</Text>
            <Text>{movie.year}</Text>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    stretch: {
        width: 150,
        height: 200,
        resizeMode: 'stretch',
    }
});

export default MovieSearchResult;
