import React, { Component } from 'react';
import Clock from 'react-live-clock';
import Button from 'react-bootstrap-button-loader';
import Roulette from './Roulette';
import Language from './language';
import { SvgM1, SvgM2, SvgM3, SvgM4, SvgM5, SvgM6, SvgM7, SvgM8, SvgM9, SvgM10, SvgM11 } from './mascot';
import Modal from 'react-responsive-modal';



export default class dappRoulette extends Component {

  constructor(props) {
    super(props);
    this.state = {

            modalVisible: false,
            mascotNb:0

    }

  }

    onOpenModal = () => {

   //skip Modal if nickNameClaim true
   this.setState({ modalVisible: true });
 };

 onCloseModal = () => {
   this.setState({ modalVisible: false });
 };



   handleOnComplete = (value) => {
     console.log(value);

    //Special mascot set to 11
   ((this.props.mascotCounter != 0) && (this.props.mascotCounter%100 === 0))?this.props.setMascot(11):this.props.setMascot(value);
   ((this.props.mascotCounter != 0) && (this.props.mascotCounter%100 === 0))?this.setState({mascotNb:11}):this.setState({mascotNb:value});
   this.props.mascotComplete();
   this.onOpenModal();
  //

};

  next=()=>{
   this.props.handleStep("up");
 }


  render() {



  const options = [1,2,3,4,5,6,7,8,9,10];
  const mascotColor= "grey";
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
      <div>
      <div className='container'>
      <div className='header'>
        <ul className='menuL'>
          <li><i className="fa fa-signal"></i></li>
          <li><i className="fa fa-wifi"></i></li>
        </ul>
        <p className="menuC"><Clock format={'HH:mm'} ticking={true} timezone={'Asia/Hong_kong'} /></p>
        <ul className='menuR'>
          <li><i className="fa fa-bluetooth"></i></li>
          <li>{Language.textFull}</li>
          <li><i className="fa fa-battery-full"></i></li>
        </ul>

        <p className="menuB">{Language.logo}</p>
      </div>
      <div className='roulette'>
         <div className="rouletteCard">
           <p id="rouletteTitle">{Language.textAppsTitle}</p>

            <Roulette options={options} baseSize={300} onComplete={this.handleOnComplete}/>


         </div>
       </div>
      </div>


      <Modal open={this.state.modalVisible} center showCloseIcon={false} styles={modalstyles} >
        <div class='container'>

  <div class='modalMascot'>
     <div class="modalCard">
       <p id="modalTitle">{Language.overlayText7}</p>

       <div class="mascotSvg">
             {this.state.mascotNb === 1 && <SvgM1 color={mascotColor}  />}
             {this.state.mascotNb === 2 && <SvgM2 color={mascotColor}  />}
             {this.state.mascotNb === 3 && <SvgM3 color={mascotColor}  />}
             {this.state.mascotNb === 4 && <SvgM4 color={mascotColor}  />}
             {this.state.mascotNb === 5 && <SvgM5 color={mascotColor}  />}
             {this.state.mascotNb === 6 && <SvgM6 color={mascotColor}  />}
             {this.state.mascotNb === 7 && <SvgM7 color={mascotColor}  />}
             {this.state.mascotNb === 8 && <SvgM8 color={mascotColor}  />}
             {this.state.mascotNb === 9 && <SvgM9 color={mascotColor}  />}
             {this.state.mascotNb === 10 && <SvgM10 color={mascotColor}/>}
             {this.state.mascotNb === 11 && <SvgM11 color={mascotColor}/>}
 </div>




       <a id="modalContinue" onClick={this.next}>{Language.overlayText6}</a>

     </div>
   </div>

  </div>
 </Modal>

      </div>
    );
  }

}
