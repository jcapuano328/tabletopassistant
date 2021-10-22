import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
//import Spinner from 'rn-spinner';
import {SpinNumeric} from '../widgets';
import IconButton from '../components/iconButton';
import {setValues} from '../actions/spin';
import Style from '../services/style';
import Images from '../res';

var SpinnerView = React.createClass({
    getInitialState() {        
        return {      
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
    },    
    onLayout(e) {                
        if (this.state.width == 0) {
            this.setState({
                x: e.nativeEvent.layout.x,
                y: e.nativeEvent.layout.y,
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height
            });
        }
    },        
    onChange(i) {
        return (v) => {
            this.props.values[i] = +v;
            this.props.setValues(this.props.values);
        }            
    },
    onReset(i) {
        return () => {
            this.props.values[i] = 0;
            this.props.setValues(this.props.values);
        }            
    },
    render() {
        //let justify = this.props.values.length > 1 ? 'space-between' : 'center';        
        let bsize = (Math.min(this.state.height, this.state.width)||96) * .75;        
        return (
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', 
                justifyContent: 'center', alignItems: 'center',
                backgroundColor: 'lightgray',
                marginLeft: 0, marginRight: 0}}>                
                {this.props.values.map((v,i) => 
                    <View key={i} style={{flex: 1, marginLeft: 5, marginRight: 5, marginBottom: 5}}>
                        {/* 
                        <Spinner max={100} min={-100} 
                            width={Style.Scaling.scale(90)} 
                            height={Style.Scaling.scale(30)} 
                            fontSize={Style.Font.large()}
                            btnFontSize={Style.Font.large()} 
                            value={+v} 
                            onNumChange={this.onChange(i)} />
                        */}           
                        <SpinNumeric value={v.toString()} min={-100} max={100} reset={true} onChanged={this.onChange(i)} />                    
                    </View>                    
                )} 
            </View>
        );
    }
});

const mapStateToProps = (state) => ({    
    values: state.spin.values    
});

const mapDispatchToProps =  ({setValues});

module.exports = connect(
  mapStateToProps, 
  mapDispatchToProps
)(SpinnerView);
