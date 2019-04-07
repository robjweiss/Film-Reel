import React from 'react'
import { StyleSheet, ImageBackground, View, Image, Text, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import CastMember from '../components/CastMember';
import tmdb from '../config/tmdb';
const apiKey = tmdb.apiKey;

export default class MovieScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            networkError: false
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'Movie')
        };
    };

    async componentDidMount() {
        const { navigation } = this.props;
        const id = navigation.getParam('id', 'NONE');

        try {
            const movieResponse = await fetch(
                'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + apiKey + '&language=en-US'
            );
            const castResponse = await fetch(
                'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + apiKey
            );

            let movieResponseJSON = await movieResponse.json();
            let castResponseJSON = await castResponse.json();

            // Formatting date nicely
            const releaseDate = new Date(movieResponseJSON.release_date);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            movieResponseJSON.release_date = releaseDate.toLocaleDateString('en-US', options);

            // Removing cast members without pictures from the listing
            filteredCast = castResponseJSON.cast.filter(castMember => castMember.profile_path !== null);

            this.setState({
                isLoading: false,
                details: movieResponseJSON,
                cast: filteredCast
            });

            return true;
        } catch (error) {
            this.setState({
                networkError: true
            });
        }
    }

    render() {
        if (this.state.isLoading || this.state.networkError) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <ImageBackground
                source={require('../assets/background.jpg')}
                style={styles.background}
            >
                <View style={styles.posterContainer}>
                    <Image
                        source={{ uri: 'https://image.tmdb.org/t/p/w300/' + this.props.navigation.getParam('posterPath') }}
                        style={styles.posterImage}
                    />
                </View>
                <ScrollView style={styles.detailsContainer}>
                    <Text style={styles.header}>Score</Text>
                    <Text style={styles.value}>{this.state.details.vote_average} / 10</Text>
                    <Text style={styles.header}>Runtime</Text>
                    <Text style={styles.value}>{this.state.details.runtime}m</Text>
                    <Text style={styles.header}>Released</Text>
                    <Text style={styles.value}>{this.state.details.release_date}</Text>
                    <Text style={styles.header}>Genres</Text>
                    <Text style={styles.value}>{this.state.details.genres[0].name}, {this.state.details.genres[1].name}, {this.state.details.genres[2].name}</Text>
                    <Text style={styles.header}>Cast</Text>
                    <FlatList
                        data={this.state.cast}
                        renderItem={({ item }) =>
                            <CastMember
                                profilePath={item.profile_path}
                                name={item.name}
                            />
                        }
                        initialNumToRender={5}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => item.id.toString()}
                    />
                    <Text style={styles.header}>Description</Text>
                    <Text style={styles.value}>{this.state.details.overview}</Text>
                </ScrollView>
            </ImageBackground>
        )
    }

}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%'
    },
    posterContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    posterImage: {
        height: 278,
        width: 185,
        marginTop: 20
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginVertical: 1
    },
    value: {
        fontSize: 15,
        color: 'slategray',
        marginLeft: 10
    }
});