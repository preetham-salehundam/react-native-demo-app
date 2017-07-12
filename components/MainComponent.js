import React, { Component } from 'react';
import { List , ListItem, SearchBar } from 'react-native-elements';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  ActivityIndicator,
  TouchableHighlight

} from 'react-native';
export default class AwesomeProject extends Component {
   constructor(props) {
    super(props);
     this.state={
       todos:[],
       text:'',
       loading: false,
        data: [],
        page: 1,
        seed: 1,
        error: null,
        refreshing: false
      }
    this.addTodo = this.addTodo.bind(this);
    /*this.makeRemoteRequest = this.makeRemoteRequest.bind(this);
    this.renderSeperator = this.renderSeperator.bind(this);
    this.renderHeader = this.renderHeader.bind(this);*/
  }
   componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderSeperator = ()=><View
  style={styles.itemSeperator}>
  </View>

  renderHeader = () => <SearchBar
  lightTheme
  placeholder='Type Here...' />

  renderFooter = () => {
    if(!this.state.loading) return null;

    return(
      <View style={styles.footer} >
        <ActivityIndicator animating size="large"/>
      </View>
    )
  }

  addTodo(){
    
    }
  render() {
    return (
      
       <View style={{padding: 10}} id="root">
          <List>
 
          <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index}
          renderItem={({item}) =>  (<TouchableHighlight  underlayColor="rgba(192,192,192,0.8)" onPress={()=>{
              console.log("pressed!")}}>
              <View>
              <ListItem
            roundAvatar
            title={`${item.name.first} ${item.name.last}`}
            subtitle={item.email}
            avatar={{ uri: item.picture.thumbnail }}
          />
          </View>
          </TouchableHighlight>)
          
          }
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          
          />
         
        
        </List>
         {/*<Text key={item} style={styles.item}>{item}</Text>*/}
       </View>
    
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  itemSeperator:{
    height: 1,
    width: "86%",
    backgroundColor: "#CED0CE",
    marginLeft: "14%"
  },
  footer:{
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE"
        }
});