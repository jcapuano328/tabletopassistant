import React from 'react';
import { View, Text, Picker } from 'react-native';
import {RadioButtonGroup,IconButton} from '../widgets';
import Die from '../components/die';
import Style from '../services/style';
import Dice from '../services/dice';

/*

|-------------------------------------------------------------------------------|
|                                                                               |
|  <sides o 6 o 8 o 10> <die color> <dot color> [die preview]  <remove button>  |
|                                                                               |
|-------------------------------------------------------------------------------|

*/

var ConfigurationDieView = React.createClass({
    onSidesChanged(v) {        
        this.props.onChanged && this.props.onChanged(this.props.die, {
            sides: v,
            diecolor: this.props.diecolor,
            dotcolor: this.props.dotcolor
        });        
    },    
    onDieColorChanged(v) {
        this.props.onChanged && this.props.onChanged(this.props.die, {
           sides: this.props.sides,
           diecolor: v,
           dotcolor: this.props.dotcolor
        });
    },
    onDotColorChanged(v) {
        this.props.onChanged && this.props.onChanged(this.props.die, {
           sides: this.props.sides,
           diecolor: this.props.diecolor,
           dotcolor: v
        });
    },
    onRemove() {        
        this.props.onRemove && this.props.onRemove(this.props.die);
    },    
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row',paddingTop:2,borderWidth:1,borderColor:'rgba(211,211,211,1)',backgroundColor: 'rgba(211,211,211,0.4)'}}>
                <View style={{flex:3,justifyContent:'center', alignItems:'flex-start'}}>
                    {/* sides 
                    <Text style={{fontSize: Style.Font.medium()}}>Sides</Text>
                    */}
                    <RadioButtonGroup buttons={[6,8,10].map((i) => ({label:i.toString(), value: i}))} 
                            state={this.props.sides}
                            onSelected={this.onSidesChanged} />                                
                </View>        
                <View style={{flex:2,justifyContent:'center'}}>
                    {/* die color 
                    <Text style={{fontSize: Style.Font.medium()}}>Die</Text>
                    */}
                    <Picker itemStyle={{fontSize:Style.Font.smallmedium()}}
                        selectedValue={this.props.diecolor}
                        onValueChange={this.onDieColorChanged}
                    >
                        {Dice.diecolors.map((c,i) => <Picker.Item key={i} style={{fontSize:Style.Font.smallmedium()}} label={c} value={c} />)}
                    </Picker>
                </View>        
                <View style={{flex:2,justifyContent:'center'}}>
                    {/* dot color 
                    <Text style={{fontSize: Style.Font.medium()}}>Dot</Text>
                    */}
                    <Picker itemStyle={{fontSize:Style.Font.smallmedium()}}
                        selectedValue={this.props.dotcolor}
                        onValueChange={this.onDotColorChanged}
                    >
                        {Dice.dotcolors.map((c,i) => <Picker.Item key={i} style={{fontSize:Style.Font.smallmedium()}} label={c} value={c} />)}
                    </Picker>
                </View>        
                <View style={{flex:1}}>
                    {/* die preview */}                    
                    <Die die={this.props.die} value={this.props.sides} sides={this.props.sides}
                        size={Style.Scaling.scale(24)} diecolor={this.props.diecolor} dotcolor={this.props.dotcolor}                         
                    />                                    
                </View>        
                <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                    <IconButton image={'remove'} width={24} height={24} resizeMode={'contain'} onPress={this.onRemove}/>
                </View>                
            </View>
        );
    }
});

module.exports = ConfigurationDieView;
