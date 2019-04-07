import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View, Image, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

class Result extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Movie', {
                id: this.props.movie.id,
                title: this.props.movie.title,
                posterPath: this.props.movie.poster_path
            })}
            >
                <View style={styles.resultItem}>
                    <Image
                        source={{ uri: 'https://image.tmdb.org/t/p/w154/' + this.props.movie.poster_path }}
                        style={styles.posterImages}
                    />
                    <View style={styles.resultTextContainer}>
                        <Text style={styles.title}>{this.props.movie.title}</Text>
                        <Text style={styles.subheading}>Year: {this.props.movie.release_date.slice(0, 4)} |  Rating: {this.props.movie.vote_average}</Text>
                        <Text
                            numberOfLines={3}
                            style={styles.overview}
                        >{this.props.movie.overview}
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
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

export default withNavigation(Result);