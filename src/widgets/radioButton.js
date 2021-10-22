import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import {Font} from '../services/style';
import Icons from '../res';

var Button = React.createClass({
    render() {
        let buttonsize = this.props.size;
        return (
            <View style={{
                width: buttonsize,
                height: buttonsize,
                borderRadius: buttonsize * 0.5,
                borderColor: this.props.color || 'black',
                borderWidth: 2,
                marginTop: 1,
                marginBottom: 1,
                marginLeft: 2,
                marginRight: 2
            }} onLayout={this.onLayout}>
                {this.props.selected
                    ? <View style={{
                        width: buttonsize * 0.5,
                        height: buttonsize * 0.5,
                        borderRadius: buttonsize * 0.25,
                        backgroundColor: this.props.color || 'black',
                        marginTop: buttonsize / 6.66,
                        marginLeft: buttonsize / 6.66
                    }}/>
                    : null
                }
            </View>
        );
    }
});


var RadioButton = React.createClass({
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
        if (//this.state.width != e.nativeEvent.layout.width ||
            //this.state.height != e.nativeEvent.layout.height
            this.state.height == 0
        ) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },
    render() {
        let color = this.props.disabled ? 'lightgray' : this.props.color;
        let width = 20;//(this.state.width*0.9) || 20;
        let height = 20;//(this.state.height*0.9) || 20;
        let buttonsize = Math.min(width, height);

        return (
            <TouchableOpacity disabled={this.props.disabled} onPress={this.props.onSelected}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding:1}} onLayout={this.onLayout}>
                    {this.renderLabel('left')}
                    {this.renderImage('left')}
                    {/*
                    <Button size={buttonsize} selected={this.props.selected} color={this.props.color} />
                    */}
                    <Image style={{width: buttonsize, height: buttonsize, resizeMode: 'contain'}} source={this.props.selected ? Icons.on : Icons.off} />
                    {this.renderLabel('right')}
                    {this.renderImage('right')}
                </View>
            </TouchableOpacity>
        );
    },
    renderLabel(pos) {
        let labelpos = this.props.labelpos || 'right';
        if (this.props.label && labelpos == pos) {
            let color = this.props.disabled ? 'lightgray' : null;
            let style = labelpos == 'right' ? {paddingLeft:2} : {paddingRight:2};
            return (
                <Text style={[style,{fontSize: this.props.labelFontSize || Font.medium(), color: color, textAlign: 'left'}]} numberOfLines={1} adjustsFontSizeToFit={true}>{this.props.label}</Text>
            );
        }
        return null;
    },
    renderImage(pos) {
        let imagepos = this.props.imagepos || 'right';
        if (this.props.image && imagepos == pos) {
            return (
                <Image style={{
                        height: this.props.imageheight || 64,
                        width: this.props.imagewidth || 64,
                        resizeMode: 'stretch',
                        marginLeft: 10,
                        marginRight: 10
                    }}
                    source={this.props.image}
                />
            );
        }
        return null;
    }
});

module.exports = RadioButton;
