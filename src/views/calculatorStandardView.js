import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import IconButton from '../widgets/calculatorIconButton';
import Images from '../res';
import Style from '../services/style';
import {round2Fixed} from '../services/calculator';
import {setAttack,setDefend} from '../actions/odds';
import {setValue} from '../actions/spin';

const operationSymbol = (operation) => {
    switch(operation) {
        case 'add':
            return '+';            
        case 'subtract':
            return '-';
        case 'multiply':
            return 'x';
        case 'divide':
            return '/';                
    }
    return operation;
}


var CalculatorStandardView = React.createClass({
    getInitialState() {
        return {
            display: '0',
            overwrite: false,
            operation: '',
            lhs: 0,
            rhs: 0,
            result: 0,
            attack: 0,
            defend: 0,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100
        };
    },
    onLayout(e) {
        if (this.state.width != e.nativeEvent.layout.width/* ||
            this.state.height != e.nativeEvent.layout.height*/) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },
    onPress(key) {
        return () => {
            this.processKey(key);
        }
    },
    processKey(key) {
        if (Number.isInteger(key))
        {
            if (this.state.display == '0' || this.state.overwrite) {
                this.state.display = '';
                this.state.overwrite = false;
            }
            this.state.display += key.toString();
            this.state.result = +this.state.display;
        } else if (key == 'point') {
            this.state.display += '.';
            this.state.result = +this.state.display;
        } else if (key == 'bksp') {
            this.state.display = this.state.display.slice(0, -1);
            if (this.state.display.length == 0) {
                this.state.display = '0';
            }
            this.state.result = +this.state.display;
        } else if (key == 'clear') {
            this.state.display = '0';
            this.state.operation = '';
            this.state.lhs = 0;
            this.state.rhs = 0;
            this.state.result = 0;
            this.state.attack = 0;
            this.state.defend = 0;
        } else if (key == 'divide' || key == 'multiply' || key == 'add' || key == 'subtract') {
            //console.log('Calculator View', 'processKey', 'key', key, 'state', this.state);
            if (this.state.operation == '') {
                this.state.operation = key;
                this.state.lhs = +this.state.display;
                this.state.result = +this.state.display;
            } else {                
                this.state.rhs = +this.state.display;
                this.state.result = this.state.lhs = this.calculate(this.state.lhs, this.state.operation, this.state.rhs);
                this.state.display = this.state.result.toString();
                this.state.rhs = 0;    
                this.state.operation = key;
            }
            this.state.overwrite = true;            
        } else if (key == 'negate') {
            if (this.state.display[0] == '-') {
                this.state.display = this.state.display.slice(1);
            } else {
                this.state.display = '-' + this.state.display;
            }            
            this.state.result = +this.state.display;
        } else if (key == 'equals') {            
            this.state.rhs = +this.state.display;
            this.state.result = this.calculate(this.state.lhs, this.state.operation, this.state.rhs);
            this.state.display = this.state.result.toString();
            this.state.lhs = 0;
            this.state.rhs = 0;
            this.state.operation = '';        
            this.state.overwrite = true;
        } else if (key == 'att') {
            this.state.attack += round2Fixed(this.state.result, 1);
            this.state.display = '0';
            this.state.operation = '';
            this.state.lhs = 0;
            this.state.rhs = 0;
            this.state.result = 0;
            this.props.setAttack(this.state.attack);
            this.props.setValue(this.state.attack, 0);
        } else if (key == 'def') {
            this.state.defend += round2Fixed(this.state.result, 1);
            this.state.display = '0';
            this.state.operation = '';
            this.state.lhs = 0;
            this.state.rhs = 0;
            this.state.result = 0;
            this.props.setDefend(this.state.defend);
            this.props.setValue(this.state.defend, 1);
        }

        this.setState(this.state);
    },
    calculate(lhs, op, rhs) {
        lhs = +lhs;
        rhs = +rhs;
        let result = 0;
        if (op == 'add') {
            result = lhs + rhs;
        } else if (op == 'subtract') {
            result = lhs - rhs;
        } else if (op == 'multiply') {
            result = lhs * rhs;
        } else if (op == 'divide') {
            result = lhs / rhs;
        }
        return round2Fixed(result, 4);
    },
    render() {
        let width = this.state.width / 4.2;
        let height = this.state.height;
        return (
            <View style={{flex: 1, marginTop: Style.Scaling.scale(44)}}>
                <View style={{flex:1, flexDirection:'row'}} onLayout={this.onLayout}>
                    <View style={{flex:0.25,alignItems:'center',justifyContent:'center', backgroundColor:'red'}}>
                        <Text style={{fontSize:Style.Font.xtralarge(), fontWeight:'bold'}}>{operationSymbol(this.state.operation)}</Text>
                    </View>
                    <View style={{flex:2.75,alignItems:'flex-end',justifyContent:'center'}}>
                        <Text style={{fontSize:Style.Scaling.scale(50), fontWeight:'bold'}}>{this.state.display}</Text>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-bksp'} width={width} height={height} resizeMode='contain' onPress={this.onPress('bksp')}/>
                    </View>
                </View>
                <View style={{flex:1, flexDirection:'row', marginTop:2}}>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-att'} width={width} height={height} resizeMode='contain' onPress={this.onPress('att')}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-def'} width={width} height={height} resizeMode='contain' onPress={this.onPress('def')}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-clear'} width={width} height={height} resizeMode='contain' onPress={this.onPress('clear')}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-divide'} width={width} height={height} resizeMode='contain' onPress={this.onPress('divide')}/>
                    </View>
                </View>
                <View style={{flex:1, flexDirection:'row', marginTop:2}}>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-7'} width={width} height={height} resizeMode='contain' onPress={this.onPress(7)}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-8'} width={width} height={height} resizeMode='contain' onPress={this.onPress(8)}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-9'} width={width} height={height} resizeMode='contain' onPress={this.onPress(9)}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-multiply'} width={width} height={height} resizeMode='contain' onPress={this.onPress('multiply')}/>
                    </View>
                </View>
                <View style={{flex:1, flexDirection:'row', marginTop:2}} >
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-4'} width={width} height={height} resizeMode='contain' onPress={this.onPress(4)}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-5'} width={width} height={height} resizeMode='contain' onPress={this.onPress(5)}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-6'} width={width} height={height} resizeMode='contain' onPress={this.onPress(6)}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-subtract'} width={width} height={height} resizeMode='contain' onPress={this.onPress('subtract')}/>
                    </View>
                </View>
                <View style={{flex:1, flexDirection:'row', marginTop:2}} >
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-1'} width={width} height={height} resizeMode='contain' onPress={this.onPress(1)}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-2'} width={width} height={height} resizeMode='contain' onPress={this.onPress(2)}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-3'} width={width} height={height} resizeMode='contain' onPress={this.onPress(3)}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-add'} width={width} height={height} resizeMode='contain' onPress={this.onPress('add')}/>
                    </View>
                </View>
                <View style={{flex:1, flexDirection:'row', marginTop:2}} >
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-plus-minus'} width={width} height={height} resizeMode='contain' onPress={this.onPress('negate')}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-0'} width={width} height={height} resizeMode='contain' onPress={this.onPress(0)}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-point'} width={width} height={height} resizeMode='contain' onPress={this.onPress('point')}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-equals'} width={width} height={height} resizeMode='contain' onPress={this.onPress('equals')}/>
                    </View>
                </View>
            </View>
        );}
});


const mapStateToProps = (state) => ({
    attack: state.odds.attack,
    defend: state.odds.defend
});

const mapDispatchToProps =  ({setAttack,setDefend,setValue});

module.exports = connect(
  mapStateToProps, 
  mapDispatchToProps
)(CalculatorStandardView);

