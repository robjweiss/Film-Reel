import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import Poster from '../components/Poster';

export default class PosterList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}> {this.props.header} </Text>
                <FlatList
                    data={this.props.movies}
                    renderItem={({ item }) => <Poster movie={item} />}
                    initialNumToRender={3}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => item.id.toString()}
                />
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 45,
        marginRight: 45
    },
    header: {
        color: 'white',
        fontStyle: 'italic'
    }
});