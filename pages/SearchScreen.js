/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {
    Button,
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    useColorScheme,
    View,
    FlatList,
    ScrollView,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {requestGETMovieByMovieId, requestGETMovies} from '../backend/movies';
import MovieSearchResult from '../OtherComponents/MovieSearchResult';



const SearchScreen = ({route, navigation}) => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const {accessToken, refreshToken} = route.params;

    // Initial posts to be an empty array instead of undefined
    const [movies, setMovies] = React.useState([]);
    // const [pageNum, setPageNum] = React.useState(1);

    const [title, setTitle] = React.useState('');
    const [year, setYear] = React.useState('');
    const [director, setDirector] = React.useState('');
    const [genre, setGenre] = React.useState('');
    const [limit, setLimit] = React.useState(10);
    const [orderBy, setOrderBy] = React.useState('title');
    const [direction, setDirection] = React.useState('asc');

    const [hasMovies, setHasMovies] = React.useState(false);

    const getMovies = async () => {
        const page = 1;

        // Create query params that will go with our request
        // and pass it to myRequests to make the request
        // remove all the attributes/fields with empty value instead of using trinary comparison !==
        const movieSearchEndpointQueryParams = {
            // set it to null instead of leaving title as an empty object
            title: title,
            year: year,
            director: director,
            genre: genre,
            limit: limit !== 10 ? limit : 10,
            page: page >= 1 ? page : 1,
            orderBy: orderBy !== 'title' ? orderBy : 'title',
            direction: direction !== 'asc' ? direction : 'asc',
        };

        return await requestGETMovies(accessToken, movieSearchEndpointQueryParams)
            .then(response => {
                console.log("Inside then: " + JSON.stringify(response.data.result, null, 2));
                return response;
            })
            .catch(error => {
                console.error(error);
                console.log(error.response);
            })
            ;
    }


    const getMovieById = async (accessToken, movieId) => {
        return await requestGETMovieByMovieId(accessToken, movieId)
            .then(response => {
                console.log("Inside then: " + JSON.stringify(response.data.result, null, 2));
                return response;
            })
            .catch(error => {
                console.error(error);
                console.log(error.response);
            })
            ;
    }

    return (
        <View style={styles.container}>

            <View style={{flexDirection: 'row'}}>
                <Text>Title: </Text>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Title"
                    onChangeText={title => setTitle(title)}
                />
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text>Release Year: </Text>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Release Year"
                    onChangeText={year => setYear(year)}
                />
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text>Director Name: </Text>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Director Name"
                    onChangeText={director => setDirector(director)}
                />
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text>Genre: </Text>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Genre"
                    onChangeText={genre => setGenre(genre)}
                />
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text>Number of Results per Page: </Text>

                <Button
                    onPress= {
                        () => {
                            setLimit(10)
                        }
                    }

                    title="10"
                />
                <Button
                    onPress= {
                        () => {
                            setLimit(25)
                        }
                    }

                    title="25"
                />
                <Button
                    onPress= {
                        () => {
                            setLimit(50)
                        }
                    }

                    title="50"
                />
                <Button
                    onPress= {
                        () => {
                            setLimit(100)
                        }
                    }

                    title="100"
                />
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text>Sort Result by: </Text>


                <Button
                    onPress= {
                        () => {
                            setOrderBy('title')
                        }
                    }

                    title="Title"
                />
                <Button
                    onPress= {
                        () => {
                            setOrderBy('rating')
                        }
                    }

                    title="Rating"
                />
                <Button
                    onPress= {
                        () => {
                            setOrderBy('year')
                        }
                    }

                    title="Year"
                />
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text>Sort Result in: </Text>

                <Button
                    onPress= {
                        () => {
                            setDirection('asc')
                        }
                    }

                    title="Ascending Order"
                />
                <Button
                    onPress= {
                        () => {
                            setDirection('desc')
                        }
                    }

                    title="Descending Order"
                />
            </View>

            <Button
                onPress= {
                    async () => {
                        const response = await getMovies();
                        console.log(response.data);
                        if (response.data.result.code == 2020) {
                            alert("Movies with the given search parameters found");
                            setMovies(response.data.movies);
                            setHasMovies(true);
                        }
                        else if (response.data.result.code == 2021) {
                            alert("No movies found with the given search parameters");
                        }
                        else {
                            alert("Error in registering");
                        }
                    }
                }

                title="SEARCH"
            />


            <FlatList
                data={movies}
                renderItem={( {item} ) => (
                    <View style={{margin: 10}}>
                        <MovieSearchResult movie={item} />
                        <Button
                            onPress = {
                                async () => {
                                    const response = await getMovieById(accessToken, item.id);
                                    console.log(response.data);
                                    alert(response.data.result.message);
                                    navigation.navigate("MovieDetail",
                                        {
                                            movie: response.data.movie,
                                            genres: response.data.genres,
                                            persons: response.data.persons
                                        });
                                }
                            }

                            title="See Details"
                        />
                    </View>
                    )}
                keyExtractor={item => item.id}
            />


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});

export default SearchScreen;
