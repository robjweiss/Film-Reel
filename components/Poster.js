import React from 'react';
import { StyleSheet, TouchableNativeFeedback, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

class Poster extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Movie', {
                id: this.props.movie.id,
                title: this.props.movie.title,
                posterPath: this.props.movie.poster_path
            })}>
                <Image
                    source={{ uri: 'https://image.tmdb.org/t/p/w154/' + this.props.movie.poster_path }}
                    style={styles.posterImage}
                />
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    posterImage: {
        width: 92,
        height: 138,
        margin: 7,
        borderRadius: 5
    }
});

export default withNavigation(Poster);