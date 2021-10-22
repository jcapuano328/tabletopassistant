import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Style from '../services/style';
import DiceView from './diceView';
import OddsView from './oddsView';
import SpinnerView from './spinnerView';
import Base6View from './base6View';

var MainView = React.createClass({
    render() {
        return (
            <View style={{flex: 1, marginTop: Style.Scaling.scale(44)}}>
                {this.renderDice()}
                {this.renderBase6()}
                {this.renderOdds()}
                {this.renderSpin()}
            </View>
        );
    },
    renderDice() {
        if (this.props.dice && this.props.dice.enabled) {
            return (
                <View style={{flex:4}}>
                    <DiceView />
                </View>
            );            
        }
        return null;
    },
    renderBase6() {        
        if (this.props.base6 && this.props.base6.enabled) {
            return (                                                    
                <View style={{flex:1}}>
                    <Base6View />
                </View>                
            );            
        }
        return null;
    },
    renderOdds() {
        if (this.props.odds && this.props.odds.enabled) {
            return (                                                    
                <View style={{flex:1}}>
                    <OddsView />
                </View>                
            );            
        }
        return null;
    },
    renderSpin() {
        if (this.props.spin && this.props.spin.enabled) {
            return (                                                    
                <View style={{flex:1}}>
                    <SpinnerView />
                </View>                
            );            
        }
        return null;
    }    
});

const mapStateToProps = (state) => ({
    dice: state.dice,
    odds: state.odds,
    spin: state.spin,    
    base6: state.base6
});

module.exports = connect(
  mapStateToProps
)(MainView);
