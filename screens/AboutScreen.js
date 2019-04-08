import React from 'react';
import { StyleSheet, View, Image, TouchableNativeFeedback, Linking } from 'react-native';

export default class AboutScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'About'
    };

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/icon-title-name.png')}
                    style={styles.title}
                    resizeMode='contain'
                />
                <TouchableNativeFeedback onPress={() => { Linking.openURL('https://github.com/robjweiss/') }}>
                    <Image
                        source={require('../assets/github-name.png')}
                        style={styles.github}
                        resizeMode='contain'
                    />
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => { Linking.openURL('https://www.designbolts.com/') }}>
                    <Image
                        source={require('../assets/icon-credit.png')}
                        style={styles.icon}
                        resizeMode='contain'
                    />
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => { Linking.openURL('https://creativemarket.com/Rochart') }}>
                    <Image
                        source={require('../assets/font-credit.png')}
                        style={styles.font}
                        resizeMode='contain'
                    />
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => { Linking.openURL('https://www.themoviedb.org/') }}>
                    <Image
                        source={{ uri: 'https://www.themoviedb.org/assets/2/v4/logos/408x161-powered-by-rectangle-blue-10d3d41d2a0af9ebcb85f7fb62ffb6671c15ae8ea9bc82a2c6941f223143409e.png' }}
                        style={styles.tmdb}
                        resizeMode='contain'
                    />
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFCD55',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        width: 400,
        height: 150
    },
    github: {
        width: 250,
        height: 60,
        marginTop: 20,
        marginBottom: 90
    },
    icon: {
        width: 300,
        height: 30
    },
    font: {
        width: 300,
        height: 30
    },
    tmdb: {
        width: 300,
        height: 100,
        marginTop: 100,
        marginBottom: 10
    }
});