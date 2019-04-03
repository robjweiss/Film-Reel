import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import SearchScreen from './screens/SearchScreen';
import ResultsScreen from './screens/ResultsScreen';
import MovieScreen from './screens/MovieScreen';

const MainNavigator = createStackNavigator({
  Search: {screen: SearchScreen},
  Results: {screen: ResultsScreen},
  Movie: {screen: MovieScreen}
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
