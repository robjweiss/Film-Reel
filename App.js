import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import SearchScreen from './screens/SearchScreen';
import ResultsScreen from './screens/ResultsScreen';
import MovieScreen from './screens/MovieScreen';
import AboutScreen from './screens/AboutScreen';

const MainNavigator = createStackNavigator({
  Search: {screen: SearchScreen},
  Results: {screen: ResultsScreen},
  Movie: {screen: MovieScreen},
  About: {screen: AboutScreen}
},
{
  initialRouteName: 'Search'
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}
