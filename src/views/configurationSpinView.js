import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import {SpinNumeric,CheckBox} from '../widgets';
//import Spinner from 'rn-spinner';
import Style from '../services/style';
import {setEnabled,setNumber,setFollowDice} from '../actions/spin';

var ConfigurationSpinView = React.createClass({
    onEnabledChanged(v) {
        this.props.setEnabled(v);
    },
    onNumberChanged(v) {        
        this.props.setNumber(+v);        
    },    
    onFollowDiceChanged(v) {
        this.props.setFollowDice(v);
    },
    render() {
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: Style.Font.large(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Spinners</Text>
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
                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <CheckBox label={'Follow Dice'} selected={this.props.followdice} onSelected={() => this.onFollowDiceChanged(!this.props.followdice)} />
                    </View>
                </View>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    enabled: state.spin.enabled,    
    number: state.spin.number,
    followdice: state.spin.followdice
});

const mapDispatchToProps =  ({setEnabled,setNumber,setFollowDice});

module.exports = connect(
  mapStateToProps, 
  mapDispatchToProps
)(ConfigurationSpinView);