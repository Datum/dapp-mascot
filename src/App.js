import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Datum from 'datum-sdk';
import Home from './components/Home';
import About from './components/About';
import DappTc from './components/DappTc';
import AddName from './components/AddName';
import DappRoulette from './components/dappRoulette';
import Mascot from './components/Mascot';
import Fuse from 'datum-fuse';




const PASSWORD = 'password';
class App extends Component {
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
    finalDone:false,
    currentStep:1,
    publicKey:'',
    encryptionKey:''
  }

}
  componentWillMount() {
  this.init();
    }

    handleStep=(next)=>{
       console.log('next')
      if(next==='up'){
        this.setState({currentStep:this.state.currentStep+1});
      }else if(next==='back'){
        this.setState({currentStep:this.state.currentStep-1});
      }else{
        this.setState({currentStep:next});
      }



    }
    //Handle State Name event
    setName=(name)=>{
     console.log('set name',name);
     this.setState({mascotName: this.capitalize(name)});

    }

    capitalize=(string)=> {
     return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //When enable you will go directly to the last screen
    mascotComplete=()=>{
     console.log('valid new mascot');
     this.setState({mascotCreated:true});

    }
    //Save Counter new Mascot and NickName Claim if needed to Datum
    mascotFinalConfirn=()=>{
       console.log(' mascot final confirm');

       const data = this.state.mascotCounter + 1;
       const keyname = 'mascot_counter';

       //Update Datum  Counter
       if(this.state.mascotCounter === 0){
         console.log('first mascot ');
         this.setData(data,keyname,this.saveMascot);
        }else{
         this.datum.removeByKey('mascot_counter').then((res)=>{
         this.setData(data,keyname,this.saveMascot);
         //Update Counter
         this.setState({mascotCounter: this.state.mascotCounter + 1});
         }). catch(error => {
         console.log('remove old key error',error);
         });
       }
    }

    //Save Mascot to Datum
    saveMascot=()=>{
      console.log('save mascot',this.state.mascotCounter);

      const data = this.state.mascotCounter + 1;
      const keyname = 'mascot_'+data;

     (this.state.nickNameClaim)?this.setData({mascot:this.state.mascotNb},keyname, this.confirmMascot):
     this.setData({mascot:this.state.mascotNb},keyname, this.setNickName);
    }

    //Set mascotNb selected by Roulette Spin
    setMascot=(spinNb)=>{
       console.log('set mascot',spinNb);
     this.setState({mascotNb:spinNb});
    }

    //Get Datum data
    getData=(keyname,callback)=>{
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
    setData=(data,keyname,callback)=>{
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


 handleOnComplete= (value)=> {
  console.log(value);
};


   //Save T&C Claim to Datum
  setTermsCondition=()=>{
     console.log('t&C claim');

     const data = 'I agree to the terms and conditions of this app';
     const keyname = 'tnc_claim';
     this.setData(data,keyname,this.confirmTncClaim);

 }//end tncclaim

   //Save nickNameClaim to Datum
    setNickName=()=>{
     console.log('nickname claim');

     const data = '"Datum Mascot would like to write and have access to the following data: NickName';
     const keyname = 'nickname_claim';
     this.setData(data,keyname,this.confirmNickNameClaim);
    }


    confirmTncClaim=()=>{
      console.log('tnc Ok');
    }

    confirmNickNameClaim=()=>{
      console.log('nickname Ok');
      this.setState({finalDone:true});
    }

    confirmMascot=()=>{
      console.log('save mascot Ok');
      this.setState({finalDone:true});
    }

    initTnc=()=>{
      console.log('initTnc after tnc Claim');
      this.getData('nickname_claim', this.initCounter);
    }

    initCounter=()=>{
       console.log('initCounter after NickName Claim');
     this.getData('mascot_counter', this.initDone);
    }

    initDone=()=>{
      console.log('init completed Ok');
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

                   setTimeout(
     function() {
       this.datum.deposit(100).then((res)=>{
              console.log('deposit Ok',res);
              this.getData('tnc_claim', this.initTnc);
               }). catch(error => {
     console.log('deposit error',error);
   });
     }
     .bind(this),
     9000
 );

         }). catch(error => {

 			    console.log('faucet error',error);
 		});
     //console.log('init done',obj);


 await this.datum.getIdentityPublicKey().then((res)=>{
console.log("Public Key: ", res,"\n");
this.setState({publicKey:res});
});

await this.datum.getEncryptionPublicKey().then((res)=>{
console.log("Public Encryption Key: ", res,"\n");
this.setState({encryptionKey:res});
});

//const fuse = new Fuse();

//fuse.init(this.state.publicKey, this.state.encryptionKey, this.state.address);

/*const statement = 'I agree to the terms and conditions of this app';
const dataToUse = ['EMAIL'];
const keyname = ['email_claim'];

const call = await fuse.requestData(statement, dataToUse, keyname).then((res)=>{
  console.log('ok',res);
});*/
//onst userAddress = await fuse.requestWallet();

//console.log(userAddress);


}//end init


  render() {


    switch (this.state.currentStep) {
      case 1:
        return <Home handleStep={this.handleStep}
                mascotCreated={this.state.mascotCreated}
                finalDone={this.state.finalDone}
                mascotCreated={this.state.mascotCreated}
                initDone={this.state.initDone} /> ;
      case 2:
        return  <About handleStep={this.handleStep}  />;
      case 3:
        return <DappTc setTermsCondition = {this.setTermsCondition} termsConditionClaim = {this.state.termsConditionClaim} handleStep={this.handleStep}  />;
      case 4:
        return <AddName  setName = {this.setName} handleStep={this.handleStep}   nickNameClaim = {this.state.nickNameClaim}/>;
      case 5:
        return <DappRoulette handleStep={this.handleStep} setMascot={this.setMascot} mascotCounter={this.state.mascotCounter} mascotComplete = {this.mascotComplete}/>;
      case 6:
        return <Mascot handleStep={this.handleStep}
                finalDone = {this.state.finalDone}
                mascotFinalConfirn={this. mascotFinalConfirn}
                datumAddress={this.state.datumAddress}
                mascotNb={this.state.mascotNb}
                mascotName = {this.state.mascotName}/> ;
      default:
        return  <Home handleStep={this.handleStep}
                mascotCreated={this.state.mascotCreated}
                finalDone={this.state.finalDone}
                mascotCreated={this.state.mascotCreated}
                initDone={this.state.initDone} /> ;
    }



  }
}

export default App;
