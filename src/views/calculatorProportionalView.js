import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import IconButton from '../widgets/calculatorIconButton';
import Images from '../res';
import Style from '../services/style';
import {round2Fixed} from '../services/calculator';
import {setAttack,setDefend} from '../actions/odds';

var CalculatorProportionalView = React.createClass({
    getInitialState() {
        return {
            display: '0',
            result: 0,
            attack: 0,
            defend: 0,
            size: 0,
            loss: 0,
            strength: 0,
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
            if (this.state.display == '0') {
                this.state.display = '';                
            }
            this.state.display += key.toString();            
        } else if (key == 'bksp') {
            this.state.display = this.state.display.slice(0, -1);
            if (this.state.display.length == 0) {
                this.state.display = '0';
            }            
        } else if (key == 'size') {
            this.state.size = +this.state.display;
            this.state.display = '0';
            this.state.result = this.calculate(this.state.size, this.state.loss, this.state.strength);
            //this.state.result = 0;            
        } else if (key == 'loss') {
            this.state.loss = +this.state.display;
            this.state.display = '0';
            this.state.result = this.calculate(this.state.size, this.state.loss, this.state.strength);
            //this.state.result = 0;            
        } else if (key == 'strength') {
            this.state.strength = +this.state.display;
            this.state.display = '0';
            this.state.result = this.calculate(this.state.size, this.state.loss, this.state.strength);
            //this.state.result = 0;            
        } else if (key == '1/3') {            
            this.state.display = '0';
            this.state.result = round2Fixed(this.state.result / 3.0, 1);
        } else if (key == '1/2') {
            this.state.result = round2Fixed(this.state.result / 2.0, 1);            
        } else if (key == '3/2') {
            this.state.result = round2Fixed(this.state.result * 3.0 / 2.0, 1);            
        } else if (key == '2') {
            this.state.result = round2Fixed(this.state.result * 2.0, 1);            
        } else if (key == 'clear') {
            this.state.display = '0';            
            this.state.size = 0;
            this.state.loss = 0;  
            this.state.strength = 0;   
            this.state.result = 0;       
            this.state.attack = 0;
            this.state.defend = 0;
        } else if (key == 'add') {            
            this.state.result += +this.state.display;
            this.state.display = '0';
        } else if (key == 'equals') {            
            this.state.result = this.calculate(this.state.size, this.state.loss, this.state.strength);
            this.state.display = '0';
        } else if (key == 'att') {
            this.state.attack += round2Fixed(this.state.result, 1);
            this.state.display = '0';
            this.state.result = 0;
            this.props.setAttack(this.state.attack);
        } else if (key == 'def') {
            this.state.defend += round2Fixed(this.state.result, 1);
            this.state.display = '0';
            this.state.result = 0;
            this.props.setDefend(this.state.defend);
        }

        this.setState(this.state);
    },
    calculate(size, loss, strength) {
        size = +size;
        loss = +loss;
        strength = +strength;
        if (size > 0 && loss < size && strength > 0) {
            let result = ((size - loss) / size) * strength;
            return round2Fixed(result, 1);    
        }
        return null;
    },
    render() {
        let width = this.state.width / 4.2;
        let height = this.state.height;
        return (
            <View style={{flex: 1, marginTop: Style.Scaling.scale(44)}}>
                <View style={{flex:1, flexDirection:'row'}} onLayout={this.onLayout}>
                    <View style={{flex:1.25, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor: '#A5FF7F'}}>
                    <Text style={{fontSize:Style.Scaling.scale(30), fontWeight:'bold', textAlign:'center'}}>{this.state.result > 0 ? this.state.result.toString() : ''}</Text>                    
                    </View>                    
                    <View style={{flex:2,alignItems:'flex-end',justifyContent:'center'}}>
                        <Text style={{fontSize:Style.Scaling.scale(50), fontWeight:'bold'}}>{this.state.display}</Text>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-bksp'} width={width} height={height} resizeMode='contain' onPress={this.onPress('bksp')}/>
                    </View>
                </View>
                <View style={{flex:1, flexDirection:'row', marginTop:2}}>
                    <View style={{flex:0.25}}></View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-add'} width={width} height={height} resizeMode='contain' onPress={this.onPress('add')}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-att'} width={width} height={height} resizeMode='contain' onPress={this.onPress('att')}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-def'} width={width} height={height} resizeMode='contain' onPress={this.onPress('def')}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-clear'} width={width} height={height} resizeMode='contain' onPress={this.onPress('clear')}/>
                    </View>
                </View>
                <View style={{flex:1, flexDirection:'row', marginTop:2}} >
                    <View style={{flex:0.25}}></View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-third'} width={width} height={height} resizeMode='contain' onPress={this.onPress('1/3')}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-half'} width={width} height={height} resizeMode='contain' onPress={this.onPress('1/2')}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-three-halves'} width={width} height={height} resizeMode='contain' onPress={this.onPress('3/2')}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-twice'} width={width} height={height} resizeMode='contain' onPress={this.onPress('2')}/>
                    </View>                    
                </View>
                <View style={{flex:1, flexDirection:'row', marginTop:2}}>
                    <View style={{flex:0.25, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor: '#FFE97F'}}>
                    <Text style={{fontSize:Style.Font.large(), fontWeight:'bold', textAlign:'center'}}>{this.state.size.toString()}</Text>                    
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-size'} width={width} height={height} resizeMode='contain' onPress={this.onPress('size')}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-7'} width={width} height={height} resizeMode='contain' onPress={this.onPress(7)}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-8'} width={width} height={height} resizeMode='contain' onPress={this.onPress(8)}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-9'} width={width} height={height} resizeMode='contain' onPress={this.onPress(9)}/>
                    </View>
                </View>                
                <View style={{flex:1, flexDirection:'row', marginTop:2}} >
                    <View style={{flex:0.25, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor: '#FFE97F'}}>
                    <Text style={{fontSize:Style.Font.large(), fontWeight:'bold', textAlign:'center'}}>{this.state.loss.toString()}</Text>                    
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-loss'} width={width} height={height} resizeMode='contain' onPress={this.onPress('loss')}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-4'} width={width} height={height} resizeMode='contain' onPress={this.onPress(4)}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-5'} width={width} height={height} resizeMode='contain' onPress={this.onPress(5)}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-6'} width={width} height={height} resizeMode='contain' onPress={this.onPress(6)}/>
                    </View>
                </View>
                <View style={{flex:1, flexDirection:'row', marginTop:2}} >
                    <View style={{flex:0.25, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor: '#FFE97F'}}>
                    <Text style={{fontSize:Style.Font.large(), fontWeight:'bold', textAlign:'center'}}>{this.state.strength.toString()}</Text>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-strength'} width={width} height={height} resizeMode='contain' onPress={this.onPress('strength')}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-1'} width={width} height={height} resizeMode='contain' onPress={this.onPress(1)}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-2'} width={width} height={height} resizeMode='contain' onPress={this.onPress(2)}/>
                    </View>
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-3'} width={width} height={height} resizeMode='contain' onPress={this.onPress(3)}/>
                    </View>
                </View>
                <View style={{flex:1, flexDirection:'row', marginTop:2}} >
                    <View style={{flex:1.25}}></View>
                    {/*    
                    <View style={{flex:1}}>                                    
                    <IconButton icons={Images} image={'calc-equals'} width={width} height={height} resizeMode='contain' onPress={this.onPress('equals')}/>                    
                    </View>
                    */}
                    <View style={{flex:1}}></View>                    
                    <View style={{flex:1}}>
                    <IconButton icons={Images} image={'calc-0'} width={width} height={height} resizeMode='contain' onPress={this.onPress(0)}/>
                    </View>
                    <View style={{flex:1}}></View>
                </View>                
            </View>
        );}
});


const mapStateToProps = (state) => ({
    attack: state.odds.attack,
    defend: state.odds.defend
});

const mapDispatchToProps =  ({setAttack,setDefend});

module.exports = connect(
  mapStateToProps, 
  mapDispatchToProps
)(CalculatorProportionalView);

