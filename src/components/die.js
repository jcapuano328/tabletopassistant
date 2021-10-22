import React from 'react';
import { View } from 'react-native';
import Die6 from './die6Sided';
import Die10 from './die10Sided';
import Die6Support from './die6SidedSupport';
import DieSpace from './dieSpace';

var Die = React.createClass({    
    render() {
        if (this.props.dotcolor == 'support') {
            return (
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Die6Support die={this.props.die} value={this.props.value} 
                        size={this.props.size} dieColor={this.props.diecolor} dotColor={this.props.dotcolor} 
                        onPress={this.props.onDie} />
                </View>
            );    
        }
        else if (this.props.dotcolor == 'space') {
            return (
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <DieSpace die={this.props.die} value={this.props.value} 
                        size={this.props.size} dieColor={this.props.diecolor} dotColor={this.props.dotcolor} 
                        onPress={this.props.onDie} />
                </View>
            );    
        }

        switch(this.props.sides) {
        case 8:
        case 9:
        case 10:
            return (
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Die10 die={this.props.die} value={this.props.value} 
                        size={this.props.size} dieColor={this.props.diecolor} dotColor={this.props.dotcolor} 
                        onPress={this.props.onDie} />
                </View>
            );
        case 6:
            return (
                <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <Die6 die={this.props.die} value={this.props.value} 
                        size={this.props.size} dieColor={this.props.diecolor} dotColor={this.props.dotcolor} 
                        onPress={this.props.onDie} />
                </View>
            );
        default:
            return <View style={{flex:1}} />
        }        
    }
});

module.exports = Die;
