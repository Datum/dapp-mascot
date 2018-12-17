import React, { Component } from 'react';
import Clock from 'react-live-clock';
import Button from 'react-bootstrap-button-loader';
import Language from './language';



export default class DappTc extends Component {

  static svgIcon() {
  return (
    <span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 50 50">
        <path
          style={{
            fill: 'rgb(41, 128, 185)',
            textIndent:0,
            textAlign:'start',
            lineHeight: 'normal',
            textTransform: 'none',
            blockProgression: 'tb',
            InkscapeFontSpecification: 'Bitstream Vera Sans',
          }}
          d="M25,47.302l-0.64-0.533c-1.217-1.015-2.861-2.115-4.765-3.39C12.169,38.408,2,31.601,2,20C2,12.832,7.832,7,15,7 c3.896,0,7.542,1.734,10,4.699C27.458,8.734,31.104,7,35,7c7.168,0,13,5.832,13,13c0,11.601-10.169,18.408-17.595,23.379 c-1.904,1.274-3.548,2.375-4.765,3.39L25,47.302z"
          overflow="visible"
          enableBackground="accumulate"
          fontFamily="Bitstream Vera Sans"
        />
      </svg>
    </span>
  );
}


  constructor(props) {
  super(props);
    this.state = {
      checked:false,
      disabled: false,
      forceLoading: false,
      loading: 0,
      showIcon: true,
      spinColor: '#fff',
      style: 'default',

  };

}

//Handle Checked Box Event
handleTnc=()=>{
  console.log('claim tnc')
  this.setState({checked: !this.state.checked});
  if(!this.props.termsConditionClaim && !this.state.checked ) this.props.setTermsCondition();
}

  next=()=>{
   this.props.handleStep("up");
 }

 back=()=>{
  this.props.handleStep("back");
}
  render() {

    const styleButton ={display:'flex',
                        background: 'transparent',
                        border:'none',
                        width:'100%',
                        margin:0,
                        padding:0,
                        paddingLeft:'1rem',
                        color:'#fff' };

    return(
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
        <p onClick={this.back}><i className="fa fa-chevron-left ic"></i> </p>
        <p className="menuB">{Language.logo}</p>
      </div>
      <div className='dappTc'>
         <div className="tcCard">
           <p id="tcTitle">{Language.textTCTitle}</p>

           <p id="tcText1">{Language.textTC1}</p>
           <ul>
           <li>{Language.textTC2}</li>
           <li>{Language.textTC3}</li>
           <li>{Language.textTC4}</li>
           </ul>

           <div className="tcAgree">
           <label className="container">
           <input type="checkbox"  onChange={this.handleTnc }/>
           <span className="checkmark"></span>
           </label>
           <p>{Language.textTC5}</p>
           </div>

           {this.state.checked &&<a id="tcButton">         <Button
             bsStyle={this.state.bsStyle}
             disabled={this.state.disabled}
             icon={this.state.showIcon ? this.constructor.svgIcon() : null}
             loading={!this.props.termsConditionClaim}
             onClick={this.next}
             spinColor={this.state.spinColor}
             style={styleButton}
           >
            {Language.textTC6}
           </Button></a>}

         </div>
       </div>

      </div>
    );
  }

}
