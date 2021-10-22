import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import GetImage from '../services/getImage';

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
        let diecolor = this.props.dieColor || this.props.color.die;
        let dotcolor = this.props.dotColor || this.props.color.dot;
        let getImage = GetImage();
        let dieface = 'blank';
        switch(this.props.value) {
            case 1:
                dieface = 'blank';
                break;
            case 2:
                dieface = 'cas';
                break;
            case 3:
                dieface = 'armor';
                break;
            case 4:
                dieface = 'air';
                break;
            case 5:
                dieface = 'cas';
                break;
            case 6:
                dieface = 'strike';
                break;
        }

        return (
            <View style={{marginLeft: 1, marginRight: 1}} onLayout={this.onLayout}>
                <TouchableOpacity onPress={this.onPress} style={{
                    width: size,
                    height: size,
                    backgroundColor: diecolor,
                    borderRadius: 5,
                    borderColor: dotcolor == 'black' ? dotcolor : 'black',
                    borderWidth: 1,
                    //marginTop: 5,
                    //marginLeft: 5,
                    //marginRight: 5
                }}>
                <Image
                    style={{width: size, height: size, resizeMode: 'contain', alignSelf: 'center'}}
                        source={getImage('support-die-' + dieface)} />                
                </TouchableOpacity>
            </View>

        );
    }
});

module.exports = Die;
