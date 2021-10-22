import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import {CheckBox,SpinNumeric} from '../widgets';
//import Spinner from 'rn-spinner';
import Style from '../services/style';
import {setEnabled,setNumber} from '../actions/base6';

var ConfigurationBase6View = React.createClass({
    onEnabledChanged(v) {
        this.props.setEnabled(v);
    },
    onNumberChanged(v) {        
        this.props.setNumber(+v);        
    },    
    render() {        
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: Style.Font.large(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Base6 Modifiers</Text>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <CheckBox label={'Enabled'} selected={this.props.enabled} onSelected={() => this.onEnabledChanged(!this.props.enabled)} />
                    </View>
                    <View style={{flex:2, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <SpinNumeric value={(this.props.number||1).toString()} min={1} max={10} onChanged={this.onNumberChanged} />
                        {/*
                        <Spinner max={10} min={1} default={this.props.number} onNumChange={this.onNumberChanged} />
                        */}          
                    </View>
                    <View style={{flex:1}}/>
                </View>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    enabled: state.base6.enabled,
    number: state.base6.number
});

const mapDispatchToProps =  ({setEnabled,setNumber});

module.exports = connect(
  mapStateToProps, 
  mapDispatchToProps
)(ConfigurationBase6View);