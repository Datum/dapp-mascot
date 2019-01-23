import React, { Component } from 'react';
import './App.css';
import Datum from 'datum-sdk';
import Home from './components/Home';
import About from './components/About';
import DappTc from './components/DappTc';
import AddName from './components/AddName';
import DappRoulette from './components/dappRoulette';
import Mascot from './components/Mascot';
import {HeaderH,HeaderF,HeaderM} from './components/Header';


const PASSWORD = 'password';
class App extends Component {
  constructor(props) {
  super(props);
this.datum = new Datum();
  this.state = {

    datumAddress: 'n/a',
    mascotName:'n/a',
    mascotNb:1,
    mascotCounter:0,
    termsConditionClaim:false,
    nickNameClaim:false,
    mascotCreated:false,
    initDone:false,
    finalDone:false,
    currentStep:1,
    publicKey:'n/a',
    encryptionKey:'n/a'
  }

}
    componentWillMount() {this.init(); }

    handleStep=(next)=>{

      if(next==='up'){
        this.setState({currentStep:this.state.currentStep+1});
      }else if(next==='back'){
        this.setState({currentStep:this.state.currentStep-1});
      }else{
        this.setState({currentStep:next});
       }
    }

    //Handle State Name event
    setName=(name)=>{this.setState({mascotName: this.capitalize(name)});}

    capitalize=(string)=> {return string.charAt(0).toUpperCase() + string.slice(1);}

    //When enable you will go directly to the last screen
    mascotComplete=()=>{this.setState({mascotCreated:true});}

    //Save Counter new Mascot and NickName Claim if needed to Datum
    mascotFinalConfirn=()=>{

       const data = this.state.mascotCounter + 1;
       const keyname = 'mascot_counter';

       //Update Datum  Counter
       if(this.state.mascotCounter === 0){
         this.setData(data,keyname,this.saveMascot);
        }else{
         this.datum.removeByKey('mascot_counter').then((res)=>{
         this.setData(data,keyname,this.saveMascot);
         //Update Counter
         this.setState({mascotCounter: this.state.mascotCounter + 1});
         }).catch(error => {
        //console.log('remove old key error',error);
         });
       }
    }

    //Save Mascot to Datum
    saveMascot=()=>{
      const data = this.state.mascotCounter + 1;
      const keyname = 'mascot_'+data;
     (this.state.nickNameClaim)?this.setData({mascot:this.state.mascotNb},keyname, this.confirmMascot):
     this.setData({mascot:this.state.mascotNb},keyname, this.setNickName);
    }

    //Set mascotNb selected by Roulette Spin
    setMascot=(spinNb)=>{this.setState({mascotNb:spinNb});}

    //Get Datum data
    getData=(keyname,callback)=>{
       this.datum.getWithKey(keyname)
      .then(result => {
          if(keyname === 'tnc_claim') this.setState({termsConditionClaim:true});
          if(keyname === 'nickname_claim') this.setState({nickNameClaim:true});
          if(keyname === 'mascot_counter') this.setState({mascotCounter:result});
          callback();
      }).catch(error => {//    console.log('keyname',keyname,'error',error);
        callback();});
    }

    //Save data to Datum
    setData=(data,keyname,callback)=>{
      this.datum.set(data,keyname)
     .then(itemId =>{
       if(keyname === 'tnc_claim') this.setState({termsConditionClaim:true});
       if(keyname === 'nickname_claim') this.setState({nickNameClaim:true});
      callback();
     }).catch(error => { //   console.log('keyname',keyname,'error',error);
       callback();});
    }
   //Save T&C Claim to Datum
   setTermsCondition=()=>{
     const data = 'I agree to the terms and conditions of this app';
     const keyname = 'tnc_claim';
     this.setData(data,keyname,this.confirmTncClaim);
   }//end tncclaim

   //Save nickNameClaim to Datum
    setNickName=()=>{
     const data = '"Datum Mascot would like to write and have access to the following data: NickName';
     const keyname = 'nickname_claim';
     this.setData(data,keyname,this.confirmNickNameClaim);
    }

