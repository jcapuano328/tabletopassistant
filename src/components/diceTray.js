import React from 'react';
import { View } from 'react-native';
import Style from '../services/style';
import Dice from '../services/dice';
import Die from './die';
import range from '../services/range';

var DiceTray = React.createClass({    
    onDie(e) {
      this.props.onDie && this.props.onDie(e);
    },
    render() {
        let minrows = 4;
        let perrow = Math.min(5, this.props.dice.count());//Math.ceil(this.props.dice.count() / rows);
        let rows = this.props.rows || Math.ceil(this.props.dice.count() / perrow);    
        let size = this.dieSize(rows);
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop:Style.Padding.pad(3), paddingBottom:Style.Padding.pad(3)}}>
                {range(rows).map((r,i) => {
                    return (
                        <View key={r} style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            {range(perrow).map((c,j) => {                                
                                let idx = (i*perrow)+j;  
                                let die = this.props.dice.dieEx(idx+1);
                                if (die == null) {
                                    return <View key={idx+1} style={{flex:1}} />
                                }
                                if (idx<this.props.values.length) {
                                    die.value(this.props.values[idx]);
                                }
                                return (                                    
                                    <Die key={idx+1} 
                                        die={idx+1} value={die.value()} sides={die.sides()}                                        
                                        size={size} diecolor={die.color().die} dotcolor={die.color().dot} 
                                        onPress={this.onDie} 
                                    />
                                );
                            })}
                        </View>
                    );
                })}
                {/*rows < minrows ? range(minrows-rows).map((r,i) => {
                    return (
                        <View key={minrows+r} style={{flex: 1}}>
                        </View>
                    );
                }) : null*/}
            </View>                
        );
    },
    dieSize(rows) {
        //return Style.Scaling.scale(64);// / rows;
        switch(rows) {
            case 1:
            case 2:
            case 3:
            case 4:
                return Style.Scaling.scale(64);
            default:
                return Style.Scaling.scale(48);
        }
    }
});

module.exports = DiceTray;
