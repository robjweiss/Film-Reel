import React from 'react'
import { StyleSheet, TextInput, View, ImageBackground, ActivityIndicator } from 'react-native';
import PosterList from '../components/PosterList';
import tmdb from '../config/tmdb';
const apiKey = tmdb.apiKey;

export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            placeholder: "Searh by Title, Genre, Actor...",
            isLoading: true
        };
    }

    static navigationOptions = {
        header: null
    };

    async componentDidMount() {
        try {
            const popularResponse = await fetch (
                'https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey + '&language=en-US&page=1'
            );
            const playingResponse = await fetch (
                'https://api.themoviedb.org/3/movie/now_playing?api_key=' + apiKey + '&language=en-US&page=1'
            );

            let popularResponseJSON = await popularResponse.json();
            let playingResponseJSON = await playingResponse.json();

            // Avoiding duplicates in popular and playing movies displayed
            playingResponseJSON.results.forEach(playingMovie => {
                popularResponseJSON.results = popularResponseJSON.results.filter(
                    popularMovie => popularMovie.id != playingMovie.id
                );
            });

            this.setState({
                isLoading: false,
                popularMovies: popularResponseJSON.results,
                playingMovies: playingResponseJSON.results
            });

            return popularResponseJSON.results;
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
              </View>
            )
          }

        return (
            <ImageBackground
                source = {require('../assets/background.jpg')}
                style = {styles.background}
            >
                <View style = {styles.container}>
                    <View style = {styles.searchBarContainer}>
                        <TextInput
                            style = {styles.searchBar}
                            underlineColorAndroid = 'transparent'
                            placeholder = {this.state.placeholder}
                            onFocus = {() => this.setState({placeholder: ''})}
                            onChangeText = {(text) => this.setState({text})}
                            returnKeyType = 'search'
                            onSubmitEditing = {() => this.props.navigation.navigate('Results', {
                                searchTerm: this.state.text
                            })}
                        />
                    </View>
                    <PosterList
                        header = 'Popular'
                        movies = {this.state.popularMovies}
                    />
                    <PosterList
                        header = 'Now Playing'
                        movies = {this.state.playingMovies}
                    />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
      },
    searchBarContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(206, 201, 201, 0.5)',
        width: 300,
        marginTop: 150,
        marginBottom: 100,
        padding: 10,
        borderRadius: 25
    },
    searchBar: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    }
});