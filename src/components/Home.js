// Import libraries for making a component
import React from 'react';
import { Text, View, Dimensions,TouchableOpacity,ImageBackground} from 'react-native';
import { Card,Avatar, Divider, ListItem, ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const mascotPng = require("./images/mascot.png");
const bgHome= require("./images/bghome.png");
import Spinner from 'react-native-loading-spinner-overlay';


//Text content
const textConnected= applyLetterSpacing('CONNECTED');
const textDatumId= applyLetterSpacing('Datum ID');
const textEmail= applyLetterSpacing('Email Address');
const textIndentity='Your Identity';
const textApps='Apps';
const textSignin='Sign in With Datum';
const textAppsTitle='Datum Mascot';
const textMascotButton='MAKE MY MASCOT!';
const textWallet='Wallet';
const textMe='Me';

//Footer Buttons
const button1 = () =>{return(<View ><Icon color="#2c60fd" name="plus-square" size={15} style={styles.footerButtonCenter}/><Text style={styles.footerButtonApps}>{textApps}</Text></View>)}
const button2 = () =>{return(<View><Icon color="#b3b8c2" name="database" size={15} style={styles.footerButtonCenter}/><Text style={styles.footerButtonGrey}>{textWallet}</Text></View>)}
const button3 = () =>{return(<View><Icon color="#b3b8c2" name="user" size={15} style={styles.footerButtonCenter}/><Text style={styles.footerButtonGrey}>{textMe}</Text></View>)}
const buttons = [ {element:button1},{element:button2} , {element:button3} ];


//Default export Home component
const Home = (props) => {


  return (

    <ImageBackground source={bgHome} style={styles.ImageBackground} >

    <Spinner
   visible={!props.initDone}
   textContent={'Loading...'}
   textStyle={styles.spinnerTextStyle}
   />

    <View style={styles.containerStyle}>


    <Text style={styles.textIndentity}>{textIndentity}</Text>


    <View style={styles.cardStyle}>
    <ListItem
    containerStyle={styles.containerDatum}
    titleStyle={styles.containerDatumTitle}
    subtitleStyle={styles.containerDatumSubtitle}
    title={textConnected}
    subtitle={textDatumId}
    leftAvatar=<Icon color="#fff" name="id-card" size={12} style={styles.containerDatumAvatar} />
     />
     <ListItem
     containerStyle={styles.containerEmail}
     titleStyle={styles.containerDatumTitle}
     subtitleStyle={styles.containerDatumSubtitle}
     title={textConnected}
     subtitle={textEmail}
     leftAvatar=<Icon color="#fff" name="envelope-open"size={14} style={styles.containerDatumAvatar}/>
     />
     </View>


    <Text style={styles.textApps}>{textApps}</Text>
    <Text style={styles.textSignin}>{textSignin}</Text>


    <Card title={textAppsTitle}
      containerStyle={styles.containerMascot}
      dividerStyle={styles.containerMascotDivider}
      titleStyle={styles.containerMascotTitle}>

    <Avatar
      size="large"
      rounded
      source={mascotPng}
      onPress={()=>console.log('works')}
      activeOpacity={0.7}
      containerStyle={styles.containerMascotAvatar}
    />


    <TouchableOpacity  >
    <Text
      style={styles.containerMascotButton}
      onPress={ () => props.goToPage && props.goToPage() }
    >{textMascotButton}</Text>
    </TouchableOpacity>
    </Card>


    <ButtonGroup
      innerBorderStyle={styles.footerWhite}
      buttonStyle={styles.footerWhite}
      buttons={buttons}
      containerStyle={styles.footerContainer}
    />
    </View>
    </ImageBackground>
  );
}


const styles = {
ImageBackground:{
  width: '100%',
  height: '100%',
  flex:1
  },
containerStyle:{
  marginTop: 17,
  borderColor:'#2773fd'
  },
cardStyle: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  },
textIndentity:{
  marginTop:0,
  marginBottom:hp('1.41%'),
  marginLeft:wp('6.9%'),
  marginRight:0,
  paddingLeft:0,
  paddingRight:0 ,
  fontSize:13,
  color:'#edf5ff'
},
containerDatum:{
  backgroundColor:'#45b57f',
  borderRadius: 5,
  marginRight:wp('3.54%'),
  width:wp('41.46%'),
  height:hp('13.13'),
  marginTop:hp('1.41%'),
  marginLeft:wp('7.08%')},
containerDatumTitle:{
  color:'#edf5ff',
  fontSize: 8,
  marginBottom:-20,
  marginLeft:15
},
containerDatumSubtitle:{
  color:'#edf5ff',
  marginLeft:-30,
  fontSize: 9,
  paddingTop:30
},
containerDatumAvatar:{
  marginBottom:hp('2.17%'),
  marginTop:-15,
  marginRight:0,
  paddingLeft:0,
  paddingRight:0 ,
},
containerEmail:{
  backgroundColor:'#45b57f',//45b57f,68c397
  width:wp('41.46%'),
  height:hp('13.13'),
  marginRight:wp('7.08%'),
  marginTop:hp('1.41%'),
  borderRadius: 5
},
textApps:{
  marginLeft:wp('6.9%'),
  marginTop:hp('1.41%'),
  fontSize:12,
  color:'#edf5ff'
},
textSignin:{
  marginLeft:wp('6.9%'),
  fontSize:10,
  color:'#edf5ff'
},
containerMascot:{
  alignSelf:'center',
  height: hp('38.45%'),
  width:wp('87.08%'),
  borderColor: "#FFF",
  borderRadius:5,
  borderWidth: 2,
},
containerMascotDivider:{
  backgroundColor:'#fff',
  marginTop:0,
  marginBottom:0
},
containerMascotTitle:{
  marginTop:0,
  marginBottom:0,
  color:'#000',
  fontWeight: 'normal'
},
containerMascotAvatar:{
  alignSelf:'center',
  marginTop: hp('3.75%'),
  backgroundColor:'#fff',
  borderColor: "#fff",
  borderWidth: 0,
  width:wp('26.42%'),
},
containerMascotButton:{
  backgroundColor:'#2e63fd',
  alignSelf:'center',
  width: wp('40.83%'),
  height: hp('4.81%'),
  borderRadius: 50,
  borderColor: "#2e63fd",
  borderWidth: hp('0.12%'),
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,
  marginTop: hp('3.63%'),
  paddingLeft:0,
  paddingRight:0 ,
  paddingTop:3 ,
  color:'#FFF',
  fontSize:hp('2%'),
  fontWeight: 'bold',
  textAlign: 'center',
},
footerWhite:{
  color:'white'
},
footerContainer:{
  height: hp('8%'),
  marginTop:hp('7%'),
  borderColor:'white'
},
footerButtonCenter:{
  alignSelf:'center'
},
footerButtonApps:{
  alignSelf:'center',
  fontSize:9,
  color:'#2c60fd'
},
footerButtonGrey:{
  alignSelf:'center',
  fontSize:9,
  color:'#b3b8c2'
},
spinnerTextStyle: {
  color: '#FFF'
}
};

//function add  spacing
function applyLetterSpacing(string, count = 1) {
  return string.split('').join('\u200A'.repeat(count));
}


export default Home;
