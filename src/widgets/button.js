import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Style from '../services/style';

var Button = React.createClass({
    render() {
        return (
            <TouchableOpacity style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: this.props.buttonBackgroundColor || 'silver',//'#3F51B5',
                borderRadius: 10,
                borderColor: 'black',
                borderWidth: 1,
            }} onPress={this.props.onPress}>
                <Text style={{color:this.props.labelTextColor || null, fontSize:this.props.labelFontSize || Style.Font.large(), fontWeight:this.props.labelFontWeight || 'bold', textAlign:'center'}}>{this.props.label}</Text>
            </TouchableOpacity>
        );
    }
});

module.exports = Button;
