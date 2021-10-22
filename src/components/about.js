import React from 'react';
import { View, Text, Image, TouchableNativeFeedback, Linking } from 'react-native';
import {Font} from '../services/style';

var OpenURLButton = React.createClass({
  propTypes: {
      label: React.PropTypes.string,
      url: React.PropTypes.string
  },
  handleClick: function() {
      Linking.canOpenURL(this.props.url)
      .then(supported => {
          if (supported) {
              Linking.openURL(this.props.url);
          }
      });
  },
  render: function() {
      return (
        <TouchableNativeFeedback onPress={this.handleClick}>
            <View style={{padding: 10,backgroundColor: '#3B5998',marginBottom: 10}}>
                <Text style={{fontSize: Font.medium(), color: 'white'}}>{this.props.label}</Text>
            </View>
        </TouchableNativeFeedback>
    );
  }
});

var About = React.createClass({
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
    render() {
        let height = (this.state.height*(this.props.scale||.8)) || 96;
        let width = (this.state.width*(this.props.scale||.8)) || 96;

        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                //height: 100,
                //width: 100,
                //backgroundColor: '#ffffff',
                //opacity: 0.25,
                borderRadius: 10,
                borderColor: 'black',
                borderWidth: 5,
                marginTop: this.props.marginTop || 80,
                margin: 25,
                padding: 5
            }}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <View style={{flex:1}} onLayout={this.onLayout}>
                        <Image style={{width: width,height: height,resizeMode: 'stretch'}} source={this.props.logo}/>
                    </View>
                    <View style={{flex:2}}>
                        <Text style={{fontSize: Font.large(),fontWeight: 'bold',marginLeft: 15}}>{this.props.title}</Text>
                        <Text style={{fontSize: Font.small(),marginLeft: 15}}>{'Version: ' + this.props.version}</Text>
                        <Text style={{fontSize: Font.small(),marginLeft: 15}}>{'Release: ' + this.props.releasedate}</Text>
                    </View>
                </View>
                <View style={{flex: .75}}>
                    <Text style={{fontSize: Font.medium()}}>{this.props.description}</Text>
                </View>
                {this.props.credit
                    ? <View style={{flex: 1}}>
                        <Text style={{fontSize: Font.medium()}}>{this.props.credit.description}</Text>
                        {this.props.credit.links.map((c,i) =>
                            //{/*<OpenURLButton key={i} label={c.label} url={c.url} />*/}
                            <Text key={i} style={{fontSize: Font.smallmedium()}}>{c.label}</Text>
                        )}
                    </View>
                    : null
                }
                {this.props.additionalinfo
                    ? <View style={{flex: 1}}>
                        <Text style={{fontSize: Font.medium()}}>{this.props.additionalinfo.description}</Text>
                        {this.props.additionalinfo.links.map((c,i) =>
                            //{/*<OpenURLButton key={i} label={c.label} url={c.url} />*/}
                            <Text key={i} style={{fontSize: Font.smallmedium()}}>{c.label}</Text>
                        )}
                    </View>
                    : null
                }
                <View style={{flex: 1}}>
                    <Text style={{fontSize: Font.smallmedium()}}>{'Built with React Native and these helpful modules:'}</Text>
                    {this.props.dependencies.map((d,i) =>
                        <Text key={i} style={{fontSize: Font.small()}}>{d.description}</Text>
                        //{/*<OpenURLButton label={d.description} url={d.url}/>*/}
                    )}
                </View>
            </View>
        );
    }
});

export default About;
