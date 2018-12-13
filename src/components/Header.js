// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

// Make a component

const Test =()=>{
  return (<Text onPress={ () => props.goToPage(0) }> <Icon
                    color="green"
                    name="chevron-left"
                    size={14}
                      onPress={ () => props.goToPage(props.activeTab-1) }
                    /> APP</Text>);
}

const HeaderC= (props) => {
  const { textStyle, viewStyle } = styles;
  console.log('activeTab',props.activeTab);



if(props.activeTab===0 || props.activeTab===4){
  return (
    <View style={viewStyle}>

    <Header

  centerComponent={{ text: props.headerText, style: { color: '#fff' } }}
  containerStyle={{
    backgroundColor: '#329bff',
    borderColor:'transparent',
    borderWidth:0,
    borderBottomColor:'transparent'
  }}

/>
    </View>
  );
}

if(props.activeTab>=0 && props.activeTab!=4 && props.activeTab<5){
  return (
    <View style={viewStyle}>

    <Header
  leftComponent=    <Icon
                    color="#fff"
                    name="chevron-left"
                    size={17}
                      onPress={ () => props.goToPage(props.activeTab-1) }
                    />
  centerComponent={{ text: props.headerText, style: { color: '#fff' } }}
    containerStyle={{
    backgroundColor: '#329bff',
    borderColor:'transparent',
    borderWidth:0,
    borderBottomColor:'transparent'
  }}

/>
    </View>
  );
}

if(props.activeTab===5){
  return (
    <View style={viewStyle}>

    <Header
  leftComponent=<Text onPress={ () => props.goToPage(0) } style={{color:'#fff'}}> <Icon
                    color="#fff"
                    name="chevron-left"
                    size={17}
                      onPress={ () => props.goToPage(props.activeTab-1) }
                    /> App</Text>
  centerComponent={{ text: props.headerText, style: { color: '#fff' } }}
    containerStyle={{
    backgroundColor: '#329bff',
    borderColor:'transparent',
    borderWidth:0,
    borderBottomColor:'transparent'
  }}

/>
    </View>
  );
}

return (
  <View style={viewStyle}>

  <Header

centerComponent={{ text: props.headerText, style: { color: '#fff' } }}
  containerStyle={{
    backgroundColor: '#329bff',
    borderColor:'transparent',
    borderWidth:0,
    borderBottomColor:'transparent'
  }}

/>
  </View>
);


};

const styles = {
  viewStyle: {
    backgroundColor: '#3ba4ff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    paddingTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    borderColor:'black',
    marginBottom:5
  },
  textStyle: {
    fontSize: 20
  }
};

// Make the component available to other parts of the app
export default HeaderC;
