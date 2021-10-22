import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import {CheckBox,RadioButtonGroup} from '../widgets';
//import Spinner from 'rn-spinner';
import Style from '../services/style';
import {setEnabled,setRound,setRoundMethod} from '../actions/odds';

var ConfigurationOddsView = React.createClass({
    methods: [        
        {desc:'Up', value: 'up'},
        {desc:'Std', value: 'std'},
        {desc:'Down', value: 'down'}
    ],
    onEnabledChanged(v) {
        this.props.setEnabled(v);
    },
    onRoundChanged(v) {
        this.props.setRound(v);
    },
    onRoundMethodChanged(v) {
        this.props.setRoundMethod(v);
    },
    render() {        
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: Style.Font.large(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Odds</Text>
                <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <CheckBox label={'Enabled'} selected={this.props.enabled} onSelected={() => this.onEnabledChanged(!this.props.enabled)} />
                    <CheckBox label={'Round'} selected={this.props.round} onSelected={() => this.onRoundChanged(!this.props.round)} />
                    <RadioButtonGroup buttons={this.methods.map((r) => ({label:r.desc, value: r.value}))} 
                            state={this.props.method}
                            onSelected={this.onRoundMethodChanged} />                                
                </View>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    enabled: state.odds.enabled,
    round: state.odds.round,
    method: state.odds.method
});

const mapDispatchToProps =  ({setEnabled,setRound,setRoundMethod});

module.exports = connect(
  mapStateToProps, 
  mapDispatchToProps
)(ConfigurationOddsView);