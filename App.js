/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import Datum from 'datum-sdk';
import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Header from './src/components/Header';
import Home from './src/components/Home';
import About from './src/components/Details';
import Tc from './src/components/DappTC';
import AddName from './src/components/EnterName';
import Roulette from './src/components/Roulette';
import Mascot from './src/components/Mascot';
import ScrollableTabView from 'react-native-scrollable-tab-view';


const PASSWORD = 'password';


type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.datum = new Datum();
    this.state = {

      datumAddress: 'n/a',
      mascotName:'Test',
      mascotNb:1,
      mascotCounter:0,
      termsConditionClaim:false,
      nickNameClaim:false,
      mascotCreated:false,
      initDone:false,
      finalDone:false
    }

    this.init = this.init.bind(this);
    this.setName = this.setName.bind(this);
    this.setMascot = this.setMascot.bind(this);
    this.setTermsCondition = this.setTermsCondition.bind(this);
    this.mascotComplete = this.mascotComplete.bind(this);
    this.getData = this.getData.bind(this);
    this.setData = this.setData.bind(this);
    this.setNickName = this.setNickName.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.initDone = this.initDone.bind(this);
    this.initTnc = this.initTnc.bind(this);
    this.initCounter = this.initCounter.bind(this);
    this.mascotFinalConfirn = this.mascotFinalConfirn.bind(this);
    this.saveMascot = this.saveMascot.bind(this);
    this.confirmNickNameClaim = this.confirmNickNameClaim.bind(this);
    this.confirmMascot = this.confirmMascot.bind(this);


  }

  componentWillMount() {
    this.init();
      }

   //Handle State Name event
   setName(name){
    console.log('set name',name);
    this.setState({mascotName: this.capitalize(name)});

   }

   capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
   }

   //When enable you will go directly to the last screen
   mascotComplete(){
    console.log('valid new mascot');
    this.setState({mascotCreated:true});

   }
   //Save Counter new Mascot and NickName Claim if needed to Datum
   mascotFinalConfirn(){
      console.log(' mascot final confirm');

      const data = ""+(this.state.mascotCounter + 1);
      const keyname = 'mascot_counter';

      //Update Datum  Counter
      if(this.state.mascotCounter === 0){
        console.log('first mascot ');
        this.setData(data,keyname,this.saveMascot);
       }else{
        this.datum.removeByKey('mascot_counter').then((res)=>{
        this.setData(data,keyname,this.saveMascot);

        }). catch(error => {
        console.log('remove old key error',error);
        });
      }
   }

   //Save Mascot to Datum
   saveMascot(){
     console.log('save mascot',this.state.mascotCounter);

     const id = this.state.mascotCounter + 1;
     const keyname = 'mascot_'+id;
     const data = {mascot:this.state.mascotNb};

    (this.state.nickNameClaim)?this.setData(data,keyname, this.confirmMascot):
    this.setData(data,keyname, this.setNickName);
   }

   //Set mascotNb selected by Roulette Spin
   setMascot(spinNb){
      console.log('set mascot',spinNb);
    this.setState({mascotNb:spinNb});
   }

   //Get Datum data
   getData(keyname,callback){
     console.log('get data');
      this.datum.getWithKey(keyname)
     .then(result => {
         console.log(result);
         if(keyname === 'tnc_claim') this.setState({termsConditionClaim:true});
         if(keyname === 'nickname_claim') this.setState({nickNameClaim:true});
         if(keyname === 'mascot_counter') this.setState({mascotCounter:result});

         callback();

     }).catch(error => {
       console.log('keyname',keyname,'error',error);
       callback();
   });
   }

   //Save data to Datum
   setData(data,keyname,callback){
     console.log('set data',data,"key",keyname);

     this.datum.set(data,keyname)
    .then(itemId =>{
      console.log('sucess',itemId);
      if(keyname === 'tnc_claim') this.setState({termsConditionClaim:true});
      if(keyname === 'nickname_claim') this.setState({nickNameClaim:true});

     callback();

    }).catch(error => {
      console.log('keyname',keyname,'error',error);
      callback();
  });

   }


  //Save T&C Claim to Datum
 setTermsCondition(claim){
    console.log('t&C claim', claim);

    const data = 'I agree to the terms and conditions of this app';
    const keyname = 'tnc_claim';
    this.setData(data,keyname,this.confirmTncClaim);

}//end tncclaim

  //Save nickNameClaim to Datum
   setNickName(){
    console.log('nickname claim');

    const data = '"Datum Mascot would like to write and have access to the following data: NickName';
    const keyname = 'nickname_claim';
    this.setData(data,keyname,this.confirmNickNameClaim);
   }


   confirmTncClaim(){
     console.log('tnc Ok');
   }

   confirmNickNameClaim(){
     console.log('nickname Ok');
     this.setState({finalDone:true});
   }

   confirmMascot(){
     console.log('save mascot Ok');
     this.setState({finalDone:true});
   }

   initTnc(){
     console.log('initTnc after tnc Claim');
     this.getData('nickname_claim', this.initCounter);
   }

   initCounter(){
      console.log('initCounter after NickName Claim');
    this.getData('mascot_counter', this.initDone);
   }

   initDone(){
     console.log('init complet Ok');
     this.setState({initDone:true});
   }

  //Init to Set Datum Adr Call Faucet and Deposit
  async init() {

    let obj = await Datum.createIdentity(PASSWORD,1);
    let initObject = {identity:obj.keystore,useFuelingServer:false,fuellingConfig:{URL:'http://localhost:3000/api/v1/transaction'}};

    this.datum.initialize(initObject);
    this.datum.identity.storePassword(PASSWORD);
    this.setState({datumAddress: this.datum.identity.address});

    fetch(`https://faucet.megatron.datum.org/v1/faucet/dat/${this.state.datumAddress}`)
              .then(response=>{
                  console.log('faucet Ok',response);
                  this.datum.deposit(100).then((res)=>{
                  console.log('deposit Ok',res);
                  this.getData('tnc_claim', this.initTnc);
                   }). catch(error => {
    			console.log('deposit error',error);
			           });
        }). catch(error => {

			    console.log('faucet error',error);
		});
    //console.log('init done',obj);

  }


  render() {

    let skipTnc = (this.state.termsConditionClaim)? 3 : 2;
    let finalMascotPage = (this.state.mascotCreated)? 5 : 1;

    return (

    <View style={{flex:1}}>
    <ScrollableTabView
    renderTabBar = {() => <Header headerText = {'Datum'}  />}
    initialPage = {0}
    ref = {(tabView) => { this.tabView = tabView}}
    style = {{borderColor:'#2773fd'}}
    tabBarUnderlineStyle = {{borderColor:'#2773fd'}}
    tabBarBackgroundColor = {{borderColor:'#2773fd'}}>
       <Home goToPage = { () => this.tabView.goToPage(finalMascotPage) } initDone = {this.state.initDone}/>
       <About goToPage = { () => this.tabView.goToPage(skipTnc) } />
       <Tc setTermsCondition = {this.setTermsCondition} termsConditionClaim = {this.state.termsConditionClaim} goToPage = { () => this.tabView.goToPage(3)} />
       <AddName  setName = {this.setName} goToPage = { () => this.tabView.goToPage(4) }   nickNameClaim = {this.state.nickNameClaim}/>
       <Roulette setMascot = {this.setMascot} goToPage = { () => this.tabView.goToPage(5) } mascotComplete = {this.mascotComplete}/>
       <Mascot datumAddress = {this.state.datumAddress} mascotName = {this.state.mascotName} mascotNb = {this.state.mascotNb} finalDone = {this.state.finalDone} mascotFinalConfirn={this. mascotFinalConfirn}/>
   </ScrollableTabView>
   </View>
    );

  }
}
