import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableNativeFeedback } from 'react-native';

export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            placeholder: "Searh by Title, Genre, Actor..."
        };
    }

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style = {styles.container}>
                <TextInput
                    style = {styles.searchBar}
                    underlineColorAndroid="transparent"
                    placeholder = {this.state.placeholder}
                    onFocus = {() => this.setState({placeholder: ''})}
                    onChangeText = {(text) => this.setState({text})}
                />
                <TouchableNativeFeedback onPress = {() => this.props.navigation.navigate('Results', {
                    searchTerm: this.state.text
                })}>
                    <View style = {styles.button}>
                        <Text style = {styles.buttonText}> SEARCH </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center'
      },
    searchBar: {
        fontSize: 30,
        color: 'dimgray',
        textAlign: 'center',
        paddingTop: 200,
        paddingBottom: 20
    },
    button: {
        width: 180,
        height: 65,
        backgroundColor: 'darkslategray'
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 15
    }
});