import React from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import DiceTray from '../components/diceTray';
import RollButton from '../components/diceRollButton';
import Dice from '../services/dice';
import Style from '../services/style';
import Images from '../res';
import {setDice} from '../actions/dice';
import {setValue} from '../actions/spin';

var DiceView = React.createClass({
    dice: null,
    onDieChanged(e) {
        let die = this.dice.dieEx(e);
        die.increment(true);
        this.props.dice[e-1].value = die.value();
        this.props.setDice(this.props.dice);
        if (this.props.spinfollow) {
            let v = die.value();
            if (v == 0 && this.props.zero) {
                v = 10;
            }            
            this.props.setValue(v, 0);//e-1);
        }        
    },
    onDiceRoll() {
        this.dice.roll();
        this.dice.dice().forEach((die,i) => this.props.dice[i].value = die.value);        
        this.props.setDice(this.props.dice);
        if (this.props.spinfollow) {
            let v = this.props.dice[0].value;
            if (v == 0 && this.props.zero) {
                v = 10;
            }
            
            this.props.setValue(v, 0);
        }
    },    
    render() {
        this.dice = new Dice.Dice(this.props.dice.map((d) => {
            return {num: 1, low: Dice.low(d.sides), high: Dice.high(d.sides), color: d.diecolor, dotcolor: d.dotcolor}
        }));
        return (
            <Image source={Images.dicetable} resizeMode={'stretch'} style={{
                flex: 1,
                alignItems: 'center', justifyContent: 'center',
                width: null,
                height: null,
                backgroundColor: 'transparent'
            }}>           
                <View style={{flex: 5, justifyContent: 'center', alignItems: 'center'}}>
                    <DiceTray size={Style.Scaling.scale(64)} dice={this.dice} values={this.dice.map((d,i) => this.props.dice[i].value)} onDie={this.onDieChanged}/>
                </View>
                <View style={{flex:2, flexDirection:'row', alignItems: 'center', marginBottom: 20}}>
                    <View style={{flex:1}} />
                    <View style={{flex:1}}>
                        <RollButton direction={'vertical'} onRoll={this.onDiceRoll} />
                    </View>
                    <View style={{flex:1}} />
                </View>
            </Image>
        );
    }
});

const mapStateToProps = (state) => ({    
    dice: state.dice.dice,
    zero: state.dice.zero,    
    spinfollow: state.spin.followdice
});

const mapDispatchToProps =  ({setDice,setValue});

module.exports = connect(
  mapStateToProps, 
  mapDispatchToProps
)(DiceView);
