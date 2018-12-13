// Import libraries for making a component
import React, { Component } from 'react';
import { Text, Dimensions, TouchableOpacity } from 'react-native';
import { Card,Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const mascotPng = require("./images/mascot.png");

//Text content
const textAppsTitle='Datum Mascot';
const textAbout1='What is This?';
const textAbout2='This app creates and hosts your very own mascot. The Mascot represents you in the net. You can visit and review your Mascot anytime you want. Give this lucky roulette a spin to get your mascot.';
const textAbout3='What is collected?';
const textAbout4='Your Nickname';
const textAboutButton='COUNT ME IN!';


const About = (props) => {

   return (
     <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#63dffd', '#3b5998', '#a03ef6']} >
     <Card
      title={textAppsTitle}
      containerStyle={styles.aboutContainer}
      dividerStyle={styles.aboutContainerDivider}
      titleStyle={styles.aboutContainerTitle}
      >
     <Avatar
      size="large"
      rounded
      source={mascotPng}
      onPress={() => console.log("Works!")}
      activeOpacity={0.7}
      containerStyle={styles.aboutAvatar}
     />

     <Text style={styles.textAbout1}>{textAbout1}</Text>
     <Text style={styles.textAbout2}>{textAbout2}</Text>
     <Text style={styles.textAbout3}>{textAbout3} </Text>
     <Text style={styles.textAbout4}>{textAbout4}</Text>

    <TouchableOpacity  >
    <Text style={styles.aboutButton}onPress={ () => props.goToPage && props.goToPage() }
    >{textAboutButton}</Text>
    </TouchableOpacity>
    </Card>
    </LinearGradient >
  );
}

const styles = {
aboutButton:{
  backgroundColor:'#a33ef8',
  alignSelf:'center',
  width: wp('40.83%'),
  height: hp('4.81%'),
  borderRadius: 50,
  borderColor: "#EE82EE",
  borderWidth: hp('0.12%'),
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,
  marginTop: hp('15%'),
  paddingLeft:0,
  paddingRight:0 ,
  paddingTop:3 ,
  color:'#FFF',
  fontSize:hp('2%'),
  fontWeight: 'bold',
  textAlign: 'center',
},
aboutContainer:{
  marginTop: 25,
  marginBottom: 10,
  borderRadius: 5,
  height: hp('80.35%')
},
aboutContainerDivider:{
  backgroundColor:'#fff',
  marginTop:0,
  marginBottom:0
},
aboutContainerTitle:{
  marginTop:0,
  marginBottom:0,
  color:'#000'
},
aboutAvatar:{
  alignSelf:'center',
  marginTop: hp('2.25%'),
  backgroundColor:'#fff',
  borderColor: "#fff",
  borderWidth: 0,
  marginBottom: hp('4%')
},
textAbout1:{
  marginBottom: hp('2.81%'),
  alignSelf:'center',
  fontWeight: 'bold',
  color:'#000',
  fontSize:hp('2.2%')
},
textAbout2:{
  marginBottom: hp('3.40%'),
  alignSelf:'center',
  color:'#000',
  textAlign:'center',
  fontSize:hp('2%')
},
textAbout3:{
  marginBottom:hp('1.88%'),
  alignSelf:'center',
  fontWeight: 'bold',
  color:'#000',
  fontSize:hp('2.2%')
},
textAbout4:{
  marginBottom: 0,
  alignSelf:'center',
  color:'#000',
  fontSize:hp('2%')
}

}

export default About;
