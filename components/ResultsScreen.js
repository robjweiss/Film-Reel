import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, FlatList } from 'react-native';
import tmdb from '../config/tmdb';
const apiKey = tmdb.apiKey;

export default class ResultsScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };
    }

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
            <View>
                <FlatList
                    data = {this.state.results}
                    renderItem = {({item}) => <Text>
                        {item.title}
                    </Text>}
                    keyExtractor = {(item, index) => item.id.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});