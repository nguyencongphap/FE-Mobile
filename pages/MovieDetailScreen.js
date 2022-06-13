/* eslint-disable */

import React, {useState} from 'react';
import {Button, StyleSheet, SafeAreaView, Text, TextInput, useColorScheme, View, FlatList} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {requestGETMovieByMovieId} from '../backend/movies';
import MovieDetail from '../OtherComponents/MovieDetail';



const MovieDetailScreen = ({route, navigation}) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const {movie, genres, persons} = route.params;

    // const {accessToken, movieId} = route.params;

    // const [movie, setMovie] = React.useState();
    // const [genres, setGenres] = React.useState();
    // const [persons, setPersons] = React.useState();
    //
    // React.useEffect( async () => {
    //     const response = await getMovieById(accessToken, movieId);
    //     setMovie(response.data.movie);
    //     setGenres(response.data.genres);
    //     setPersons(response.data.persons);
    //     alert(response.data.result.message);
    // }, [])
    //
    // const getMovieById = async (accessToken, movieId) => {
    //     return await requestGETMovieByMovieId(accessToken, movieId)
    //         .then(response => {
    //             console.log("Inside then: " + JSON.stringify(response.data.result, null, 2));
    //             return response;
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             console.log(error.response);
    //         })
    //         ;
    // }


    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <MovieDetail movie={movie} genres={genres} persons={persons}/>
            </View>


        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});

export default MovieDetailScreen;
