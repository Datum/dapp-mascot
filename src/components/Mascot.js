import React, { Component } from 'react';
import Clock from 'react-live-clock';
import Button from 'react-bootstrap-button-loader';
import { SvgM1, SvgM2, SvgM3, SvgM4, SvgM5, SvgM6, SvgM7, SvgM8, SvgM9, SvgM10, SvgM11 } from './mascot';
import Language from './language';



export default class Mascot extends Component {



    componentWillMount() {
    console.log('final masco', this.finalDone);
    if(!this.props.finalDone) this.props.mascotFinalConfirn();
  }



 back=()=>{
  this.props.handleStep(1);
}
  render() {

    const color = this.props.datumAddress.substring(this.props.datumAddress.length-6);
    const mascotColor='#'+color;
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
          <p onClick={this.back}><i className="fa fa-chevron-left ic"></i> {Language.finalText1} </p>
          <p className="menuB">{Language.logo}</p>
        </div>

        <div className='mascotFinal'>
           <div className="finalCard">
             <p id="finalTitle">{Language.overlayText7}</p>

             <div className="mascotSvg">

             {this.props.mascotNb === 1 && <SvgM1 color={mascotColor}  />}
             {this.props.mascotNb === 2 && <SvgM2 color={mascotColor}  />}
             {this.props.mascotNb === 3 && <SvgM3 color={mascotColor}  />}
             {this.props.mascotNb === 4 && <SvgM4 color={mascotColor}  />}
             {this.props.mascotNb === 5 && <SvgM5 color={mascotColor}  />}
             {this.props.mascotNb === 6 && <SvgM6 color={mascotColor}  />}
             {this.props.mascotNb === 7 && <SvgM7 color={mascotColor}  />}
             {this.props.mascotNb === 8 && <SvgM8 color={mascotColor}  />}
             {this.props.mascotNb === 9 && <SvgM9 color={mascotColor}  />}
             {this.props.mascotNb === 10 && <SvgM10 color={mascotColor}/>}
             {this.props.mascotNb === 11 && <SvgM11 color={mascotColor}/>}

             </div>
             <p id="finalText1" style={{color:mascotColor}}>{this.props.mascotName}</p>
             <p id="finalText2" style={{color:mascotColor}}>{color}</p>
             <p id="finalText3" style={{color:mascotColor}}>{Language.finalText2}</p>

           </div>
         </div>

      </div>
    );
  }

}
