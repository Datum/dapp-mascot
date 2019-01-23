import React, { Component } from 'react';
import Button from 'react-bootstrap-button-loader';
import Language from './language';


class Home extends Component {

  constructor() {
  super();

  this.state = {
    disabled: false,
    forceLoading: false,
    loading: 0,
    showIcon: true,
    spinColor: '#fff',
    style: 'default',
  };
}

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



  next=()=>{(this.props.mascotCreated)?this.props.handleStep(6):this.props.handleStep("up");}

  render() {
    
    const styleButton ={display:'flex',
                        background: 'transparent',
                        border:'none',
                        width:'100%',
                        margin:0,
                        padding:0,
                        color:'#fff' };
    return (
   <div className='home'>
     <p id="Identity">{Language.textIndentity}</p>
     <div className="carda">
       <i className='fa'>&#xf2c2;</i>
       <p className="connected">{Language.textConnected}</p>
       <i className="fa fa-check ic"></i>
       <p>{Language.textDatumId}</p>
     </div>
     <div className="cardb">
       <i className='fa fa-envelope-open'></i>
       <p className="connected">{Language.textConnected}</p>
       <i className="fa fa-check ic"></i>
       <p>{Language.textEmail}</p>
     </div>
     <div className="dappCard">
       <p id="apps">{Language.textApps}</p>
       <p id="signin">{Language.textSignin}</p>
       <div className="mascotCard">
         <p id="mascotTitle">{Language.textAppsTitle}</p>
         <img src="./assets/img/mascot.png" alt="mascot"/>

         <a >         <Button
           bsStyle={this.state.bsStyle}
           disabled={this.state.disabled}
           icon={this.state.showIcon ? this.constructor.svgIcon() : null}
           loading={!this.props.initDone||(!this.props.finalDone&&this.props.mascotCreated)}
           onClick={this.next}
           spinColor={this.state.spinColor}
           style={styleButton}
         >
           {Language.textMascotButton}
         </Button></a>
       </div>
     </div>
     <div className="footer">
       <div id="plus">
         <i className="fa fa-plus-square"></i>
         <p>{Language.textApps}</p>
       </div>
       <div id="database">
         <i className="fa fa-database"></i>
         <p>{Language.textWallet}</p>
       </div>
       <div id="user">
         <i className="fa fa-user"></i>
         <p>{Language.textMe}</p>
       </div>
     </div>
    </div>



    );
  }
}

export default Home;
