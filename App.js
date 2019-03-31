import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import SearchScreen from './components/SearchScreen';
import ResultsScreen from './components/ResultsScreen';

const MainNavigator = createStackNavigator({
  Search: {screen: SearchScreen},
  Results: {screen: ResultsScreen}
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
