import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import Language from './language';


export default  class addName extends Component {

  constructor(props) {
   super(props);

   this.state = {
             name:'',
             modalVisible: false,
             errors:false,
             validName:false
           }

   }

 next=()=>{this.props.handleStep("up");}
 onOpenModal = () => {
   //skip Modal if nickNameClaim true
   (!this.props.nickNameClaim)?this.setState({ modalVisible: true }):this.next();
 };

 onCloseModal = () => {this.setState({ modalVisible: false });};


   //TextInput Event
   handleName=(event)=>{
    let name =event.target.value;
    let  regrex=/[^a-z]/gi;
    let  checkName=regrex.test(name);
    //checkName for errors and display error Message;
    if (checkName){
       this.setState({ errors:true });
       this.setState({ validName:false });
    }else{
       this.setState({ name:name });
       this.props.setName(name);
       this.setState({ errors:false });
       (name.length>0)? this.setState({ validName:true }):this.setState({ validName:false });
   }
   }


  render() {
    const modalstyles = {modal: {
        'background':'transparent',
    'max-width': "50px",
    'width': "100px",
    'margin':'0 auto',
    'padding':'0',
    'margin-left':'38.5%',
    'margin-top':'50px',
    'box-shadow':'none'
  }
};

    return(
       <React.Fragment>
       <div className='mascotName'>
         <div className="nameCard">
           <p id="nameTitle">{Language.textAppsTitle}</p>
           <img src="./assets/img/mascotb.png" alt="mascot"/>

           <p id="nameText1">{Language.cardText1}</p>
           <input type="text" placeholder={Language.placeholder} maxlength="32" value={this.state.value} onChange={this.handleName}/>
           {this.state.errors && <p id="errorMsg">{Language.errorMsg}</p>}
           {this.state.validName && <a id="nameButton" onClick={this.onOpenModal}>{Language.cardText2}</a>}
         </div>
       </div>

      <Modal open={this.state.modalVisible} center showCloseIcon={false} styles={modalstyles} >
      <div className='modalName'>
      <div className="modalCard">
        <p id="modalTitle">{Language.overlayTitle}</p>
        <p id="modalText1">{Language.overlayText1}</p>
        <p id="modalText2">{Language.overlayText2}</p>
        <p id="modalText3"> <i className="fa fa-exclamation-circle"></i> {Language.overlayText3}</p>
        <a id="modalContinue" onClick={this.next}>{Language.overlayText4}</a>
        <a id="modalCancel"   onClick={this.onCloseModal}>{Language.overlayText5}</a>
      </div>
      </div>
      </Modal>
      </React.Fragment>
    );
  }

}
