import React from 'react';
import {
  AppRegistry,
  View,
} from 'react-vr';
import Canvas from './components/Canvas';

import axios from 'axios'
import Pointers from './components/Pointers'



export default class GDVR_REACTVR_SITEPOINT_GALLERY extends React.Component {

  constructor() {
    super();

    this.state = {
      panoImage: {uri:''},
      restaurantId: '',
      tables: [
        {tableId: 1, coords: [-6, -1, -2]}, 
        {tableId: 2, coords: [-7, 0, 2]}, 
        {tableId: 3, coords: [-3, 0, 3]},
        {tableId: 4, coords: [-4, 1.5, 8]},
        {tableId: 5, coords: [-7.5, 2.25, 8]}
      ]
    };
  }

  render() {

    console.log(this.state.restaurantId)
    return (
      <View>
        <Canvas panoImage={this.state.panoImage} />
       
        
        <Pointers tables={this.state.tables}/>

      </View>
    );
  }
  
  componentDidMount(){

    axios.get(`${'https://cors-anywhere.herokuapp.com/'}${'https://projectdatabase360.herokuapp.com/api/communication'}`)
    .then(response => {
      
      this.setState({ restaurantId: response.data.id.patched_id })

    }).then(() =>{
      this.setUrlToState()
    })
  
  }
  
setUrlToState=()=>{
  // componentDidUpdate(prevState){
  //   if( prevState.restaurantId !== this.state.restaurantId){
      axios.get(`${'https://cors-anywhere.herokuapp.com/'}${'https://projectdatabase360.herokuapp.com/api/restaurants/'}${this.state.restaurantId}`)
    .then(restaurantData => {
      console.log(restaurantData.data.restaurant.link_to_360)
      this.setState({panoImage: {uri:`${'https://cors-anywhere.herokuapp.com/'}${restaurantData.data.restaurant.link_to_360}`}})
      
    })
    }
  
  
};

AppRegistry.registerComponent('GDVR_REACTVR_SITEPOINT_GALLERY', () => GDVR_REACTVR_SITEPOINT_GALLERY);