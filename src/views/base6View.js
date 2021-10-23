import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import Style from '../services/style';
import Button from '../widgets/button';
import {setDice} from '../actions/dice';
import {add} from '../services/base6';
import range from '../services/range';

var Base6View = React.createClass({
    onChange(number, key) {
        return () => {     
            //console.log('***********', number, key);
            //{sides: int, diecolor: string, dotcolor: string, value: int}
            let realdice = [];
            this.props.dice.forEach((d, i) => {
                if (d.dotcolor != 'space' && d.dotcolor != 'support') {
                    realdice.push(i);
                }
            });
            //console.log('***********', realdice);
            range(this.props.number).forEach((n,i) => {
                let i1 = realdice.shift();
                let i2 = realdice.shift();
                if (n != number) {
                    return;
                }
                if (i1 != undefined) {
                    let d1 = this.props.dice[i1].value;
                    if (i2 != undefined) {
                        let d2 = this.props.dice[i2].value;
                        let d = add((d1 * 10) + d2, key);
                        d1 = Math.floor(d / 10);
                        d2 = d % 10;
                        
                        this.props.dice[i1].value = d1;
                        this.props.dice[i2].value = d2;
                    } else {
                        d1 += key;
                        if (d1 < 1) {
                            d1 = 1;
                        } else if (d1 > this.props.dice[i1].sides) {
                            d1 = this.props.dice[i1].sides;
                        }
                        this.props.dice[i1].value = d1;
                    }
                }
            });

            this.props.setDice(this.props.dice);
        }
    },
    render() {
        let padvertical = 2;
        let padhorizontal = 3;
        return (
            <View style={{flex:1, backgroundColor: 'gainsboro',paddingLeft:3, paddingRight:3,alignItems:'center',justifyContent:'center'}}>
                {range(this.props.number).map((v,i) => 
                    <View key={i} style={{flex: 1, flexDirection:'row'}}>
                        <View style={{flex:1, paddingTop: Style.Padding.pad(padvertical), paddingBottom: Style.Padding.pad(padvertical), paddingLeft: Style.Padding.pad(padhorizontal), paddingRight: Style.Padding.pad(padhorizontal)}}>
                        <Button buttonBackgroundColor={this.buttonColor(i)} labelTextColor={'white'} label={'-6'} onPress={this.onChange(i,-6)}/>
                        </View>
                        <View style={{flex:1, paddingTop: Style.Padding.pad(padvertical), paddingBottom: Style.Padding.pad(padvertical), paddingLeft: Style.Padding.pad(padhorizontal), paddingRight: Style.Padding.pad(padhorizontal)}}>
                        <Button buttonBackgroundColor={this.buttonColor(i)} labelTextColor={'white'} label={'-3'} onPress={this.onChange(i,-3)}/>
                        </View>
                        <View style={{flex:1, paddingTop: Style.Padding.pad(padvertical), paddingBottom: Style.Padding.pad(padvertical), paddingLeft: Style.Padding.pad(padhorizontal), paddingRight: Style.Padding.pad(padhorizontal)}}>
                        <Button buttonBackgroundColor={this.buttonColor(i)} labelTextColor={'white'} label={'-1'} onPress={this.onChange(i,-1)}/>
                        </View>
                        <View style={{flex:1, paddingTop: Style.Padding.pad(padvertical), paddingBottom: Style.Padding.pad(padvertical), paddingLeft: Style.Padding.pad(padhorizontal), paddingRight: Style.Padding.pad(padhorizontal)}}>
                        <Button buttonBackgroundColor={this.buttonColor(i)} labelTextColor={'white'} label={'+1'} onPress={this.onChange(i,1)}/>
                        </View>
                        <View style={{flex:1, paddingTop: Style.Padding.pad(padvertical), paddingBottom: Style.Padding.pad(padvertical), paddingLeft: Style.Padding.pad(padhorizontal), paddingRight: Style.Padding.pad(padhorizontal)}}>
                        <Button buttonBackgroundColor={this.buttonColor(i)} labelTextColor={'white'} label={'+3'} onPress={this.onChange(i,3)}/>
                        </View>
                        <View style={{flex:1, paddingTop: Style.Padding.pad(padvertical), paddingBottom: Style.Padding.pad(padvertical), paddingLeft: Style.Padding.pad(padhorizontal), paddingRight: Style.Padding.pad(padhorizontal)}}>
                        <Button buttonBackgroundColor={this.buttonColor(i)} labelTextColor={'white'} label={'+6'} onPress={this.onChange(i,6)}/>
                        </View>                
                    </View>                    
                )} 
            </View>
        );
    },
    buttonColor(i) {
        switch(i) {
            case 0:
                return 'blue';
            case 1:
                return 'goldenrod';
            case 2:
                return 'sienna';
            case 3:
                return 'olive';
            case 4:
                return 'gray';
                            
            default:
                return 'blue';
        }
    }
});


const mapStateToProps = (state) => ({
    dice: state.dice.dice,
    number: state.base6.number
});

const mapDispatchToProps =  ({setDice});

module.exports = connect(
  mapStateToProps, 
  mapDispatchToProps
)(Base6View);