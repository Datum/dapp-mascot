import React  from 'react';
import Clock from 'react-live-clock';
import Language from '../language';



const HeaderF = (props) =>{

  const back=()=>{
  return  (props.currentStep===4 && props.termsConditionClaim===true)? props.handleStep(2):props.handleStep("back");
  }

   return (

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
       <p onClick={back}><i className="fa fa-chevron-left ic"></i> </p>
       <p className="menuB">{Language.logo}</p>
     </div>
   );

}

export {HeaderF};
