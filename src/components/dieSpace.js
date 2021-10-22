import React from 'react';
import { View, TouchableOpacity } from 'react-native';

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
        //size *= 0.98; // shrink a bit
        return (
            <View style={{marginLeft: 1, marginRight: 1}} onLayout={this.onLayout}>
                <TouchableOpacity onPress={this.onPress} style={{
                    width: size,
                    height: size,
                    backgroundColor: 'transparent',
                    borderRadius: 5,
                    borderColor: 'transparent',
                    borderWidth: 1,
                    //marginTop: 5,
                    //marginLeft: 5,
                    //marginRight: 5
                }}>
                </TouchableOpacity>
            </View>

        );
    }
});

module.exports = Die;