    confirmTncClaim=()=>{/*console.log('tnc Ok');*/ }

    confirmNickNameClaim=()=>{this.setState({finalDone:true});}

    confirmMascot=()=>{this.setState({finalDone:true});}

    initTnc=()=>{this.getData('nickname_claim', this.initCounter);}

    initCounter=()=>{this.getData('mascot_counter', this.initDone);}

    initDone=()=>{this.setState({initDone:true});}

   //Init to Set Datum Adr Call Faucet and Deposit
   async init() {

    let obj = await Datum.createIdentity(PASSWORD,1);
     let initObject = {identity:obj.keystore,useFuelingServer:false,fuellingConfig:{URL:'http://localhost:3000/api/v1/transaction'}};

     this.datum.initialize(initObject);
     this.datum.identity.storePassword(PASSWORD);
     this.setState({datumAddress: this.datum.identity.address});

     fetch(`https://faucet.megatron.datum.org/v1/faucet/dat/${this.state.datumAddress}`)
     .then(response=>{/*console.log('faucet Ok',response);*/
           setTimeout( function() {
              this.datum.deposit(100).then((res)=>{
              this.getData('tnc_claim', this.initTnc);
            }).catch(error => {/*console.log('deposit error',error);*/});
           }.bind(this),9000);
     }).catch(error => {/* console.log('faucet error',error);*/});
    await this.datum.getIdentityPublicKey().then((res)=>{this.setState({publicKey:res});});
    await this.datum.getEncryptionPublicKey().then((res)=>{this.setState({encryptionKey:res});});

    }//end init


  render() {

    let Body =<Home handleStep={this.handleStep}
            mascotCreated={this.state.mascotCreated}
            finalDone={this.state.finalDone}
            initDone={this.state.initDone} /> ;
    let Header =<HeaderH   handleStep={this.handleStep}/>;

    if(this.state.currentStep ===1 || this.state.currentStep === 5 ) Header = <HeaderH  handleStep={this.handleStep}/>;
    if(this.state.currentStep >1 && this.state.currentStep<5) Header = <HeaderF  handleStep={this.handleStep} currentStep={this.state.currentStep} termsConditionClaim = {this.state.termsConditionClaim}/>;
    if(this.state.currentStep===6) Header = <HeaderM  handleStep={this.handleStep}/>


    switch (this.state.currentStep) {
      case 1:
        Body= <Home handleStep={this.handleStep}
                mascotCreated={this.state.mascotCreated}
                finalDone={this.state.finalDone}
                initDone={this.state.initDone} /> ;
                break;
      case 2:
        Body=  <About handleStep={this.handleStep}  termsConditionClaim = {this.state.termsConditionClaim}/>;
        break;
      case 3:
        Body= <DappTc setTermsCondition = {this.setTermsCondition} termsConditionClaim = {this.state.termsConditionClaim} handleStep={this.handleStep}  />;
        break;
      case 4:
        Body= <AddName  setName = {this.setName} handleStep={this.handleStep}   nickNameClaim = {this.state.nickNameClaim}/>;
        break;
      case 5:
        Body= <DappRoulette handleStep={this.handleStep} setMascot={this.setMascot} mascotCounter={this.state.mascotCounter} mascotComplete = {this.mascotComplete}/>;
        break;
      case 6:
        Body= <Mascot handleStep={this.handleStep}
                finalDone = {this.state.finalDone}
                mascotFinalConfirn={this. mascotFinalConfirn}
                datumAddress={this.state.datumAddress}
                mascotNb={this.state.mascotNb}
                mascotName = {this.state.mascotName}/> ;
                break;
      default:
        return
	             Body= <Home handleStep={this.handleStep}
                mascotCreated={this.state.mascotCreated}
                finalDone={this.state.finalDone}
                initDone={this.state.initDone} /> ;
    }

    return (
         <div className='container'>
         {Header}
         {Body}
         </div>

    );

  }
}

export default App;
