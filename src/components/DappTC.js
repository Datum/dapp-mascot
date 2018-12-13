// Import libraries for making a component
import React, {Component} from 'react';
import { Text, View, ListView, Dimensions, TouchableOpacity } from 'react-native';
import { Card,CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';

//Text content
const textTCTitle='Terms & Conditions';
const textTC1='You are giving this dapp the right to access your Nickname to create your access to get your Datum Mascot';
const textTC2='You can manage permissions in My Data';
const textTC3='Datum will use this information in accordance with our privacy policy and terms of use';
const textTC4='Note: Your information will not be shared withour your consent';
const textTC5='I agree to the terms & conditions and the privacy policy. Click here to view';
const textTC6='I UNDERSTAND';


export default  class tCond extends Component {

  constructor(props) {
    super(props);
      this.state = {
        checked:false,
        dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }).cloneWithRows([textTC2,textTC3,textTC4]),
    };
      this.handleTnc=this.handleTnc.bind(this);
  }
  //List Item
  renderRow(data) {
    let tmp= '\u2022'+ ' ';
    return (
      <View style={styles.tcListContainer}>
      <Text>{'\u2022'+ ' '}</Text>
      <Text style={styles.tcListItem}>{data}</Text>
      </View>
    );
  }
  //Handle Checked Box Event
  handleTnc(event){
    console.log('claim tnc')
    this.setState({checked: !this.state.checked});
    this.props.setTermsCondition(!this.state.checked);
  }

  render(){
    console.log('tnc', this.props.termsConditionClaim);
    let showSpinner = this.state.checked && !this.props.termsConditionClaim;
    return (
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#63dffd', '#3b5998', '#a03ef6']} >
      <Spinner
     visible={showSpinner}
     textContent={'Loading...'}
     textStyle={styles.spinnerTextStyle}
     />


      <Card
        title={textTCTitle}
        containerStyle={styles.tcContainer}
        dividerStyle={styles.tcDivider}
        titleStyle={styles.tcTitle}>

      <Text style={styles.textTC1}>{textTC1}</Text>

      <ListView
        style={styles.tcListView}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}/>

      <CheckBox
        title={textTC5}
        textStyle={styles.textTC5}
        checked={this.state.checked}
        onPress={this.handleTnc}/>

      {this.props.termsConditionClaim && <TouchableOpacity>
        <Text
          style={styles.textTC6}
          onPress={ () => this.props.goToPage && this.props.goToPage() }
        >{textTC6}</Text>
        </TouchableOpacity>}

      </Card>
      </LinearGradient >);
    }
}

const styles = {
tcListContainer:{
  flexDirection: 'row',
  marginBottom: hp('2.53%')
},
tcListItem:{
  alignSelf: 'flex-start',
  fontSize:hp('2%'),
  color:'#000'
},
tcContainer:{
  marginTop: 25,
  marginBottom: 10,
  borderRadius: 5,
  height: hp('80.35%')
},
tcDivider:{
  backgroundColor:'#fff',
  marginTop:0,
  marginBottom:0
},
tcTitle:{
  marginTop:0,
  marginBottom:0,
  color:'#000'
},
textTC1:{
  marginBottom: hp('2.93%'),
  fontSize:hp('2.1%'),
  color:'#000',
  marginTop:hp('3%')
},
tcListView:{
  marginBottom: hp('4%'),
  color:'#000'
},
textTC5:{
  fontSize:hp('2%'),
  color:'#919097'
},
textTC6:{
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
  marginTop: hp('16%'),
  paddingLeft:0,
  paddingRight:0 ,
  paddingTop:3 ,
  color:'#FFF',
  fontSize:hp('2%'),
  fontWeight: 'bold',
  textAlign: 'center',
}

}
