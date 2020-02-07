/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Component,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      vihrea : 'white',
      keltainen: 'white',
      punainen: 'white',
      response : null,
      ilma:null,
      lampo:null

    }
  }

  componentDidMount() {

    //var kierros= 0; 
    console.log("ComponentDidMount")
    this._interval = setInterval(() => {
      fetch('http://85.23.155.160:3002/valot') 
        .then(response => response.json())
      .then((responseJson)=> {
        console.log("RESPONSE")
        console.log(responseJson)
        this.setState({
         response: responseJson,
         vihrea: responseJson[0].vihrea,
         punainen:responseJson[0].punainen
        })
        console.log(this.state)
      })
      .catch(error=>console.log(error)) //to catch the errors if any

      fetch('http://85.23.155.160:3002/ilma')
        .then(response => response.json())
      .then((responseJson)=>{
        console.log("ILMA")
        console.log(responseJson)
        this.setState({
          response: responseJson,
          ilma: responseJson[0].kosteus,
          lampo:responseJson[0].lampo
         })
      })
    }, 1000);
  }


  componentWillUnmount() {
    clearInterval(this._interval);
  }


  render(){
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize:32}}>Nyt on hieno kilke</Text  >
        <Text></Text>
        <View id = 'punainen' style={[styles.circle, {backgroundColor:this.state.punainen == 1 ? "red":"white"}]} /> 
        <View id = 'vihrea' style={[styles.circle, {backgroundColor:this.state.vihrea == 1 ? "green":"white" }]} />
        <Text></Text>
        <View style={{width:200,height:50, borderWidth: 2}}><Text style={{fontSize:20}}>Ilmankosteus: {this.state.ilma}</Text></View>
        <View style={{width:200,height:50, borderWidth: 2}}><Text style={{fontSize:20}}>Lämpötila: {this.state.lampo}</Text></View>
      </View>
    );
  }
};

 
function getData() {

     fetch('http://85.23.155.160:3002/valot', {
      method: 'GET'
   })
   .then((response) => response.json())
   .then((responseJson) => {
     console.log("RESPONSE")
      console.log(responseJson);
      return responseJson;
   })
   .catch((error) => {
      console.error(error);
   });

}



const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200/2,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2
},
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
