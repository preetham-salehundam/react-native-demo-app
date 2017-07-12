import {StackNavigator} from 'react-navigation';
import AwesomeProject from '../MainComponent';
import TodoItemPage from '../TodoItemPage';
export default const navigations = StackNavigator({
    Home : {screen : AwesomeProject},
    Todo : {screen: TodoItemPage}
}) 