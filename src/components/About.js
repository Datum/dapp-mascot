import React, { Component } from 'react';
import Language from './language';

export default class About extends Component {

  next=()=>{
   (this.props.termsConditionClaim)?this.props.handleStep(4):this.props.handleStep("up");
 }

  render() {
    return(
      <div className='about'>
         <div className="aboutCard">
           <p id="abouttitle">{Language.textAppsTitle}</p>
            <img src="./assets/img/mascotb.png" alt="mascot"/>
           <p id="aboutText1">{Language.textAbout1}</p>
           <p id="aboutText2">{Language.textAbout2}</p>
           <p id="aboutText3">{Language.textAbout3}</p>
           <p id="aboutText4">{Language.textAbout4}</p>
           <a id="aboutButton"  onClick={this.next}>{Language.textAboutButton}</a>
         </div>
       </div>


    );
  }

}
