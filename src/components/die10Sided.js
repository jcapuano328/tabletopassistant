import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import DieFaceNumber from './dieFaceNumber';
import range from '../services/range';

var Die = React.createClass({
    getInitialState() {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            viewHeight: 100
        };
    },
    onLayout(e) {
        if (this.state.width != e.nativeEvent.layout.width /*||
            this.state.height != e.nativeEvent.layout.height*/) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },    
    onPress() {
        this.props.onPress && this.props.onPress(this.props.die);
    },
    render() {
        let size = this.props.size || Math.min(this.state.height, this.state.width) || 32;
        let cell = size / 3;
        let diecolor = this.props.dieColor || this.props.diecolor || this.props.color.die;
        let dotcolor = this.props.dotColor || this.props.dotcolor || this.props.color.dot;
        return (
            <View style={{marginLeft: 1, marginRight: 1}} onLayout={this.onLayout}>
            <TouchableOpacity onPress={this.onPress} style={{
                width: size,
                height: size,
                backgroundColor: 'transparent',
                marginLeft: 5,
                marginRight: 5
            }}>
                <View style={{
                    borderTopWidth: 0,
                    borderTopColor: 'transparent',
                    borderLeftColor: 'transparent',
                    borderLeftWidth: size*.5,
                    borderRightColor: 'transparent',
                    borderRightWidth: size*.5,
                    borderBottomColor: diecolor,
                    borderBottomWidth: size*.75,
                }}/>
                <View style={{
                    width: size,
                    height: 0,
                    borderTopWidth: size*.25,
                    borderTopColor: diecolor,
                    borderLeftColor: 'transparent',
                    borderLeftWidth: size*.5,
                    borderRightColor: 'transparent',
                    borderRightWidth: size*.5,
                    borderBottomColor: 'transparent',
                    borderBottomWidth: 0,
                }}/>
                <View style={{
                    position: 'absolute',
                    width: size,
                    height: size,
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 2,
                    left: 0
                }}>
                    <DieFaceNumber value={this.props.value} size={size} color={dotcolor} />
                </View>
            </TouchableOpacity>
            </View>
        );
    }
});

module.exports = Die;
