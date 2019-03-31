import {createStackNavigator, createAppContainer} from 'react-navigation';
import SearchScreen from './components/SearchScreen';

const MainNavigator = createStackNavigator({
  Search: {screen: SearchScreen}
});

const App = createAppContainer(MainNavigator);

export default App;
