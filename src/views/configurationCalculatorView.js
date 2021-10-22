import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import {RadioButtonGroup} from '../widgets';
import Style from '../services/style';
import {setMode} from '../actions/calculator';

var ConfigurationCalculatorView = React.createClass({
    modes: [        
        {desc:'Standard', value: 'std'},
        {desc:'Proportional', value: 'prop'}
    ],
    onModeChanged(v) {
        this.props.setMode(v);
    },
    render() {        
        return (
            <View style={{flex:1}}>
                <Text style={{fontSize: Style.Font.large(),fontWeight: 'bold',backgroundColor: 'silver', textAlign: 'center'}}>Calculator</Text>
                <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                    <RadioButtonGroup buttons={this.modes.map((r) => ({label:r.desc, value: r.value}))} 
                            state={this.props.mode}
                            onSelected={this.onModeChanged} />                                
                </View>
            </View>
        );
    }
});

const mapStateToProps = (state) => ({
    mode: state.calculator.mode
});

const mapDispatchToProps =  ({setMode});

module.exports = connect(
  mapStateToProps, 
  mapDispatchToProps
)(ConfigurationCalculatorView);