import React from 'react';
import { View, ScrollView } from 'react-native';
import Style from '../services/style';
import ConfigurationDiceView from './configurationDiceView';
import ConfigurationSpinView from './configurationSpinView';
import ConfigurationOddsView from './configurationOddsView';
import ConfigurationCalculatorView from './configurationCalculatorView';
import ConfigurationBase6View from './configurationBase6View';

var ConfigurationView = React.createClass({
    render() {
        return (
            <View style={{flex: 1, marginTop: Style.Scaling.scale(44)}}>
                <View style={{flex:3}}>
                    <ConfigurationDiceView />
                </View>
                <View style={{flex:1}}>
                    <ConfigurationBase6View />
                </View>     
                <View style={{flex:1}}>
                    <ConfigurationCalculatorView />
                </View>                
                <View style={{flex:1}}>
                    <ConfigurationOddsView />
                </View>
                <View style={{flex:1}}>
                    <ConfigurationSpinView />
                </View>     
            </View>
        );
    }
});

module.exports = ConfigurationView;
