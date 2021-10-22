import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Style from '../services/style';
import Images from '../res';

var RollButton = React.createClass({
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
        let dim = Math.max(Math.min(this.state.width,this.state.height), 32);
        let width = (dim*0.9) || 32;
        let height = (dim*0.9) || 32;
        
        //let width = (this.state.width*0.9) || 32;
        //let height = (this.state.height*0.9) || 32;

        let paddingLeft = this.props.direction == 'vertical' ? 45 : 15;
        let paddingRight = this.props.direction == 'vertical' ? 45 : 15;
        return (
            <TouchableOpacity onPress={this.props.onRoll} style={{
                justifyContent: 'center',
                backgroundColor: this.props.buttonBackgroundColor || 'silver',//'#3F51B5',
                borderRadius: 10,
                borderColor: 'black',
                borderWidth: 1,
                paddingTop: Style.Padding.pad(15),
                paddingLeft: Style.Padding.pad(paddingLeft),
                paddingRight: Style.Padding.pad(paddingRight),
                paddingBottom: Style.Padding.pad(15)
            }} onLayout={this.onLayout}>
                {/*<Text style={{fontSize: Style.Font.medium(),color: this.props.buttonColor || '#FFF', alignSelf: 'center', textAlign: 'center'}}>Roll</Text>*/}
                <Image
                    style={{width: width, height: height, resizeMode: 'contain', alignSelf: 'center'}}
                    source={Images.diceroll} />

            </TouchableOpacity>
        );
    }
});


module.exports = RollButton;
