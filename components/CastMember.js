import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

export default class CastMember extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.castMember}>
                <View style={styles.castMemberPictureContainer}>
                    <Image
                        source={{ uri: 'https://image.tmdb.org/t/p/w138_and_h175_face/' + this.props.profilePath }}
                        style={styles.castMemberPicture}
                    />
                </View>
                <View style={styles.castMemberNameContainer}>
                    <Text
                        style={styles.castMemberName}
                        numberOfLines={2}
                        ellipsizeMode='tail'
                    >{this.props.name}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    castMember: {
        flex: 1,
        margin: 3,
        width: 76,
        height: 125
    },
    castMemberPictureContainer: {
        flex: 1
    },
    castMemberPicture: {
        width: 76,
        height: 76,
        borderRadius: 38
    },
    castMemberNameContainer: {
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
    },
    castMemberName: {
        textAlign: 'center'
    }
})