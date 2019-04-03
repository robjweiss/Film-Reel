import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Image, TouchableNativeFeedback, ImageBackground } from 'react-native';
import tmdb from '../config/tmdb';
const apiKey = tmdb.apiKey;

export default class ResultsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
          title: "Results for '" + navigation.getParam('searchTerm', 'Results') + "'"
        };
      };

    async componentDidMount() {
        const { navigation } = this.props;
        const searchTerm  = navigation.getParam('searchTerm', 'NONE');

        try {
            const response = await fetch(
                'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&language=en-US&query=' + searchTerm + '&page=1&include_adult=false'
            );
            let responseJSON = await response.json();

            this.setState({
                isLoading: false,
                results: responseJSON.results
            })

            return responseJSON.results;
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
                <FlatList
                    data = {this.state.results}
                    renderItem = {({item}) => <TouchableNativeFeedback onPress = {() => this.props.navigation.navigate('Movie', {
                        id: item.id,
                        posterPath: item.poster_path
                    })}>
                        <View style = {styles.resultItem}>
                            <Image
                                source = {{uri: 'https://image.tmdb.org/t/p/w154/' + item.poster_path}}
                                style = {styles.posterImages}
                            />
                            <View style = {styles.resultTextContainer}>
                                <Text style = {styles.title}>{item.title}</Text>
                                <Text style = {styles.subheading}>Year: {item.release_date.slice(0, 4)} |  Rating: {item.vote_average}</Text>
                                <Text
                                    numberOfLines = {3}
                                    style = {styles.overview}
                                >{item.overview}
                                </Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    }
                    keyExtractor = {(item, index) => item.id.toString()}
                />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%'
    },
    resultItem: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: 'rgba(255, 255, 255, 1.0)'
    },
    posterImages: {
        width: 92,
        height: 138
    },
    resultTextContainer: {
        flex: 1,
        flexWrap: 'wrap',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10
    },
    subheading: {
        color: 'slategray',
        fontStyle: 'italic',
        marginLeft: 10
    },
    overview: {
        color: 'slategray',
        position: 'absolute',
        bottom: 0,
        margin: 15
    }
});