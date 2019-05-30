// will show a list of goals for now 

import React from 'react';
import { 
    View,
    StyleSheet, 
    Text,
    ActivityIndicator,
    FlatList,
    TouchableHighlight
} from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';
import firebase from '../Firebase/firebase';

// import { ExpoLinksView } from '@expo/samples';


db = firebase.firestore().collection('goals');
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      goals: [],
      loading: true
    };
  }

  

  onCollectionUpdate = (querySnapshot) => {
    const goals = [];

    querySnapshot.forEach((doc) => {
      console.log("id" + doc.id,  doc.data(), doc.data().goal)
      const { goal, description, created } = doc.data();
      goals.push({
        key: doc.id,
        doc, // DocumentSnapshot
        goal,
        description,
        created
      });
    });
    this.setState({
      goals,
      loading: false,
   });
  }

  componentDidMount() {
   this.unsubscribe = db.onSnapshot(this.onCollectionUpdate)
  }

  render() {
    const loading = this.state;
    

    return (
      <View style={styles.container}>
        <Text>Goals</Text>
          <FlatList 
          data={this.state.goals}
          renderItem={({item}) => 
            <TouchableHighlight onPress={() => this.props.navigation.navigate('Home')}>
              <Card>
                <View style={{backgroundColor: 'red'}}>
                  <Text>Goal: {item.goal}</Text>
                  <Text>Description: {item.description}</Text>
                  <Text>Time: {item.created}</Text>
                  <Button
                  icon={<Icon name='code' color='#ffffff' />}
                  backgroundColor='#03A9F4'
                  buttonStyle={{borderRadius: 30, marginLeft: 30, marginRight: 30, marginTop: 15}}
                  title='Details' />
                </View>
              </Card> 
            </TouchableHighlight>}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#fff',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
