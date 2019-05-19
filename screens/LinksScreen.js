// will show a list of goals for now 

import React from 'react';
import { 
    View,
    ScrollView, 
    StyleSheet, 
    Text,
    ActivityIndicator,
    FlatList,
    TouchableHighlight,
    Button,
    Icon 
} from 'react-native';
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

  //extract fb response to state
  // onCollectionUpdate = () => {
  //   const goals = [];
  //   db.get().then(function(querySnapshot){
  //     querySnapshot.forEach((doc) => {
  //       console.log("id" + doc.id,  doc.data(), doc.data().goal)
  //       // const { goal, description } = doc.data();
  //       goals.push({
  //         key: doc.id,
  //         doc,
  //         goal: doc.data().goal,
  //         description: doc.data().description
  //       });
  //     })

  //   })
  // }

  onCollectionUpdate = (querySnapshot) => {
    const goals = [];
    querySnapshot.forEach((doc) => {
      console.log("id" + doc.id,  doc.data(), doc.data().goal)
      const { goal, description } = doc.data();
      goals.push({
        key: doc.id,
        doc, // DocumentSnapshot
        goal,
        description,
      });
    });
    this.setState({
      goals,
      loading: false,
   });
   console.log(this.state.goals[1].goal);
   console.log(this.state.loading);
  
  }

  componentDidMount() {
   this.unsubscribe = db.onSnapshot(this.onCollectionUpdate)
   console.log(this.unsubscribe)
  }

  render() {
    const loading = this.state;
    

    return (
      <View style={styles.container}>
          <FlatList 
          data={this.state.goals}
          renderItem={({item}) => 
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Home')}>
            <View style={{backgroundColor: 'red'}}>
              <Text>Goal: {item.goal}</Text>
              <Text>Description: {item.description}</Text>
            </View>
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
