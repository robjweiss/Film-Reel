import React from 'react'
import { StyleSheet, View, ActivityIndicator, FlatList, ImageBackground } from 'react-native';
import Result from '../components/Result';
import tmdb from '../config/tmdb';
const apiKey = tmdb.apiKey;

export default class ResultsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            networkError: false
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Results for '" + navigation.getParam('searchTerm', 'Results') + "'"
        };
    };

    async componentDidMount() {
        const { navigation } = this.props;
        const searchTerm = navigation.getParam('searchTerm', 'NONE');

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
                <FlatList
                    data={this.state.results}
                    renderItem={({ item }) => <Result movie={item} />}
                    initialNumToRender={6}
                    keyExtractor={(item, index) => item.id.toString()}
                />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%'
    }
});