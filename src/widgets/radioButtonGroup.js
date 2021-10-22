import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import RadioButton from './radioButton';
import {Font} from '../services/style';

var RadioButtonGroup = React.createClass({
    onSelected(b) {
        return () => {
            this.props.onSelected && this.props.onSelected(b.value);
        }
    },
    render() {
        return (
            <View style={{flex: 1, alignSelf: 'stretch'}}>
                {this.renderLabel()}
                {this.renderContainer()}
            </View>
        );
    },
    renderContainer() {
        if (this.props.direction == 'vertical') {
            return (
                <ScrollView
                    contentContainerStyle={{justifyContent:'flex-start',alignItems:'flex-start'}}
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}>
                    {this.props.buttons.map((b,i) =>
                        <View key={i} style={{flex:1}}>
                            {this.renderButton(b,i)}
                        </View>
                    )}
                </ScrollView>
            );
        }

        return (
            <View style={{flex: 1, flexDirection: 'row', marginLeft: 10, justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'stretch'}}>
                {this.props.buttons.map((b,i) => this.renderButton(b,i))}
            </View>
        );
    },
    renderLabel() {
        if (this.props.title) {
            return (
                <Text style={{fontSize: this.props.labelFontSize || Font.medium(), backgroundColor: 'silver', textAlign: 'center'}}>{this.props.title}</Text>
            );
        }
        return null;
    },
    renderButton(b,i) {
        return (
            <RadioButton key={i} label={b.label} labelpos={b.labelpos} labelFontSize={b.fontSize}
                image={b.image} imagepos={b.imagepos} imageheight={b.imageheight} imagewidth={b.imagewidth}
                selected={b.value==this.props.state} disabled={b.disabled} onSelected={this.onSelected(b)} />
        );
    }
});

module.exports = RadioButtonGroup;
