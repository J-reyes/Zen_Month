import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    AlertIOS,
    Button
} from 'react-native';
import firebase from '../Firebase/firebase'


export default class CreateGoal extends React.Component {
    constructor() {
        super();
        this.state = { 
           goal: '',
           description: '', 
           created: ''
        }
    }

    updateTextInput = (text, field) => {
        const state = this.state;
        state[field] = text;
        this.setState(state);
    }

    saveGoal = () => {
        const date = new Date();
        db = firebase.firestore().collection('goals');
        db.add({
            goal: this.state.goal,
            description: this.state.description,
            created: date.toDateString()
        }).then((docRef) => {
            this.setState({
                goal: '',
                description: '',
                created: ''
            });
            // add navigation ? maybe in future
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            // setLoading date to false ? in future
        })
    }

    render() { 
        return ( 
            <View>
                <Text style={styles.title}>Add a Goal</Text>
                <TextInput 
                    style={styles.itemInput} 
                    // onChangeText={this.handleChange('goal')}
                    title="Goal: "
                    value={this.state.goal} 
                    onChangeText={(text) => this.updateTextInput(text, 'goal')}
                />
                <TextInput 
                    style={styles.itemInput} 
                    // onChangeText={this.handleChange('name')}
                    title="Description: "
                    value={this.state.description} 
                    onChangeText={(text) => this.updateTextInput(text, 'description')}
                />
                <Button
                    title="add"
                    style={styles.button}
                    underlayColor="white"
                    onPress={() => this.saveGoal()}
                />
            </View>
         );
    }
}
 
const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#6565fc'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center'
    },
    itemInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 8,
        color: 'black'
      },
      buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
      },
      button: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'red',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
      }
})