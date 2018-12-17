import React, { Component } from 'react';
import Clock from 'react-live-clock';
import Button from 'react-bootstrap-button-loader';
import Language from './language';



export default class About extends Component {


  next=()=>{
   this.props.handleStep("up");
 }

 back=()=>{
  this.props.handleStep("back");
}
  render() {
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
      <div className='about'>
         <div className="aboutCard">
           <p id="abouttitle">{Language.textAppsTitle}</p>
            <img src="./assets/img/mascotb.png"/>
           <p id="aboutText1">{Language.textAbout1}</p>
           <p id="aboutText2">{Language.textAbout2}</p>
           <p id="aboutText3">{Language.textAbout3}</p>
           <p id="aboutText4">{Language.textAbout4}</p>
           <a id="aboutButton" onClick={this.next}>{Language.textAboutButton}</a>
         </div>
       </div>

      </div>
    );
  }

}
