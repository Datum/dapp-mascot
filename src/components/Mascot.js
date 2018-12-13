// Import libraries for making a component
import React from 'react';
import { Text,Dimensions} from 'react-native';
import { Card} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { SvgM1, SvgM2, SvgM3, SvgM4, SvgM5, SvgM6, SvgM7, SvgM8, SvgM9, SvgM10 } from './mascot';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';


//Text content
const mascotTitle = 'Your Mascot!';
const mascotType= 'Type A';



const Mascot = (props) => {

  const color = props.datumAddress.substring(props.datumAddress.length-6);
  const mascotColor='#'+color;

  if(!props.finalDone) props.mascotFinalConfirn();

  if (props.mascotNb===undefined) props.mascotNb=1;
  return (
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#63dffd', '#3b5998', '#a03ef6']} >
    <Spinner
   visible={!props.finalDone}
   textContent={'Loading...'}
   textStyle={styles.spinnerTextStyle}
   />

    <Card
      title={mascotTitle}
      containerStyle={styles.mascotContainer}
      dividerStyle={styles.mascotDivider}
      titleStyle={styles.mascotTitle}>

      {props.mascotNb === 1 && <SvgM1 color={mascotColor}  style={styles.mascotSvg}/>}
      {props.mascotNb === 2 && <SvgM2 color={mascotColor}  style={styles.mascotSvg}/>}
      {props.mascotNb === 3 && <SvgM3 color={mascotColor}  style={styles.mascotSvg}/>}
      {props.mascotNb === 4 && <SvgM4 color={mascotColor}  style={styles.mascotSvg}/>}
      {props.mascotNb === 5 && <SvgM5 color={mascotColor}  style={styles.mascotSvg}/>}
      {props.mascotNb === 6 && <SvgM6 color={mascotColor}  style={styles.mascotSvg}/>}
      {props.mascotNb === 7 && <SvgM7 color={mascotColor}  style={styles.mascotSvg}/>}
      {props.mascotNb === 8 && <SvgM8 color={mascotColor}  style={styles.mascotSvg}/>}
      {props.mascotNb === 9 && <SvgM9 color={mascotColor}  style={styles.mascotSvg}/>}
      {props.mascotNb === 10 && <SvgM10 color={mascotColor} style={styles.mascotSvg}/>}

    <Text style={{marginBottom:hp('1.41%'),marginTop:-20,alignSelf:'center',fontWeight: 'bold',color:mascotColor}}>{props.mascotName}</Text>
    <Text style={{marginBottom: hp('1.41%'),alignSelf:'center',fontSize: 12, color:mascotColor}}>{color}</Text>
    <Text style={{alignSelf:'center',color:mascotColor}}>{mascotType}</Text>
    </Card>
    </LinearGradient >
  );
}

const styles = {
mascotContainer:{
  marginTop: 25,
  marginBottom: 10,
  borderRadius: 5,
  height: hp('80.35%')
},
mascotDivider:{
  backgroundColor:'#fff',
  marginTop:0,
  marginBottom:0
},
mascotTitle:{
  marginTop:0,
  marginBottom:0,
  color:'#000'
},
mascotSvg:{
  alignSelf:'center',
  marginBottom: 0
}

}

export default  Mascot;
