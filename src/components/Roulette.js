/**
 * Sample React Native Casino Roulette App
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Roulette from 'react-native-casino-roulette';
import wheel from './images/wheel.png';
import marker from './images/marker.png';
import { Card,Overlay } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SvgM1, SvgM2, SvgM3, SvgM4, SvgM5, SvgM6, SvgM7, SvgM8, SvgM9, SvgM10, SvgM11 } from './mascot';

//Roulette numbers
const numbers = [1,2,3,4,5,6,7,8,9,10]
const options  = numbers.map((o)=>({index:o}))
const customOptions = numbers.map((o)=> (
  <Text index={o}>{o}</Text>
));

//Text content
const textAppsTitle='Datum Mascot';
const overlayText4="FINNISH";
const overlayTitle='Your Mascot!';
const mascotColor='grey';

export default class roulette extends Component {
  constructor(props){
    super(props);
    this.onRotate = this.onRotate.bind(this);
    this.onRotateChange = this.onRotateChange.bind(this);
    this.onRotateCustom = this.onRotateCustom.bind(this);
    this.onRotateCustomChange = this.onRotateCustomChange.bind(this);
    this.state={
      option:"Option selected:",
      optionCustom:"Option selected:",
      rouletteState:'stop',
      rouletteCustomState:'stop',
      modalVisible: false
    }
  }



      //Handle Overlay
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }



  render() {
    const{option, rouletteState, optionCustom, rouletteCustomState} = this.state
    return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#63dffd', '#3b5998', '#a03ef6']} >
      <Card
        title={textAppsTitle}
        containerStyle={styles.cardContainer}
        dividerStyle={styles.cardDivider}
        titleStyle={styles.cardTitle}
         >
      <Roulette
        enableUserRotate={rouletteState=='stop'}
        background={wheel}
        onRotate={this.onRotate}
        onRotateChange={this.onRotateChange}
        marker={marker}
        options={options}
        markerWidth={20}
        radius = {hp('55.23%')}>
      </Roulette>
      </Card>
      <Overlay
        isVisible={this.state.modalVisible}
        >

        <Text style={styles.overlayTitle}>{overlayTitle}</Text>




        {this.state.option  === 1 && <SvgM1 color={mascotColor}  style={styles.mascotSvg}/>}
        {this.state.option  === 2 && <SvgM2 color={mascotColor}  style={styles.mascotSvg}/>}
        {this.state.option  === 3 && <SvgM3 color={mascotColor}  style={styles.mascotSvg}/>}
        {this.state.option  === 4 && <SvgM4 color={mascotColor}  style={styles.mascotSvg}/>}
        {this.state.option  === 5 && <SvgM5 color={mascotColor}  style={styles.mascotSvg}/>}
        {this.state.option  === 6 && <SvgM6 color={mascotColor}  style={styles.mascotSvg}/>}
        {this.state.option  === 7 && <SvgM7 color={mascotColor}  style={styles.mascotSvg}/>}
        {this.state.option  === 8 && <SvgM8 color={mascotColor}  style={styles.mascotSvg}/>}
        {this.state.option  === 9 && <SvgM9 color={mascotColor}  style={styles.mascotSvg}/>}
        {this.state.option  === 10 && <SvgM10 color={mascotColor} style={styles.mascotSvg}/>}


      <TouchableOpacity>
      <Text
      style={styles.overlayText4}
      onPress={ () => {this.setModalVisible(!this.state.modalVisible);this.props.goToPage && this.props.goToPage() }}
      >{overlayText4}</Text>
      </TouchableOpacity>






      </Overlay>
      </LinearGradient >
    );
  }

  onRotateChange(state) {
    this.setState({
      rouletteState: state
    })
    console.log('rotate',state)
    this.props.mascotComplete();

    if(state==='stop') this.setModalVisible(!this.state.modalVisible);
  }

  onRotate(option) {



    if(this.props.mascotCounter%100 === 0){
      //Special mascot  
      this.setState({
        option:11
      })
      this.props.setMascot(11);

    }else{
      this.setState({
        option:option.index
      })
      this.props.setMascot(option.index);
    }



  }

  onRotateCustomChange(state) {
    this.setState({
      rouletteCustomState: state
    })
  }

  onRotateCustom(option) {


    this.setState({
        optionCustom:option.props.index
      })


  }
}

const styles = StyleSheet.create({
cardContainer:{
    alignItems:"center",
    marginTop: 25,
    marginBottom: 10,
    borderRadius: 5,
    width:wp('91.04%'),
    height: hp('80.35%')
  },
cardDivider:{
    backgroundColor:'#fff',
    marginTop:0,
    marginBottom:0
},
cardTitle:{
    marginTop:0,
    marginBottom:0,
    color:'#000'
},
overlayContainer:{
  marginTop: 5,
  marginBottom: 0,
  color:"#000",
  borderWidth:0 ,
  borderColor:'white',
  alignSelf: 'center',
},
overlayDivider:{
  backgroundColor:'#fff',
  marginTop:0,
  marginBottom:0
},
overlayTitle:{
  marginTop:5,
  marginBottom:0,
  color:'#000',
  alignSelf:'center',
  fontWeight:'bold'
},
overlayText4:{
  backgroundColor:'#a33ef8',
  alignSelf:'center',
  width: wp('40.83%'),
  height: hp('4.81%'),
  borderRadius: 50,
  borderColor: "#EE82EE",
  borderWidth: hp('0.12%'),
  marginLeft: 0,
  marginRight: 0,
  marginBottom: hp('4%'),
  paddingLeft:0,
  paddingRight:0 ,
  paddingTop:3 ,
  height:hp('4.69%'),
  color:'#FFF',
  fontSize:hp('2%'),
  fontWeight: 'bold',
  textAlign: 'center',
},
mascotSvg:{
  alignSelf:'center',

}
});
