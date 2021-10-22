import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Style from '../services/style';
import Dice from '../services/dice';
import Die from './die';
import RollButton from './diceRollButton';


var DiceRoll = React.createClass({
    dice: null,
    onRoll(e) {
      this.dice.roll();
      this.props.onRoll && this.props.onRoll(this.dice.dice());
    },
    onDie(e) {
      let die = this.dice.dieEx(e);
      die.increment(true);
      this.props.onDie && this.props.onDie(e, die.value());
    },
    render() {
        this.dice = new Dice.Dice(this.props.dice);
        return (
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center', marginRight:2}}>
                {this.dice.map((die, i) => {
                    if (i<this.props.values.length) {
                        die.value(this.props.values[i]);
                    }
                    return (                                    
                        <Die key={idx+1} 
                            die={idx+1} value={die.value()} sides={die.sides()}
                            size={this.props.size} diecolor={die.color().die} dotcolor={die.color().dot} 
                            onPress={this.onDie} 
                        />                                    
                    );
                })}
                <View style={{flex:1.25}}>
                    <RollButton buttonColor={this.props.buttonColor} buttonBackgroundColor={this.props.buttonBackgroundColor}
                        direction={this.props.direction} onRoll={this.onRoll} />
                </View>
            </View>
        );
    }
});

module.exports = DiceRoll;
