import React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Dimensions} from 'react-native';

const SvgM11 = props => (
  <Svg viewBox="0 0 512 512" width={ hp('67.5%')}  height={ hp('49%')} {...props}>
    <G fill={props.color} >
      <Path d="M60.427 84.035l50.204 50.204 23.609-23.609-50.205-50.203-23.608 23.608zM427.965 60.427l-50.204 50.204 23.609 23.609 50.203-50.205-23.608-23.608z" />
    </G>
    <Path
      d="M256 512C114.843 512 0 412.135 0 289.391S114.843 66.783 256 66.783s256 99.864 256 222.609S397.157 512 256 512z"
      fill={props.color}
    />
    <Path
      d="M512 289.391c0-122.744-114.843-222.609-256-222.609V512c141.157 0 256-99.865 256-222.609z"
      fill="#6dc82a"
    />
    <Path
      d="M256 133.565c-67.511 0-122.435 54.934-122.435 122.435S188.489 378.435 256 378.435 378.435 323.5 378.435 256 323.511 133.565 256 133.565z"
      fill="#dcf4ca"
    />
    <Path
      d="M378.435 256c0-67.501-54.924-122.435-122.435-122.435v244.87c67.511 0 122.435-54.935 122.435-122.435z"
      fill="#b6e892"
    />
    <Circle cx={256} cy={256} r={55.652} fill="#806749" />
    <Path
      d="M311.652 256c0-30.736-24.917-55.652-55.652-55.652v111.304c30.736 0 55.652-24.916 55.652-55.652z"
      fill="#5f4d37"
    />
    <Path
      d="M272.696 256c-9.208 0-16.696-7.492-16.696-16.696s7.487-16.696 16.696-16.696c9.208 0 16.696 7.492 16.696 16.696S281.904 256 272.696 256z"
      fill="#fff"
    />
    <Path
      d="M322.783 445.217H200.348c-9.223 0-16.696-7.473-16.696-16.696s7.473-16.696 16.696-16.696h122.435c9.223 0 16.696 7.473 16.696 16.696s-7.474 16.696-16.696 16.696z"
      fill="#5f4d37"
    />
    <Circle cx={50.087} cy={50.087} r={50.087} fill="#91dc5a" />
    <Path
      d="M100.174 50.087C100.174 22.424 77.749 0 50.087 0v100.174c27.662 0 50.087-22.425 50.087-50.087z"
      fill="#6dc82a"
    />
    <Circle cx={461.913} cy={50.087} r={50.087} fill="#91dc5a" />
    <Path
      d="M512 50.087C512 22.424 489.576 0 461.913 0v100.174c27.663 0 50.087-22.425 50.087-50.087z"
      fill="#6dc82a"
    />
  </Svg>
);

//export default SvgM5;

export { SvgM11 };
