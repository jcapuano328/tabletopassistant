import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import {Font,Scaling} from '../services/style';
import Icons from '../res';

var Box = React.createClass({
    render() {
        return (
            <View style={{
                width: this.props.size,
                height: this.props.size,
                borderRadius: 3,
                borderColor: 'black',
                borderWidth: 2,
                marginTop: 1,
                marginBottom: 1,
                marginLeft: 2,
                marginRight: 2
            }}>
                {this.props.selected
                    ? <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',marginLeft:1, marginRight:1, marginTop:-1}}>
                        <Text style={{fontSize: this.props.fontSize || Font.medium(), fontWeight: 'bold', textAlign: 'center', color: this.props.color || 'black'}}>X</Text>
                    </View>
                    : null
                }
            </View>
        );
    }
});


var Checkbox = React.createClass({
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
            this.state.height != e.nativeEvent.layout.height
            //this.state.width == 0
        ) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },
    onSelected() {
        return () => {
            this.props.onSelected && this.props.onSelected(!this.props.selected);
        }
    },
    render() {
        let width = 20;//(this.state.width*0.75) || 20;
        let height = 20;//(this.state.height*0.75) || 20;
        let size = Math.min(width, height);
        return (
            <TouchableOpacity onPress={this.onSelected()}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 1}} onLayout={this.onLayout}>
                    {this.props.labelpos == 'left' ? this.renderLabel(this.props.label, {paddingRight:2}) : null}
                    <Image style={{width: size, height: size, resizeMode: 'contain'}} source={this.props.selected ? Icons.checked : Icons.unchecked} />
                    {/*
                    <Box selected={this.props.selected} size={size} fontSize={this.props.labelFontSize} color={this.props.color} />
                    */}
                    {this.props.labelpos != 'left' ? this.renderLabel(this.props.label, {paddingLeft:2}) : null}
                </View>
            </TouchableOpacity>
        );
    },
    renderLabel(label,style) {
        return (<Text style={[style,{fontSize: this.props.labelFontSize || Font.medium(), textAlign: 'left'}]}>{label}</Text>)
    }
});

module.exports = Checkbox;
