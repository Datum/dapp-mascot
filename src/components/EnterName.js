import React, {Component} from 'react';
import { Text, View, TextInput,TouchableHighlight, Dimensions, TouchableOpacity  } from 'react-native';
import { Card,Avatar,Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const mascotPng = require("./images/mascot.png");



//Text content
const textAppsTitle='Datum Mascot';
const placeholder="Enter Your name here";
const cardText1='Give your Mascot a name (e.g your nickname)';
const cardText2='NEXT';
const overlayTitle='Permission to Write';
const overlayText1="'Datum Mascot' would like to write and have access to the following data:";
const overlayText2="Permission for the following attributes :";
const overlayText3="Your nickname";
const overlayText4="CONTINUE";
const overlayText5="CANCEL";
const errorMsg="Your NickName must be letters without special symbols.";


 export default  class addName extends Component {

   constructor(props) {
    super(props);

    this.state = {
              name:'',
              modalVisible: false,
	            errors:false,
              validName:false
            }
    this.setModalVisible=this.setModalVisible.bind(this);
    }

    //Handle Overlay
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    //TextInput Event
    handleName(name){
     let  regrex=/[^a-z]/gi;
     let  checkName=regrex.test(name.name);
     
     if (checkName){
        console.log('errors');
	      this.setState({ errors:true });
        this.setState({ validName:false });
  	 }else{
        console.log('no errors',name.name.length);
	      this.setState({ name });
        this.props.setName(name.name);
        this.setState({ errors:false });
        (name.name.length>0)? this.setState({ validName:true }):this.setState({ validName:false });
    }

    }

    render(){
      return (

        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#63dffd', '#3b5998', '#a03ef6']} >
        <Card
          title={textAppsTitle}
          containerStyle={styles.cardContainer}
          dividerStyle={styles.cardDivider}
          titleStyle={styles.cardTitle}
        >
        <Avatar
          size="large"
          rounded
          source={mascotPng}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          containerStyle={styles.cardAvatar}/>

        <Text style={styles.cardText1}>{cardText1}</Text>


        <TextInput
          placeholder={placeholder}
          autoCorrect={false}
	  maxLength={32}
          value={this.state.name}
          onChangeText={name => this.handleName({ name })}
          style={styles.cardTextInput}/>

          <View style={{width: wp('70%'),alignSelf:'center',borderRadius:30, marginTop:-25,marginBottom:10,opacity:0.8}}>
              <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['#ebebeb','transparent']}
              style={{
                  left:0,
                  right:0,
                  height:8
              }}/>
            </View>
	         {this.state.errors &&<Text style={styles.errorMsg}>{errorMsg}</Text>}



        {this.state.validName && <TouchableOpacity>
        <Text
          style={styles.cardText2}
          onPress={(this.props.nickNameClaim)? () => this.props.goToPage && this.props.goToPage() :()=>this.setModalVisible(true)}
        >{cardText2}</Text>
        </TouchableOpacity>}


        </Card>



      <Overlay
        isVisible={this.state.modalVisible}
        width={wp('91.04%')}
        height={hp('70%')}>

      <View style={styles.overlayTitle}>

      <Card
        title={overlayTitle}
        containerStyle={styles.overlayContainer}
        dividerStyle={styles.overlayDivider}
        titleStyle={styles.overlayTitle}>

      <Text style={styles.overlayText1}>{overlayText1}</Text>
      <Text style={styles.overlayText1}>{overlayText2}</Text>
      <Text style={styles.overlayText3}>
      <Icon color="green" name="exclamation-circle" size={12} style={styles.overlayText3Icon}/>
      {overlayText3}
      </Text>

      <TouchableOpacity>
      <Text
      style={styles.overlayText4}
      onPress={ () => {this.setModalVisible(!this.state.modalVisible);this.props.goToPage && this.props.goToPage() }}
      >{overlayText4}</Text>
      </TouchableOpacity>

      <TouchableOpacity>
      <Text
        style={styles.overlayText5}
        onPress={() => this.setModalVisible(!this.state.modalVisible)}
      >{overlayText5}</Text>
      </TouchableOpacity>

      </Card>
      </View>
      </Overlay>
      </LinearGradient >);
}

}

const styles = {
cardContainer:{
  marginTop: 25,
  marginBottom: 10,
  borderRadius: 5,
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
cardAvatar:{
  alignSelf:'center',
  marginTop: hp('2.25%'),
  backgroundColor:'#fff',
  borderColor: "#fff",
  borderWidth: 0,
  width:wp('26.42%')
},
cardText1:{
  alignSelf:'center',
  marginBottom: hp('2.7%'),
  marginTop: hp('3.87%'),
  fontSize:hp('2.2%'),
  color:'#131313'
},
cardTextInput:{
  alignSelf:'center',
  marginBottom: hp('2.7%'),
  height:hp('7.15%'),
  width:wp('75.83%'),
  borderColor: "#ededed",
  borderWidth: hp('0.12%'),
  borderRadius: 1,
  marginBottom: hp('5%'),
  paddingLeft:wp('2%'),
  fontSize:hp('2%')
},
cardText2:{
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
  color:'#FFF',
  fontSize:hp('2%'),
  fontWeight: 'bold',//Text content
  textAlign: 'center',
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
  marginTop:0,
  marginBottom:0,
  color:'#000'
},
overlayText1:{
  marginBottom: 10,
  marginTop:10,
  alignSelf: 'center',
  color:'#000',
  fontSize:hp('2.2%')
},
overlayText3:{
  marginBottom: 40,
  marginLeft:10,
  alignSelf: 'center',
  color:'#000',
  fontSize:hp('2.2%')
},
overlayText3Icon:{
  marginBottom:0,
  marginRight:10,
  paddingLeft:0,
  paddingRight:10
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
overlayText5:{
  backgroundColor:'transparent',
  alignSelf:'center',
  width: wp('40.83%'),
  height: hp('4.81%'),
  borderRadius: 50,
  borderColor: "#EE82EE",
  borderWidth: hp('0.12%'),
  marginLeft: 0,
  marginRight: 0,
  marginBottom: 0,
  paddingLeft:0,
  paddingRight:0 ,
  paddingTop:3 ,
  height:hp('4.69%'),
  color:'#EE82EE',
  fontSize:hp('2%'),
  fontWeight: 'bold',
  textAlign: 'center',
},
errorMsg:{
  color:'red',
  fontSize:hp('1.8%'),
  fontWeight: 'bold',//Text content
  alignSelf:'center',
}
}
