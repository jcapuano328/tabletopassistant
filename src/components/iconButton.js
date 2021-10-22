import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import GetImage from '../services/getImage';

var IconButton = React.createClass({
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
        if (this.state.width != e.nativeEvent.layout.width ||
            this.state.height != e.nativeEvent.layout.height) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },
    render() {
        let style = this.props.border ? {
            borderColor: 'gray', borderRightWidth: 1, borderStyle: 'solid'
        } : null;
        let getImage = GetImage(this.props.icons);
        let width = this.props.width || (this.state.width/**(this.props.scale||1)*/) || 32;
        let height = this.props.height || (this.state.height/**(this.props.scale||1)*/) || 32;
        return (
            <TouchableOpacity onPress={this.props.onPress} style={style} onLayout={this.onLayout}>
                <Image
                    style={{/*marginLeft: 5, marginRight: 5, */width: width, height: height, resizeMode: this.props.resizeMode || 'contain'}}
                    source={getImage(this.props.image)} />
            </TouchableOpacity>
        );
    }
});

module.exports = IconButton;