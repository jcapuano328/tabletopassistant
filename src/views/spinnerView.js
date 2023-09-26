import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import {SpinNumeric} from '../widgets';
import IconButton from '../components/iconButton';
import {setValues} from '../actions/spin';
import Style from '../services/style';
import Images from '../res';
import { Actions } from 'react-native-router-flux';

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

        let controls = [];
        this.props.values.forEach((v,i) => {
            if (i == 1 && this.props.values.length == 2 && this.props.difference) {
                controls.push(this.renderDifference(i));
            }
            controls.push(this.renderSpinner(v, i));                
        });

        return (
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', 
                justifyContent: 'center', alignItems: 'center',
                backgroundColor: 'lightgray',
                marginLeft: 0, marginRight: 0}}>                
                {controls.map((c) => c)} 
            </View>
        );
    },
    renderSpinner(v,i) {
        return (            
            <View key={i} style={{flex: 1, marginLeft: 5, marginRight: 5, marginBottom: 5}}>
                <SpinNumeric value={v.toString()} min={-100} max={100} reset={true} onChanged={this.onChange(i)} />                    
            </View>                    
        );
    },
    renderDifference(i) {
        let diff = Math.max(this.props.values[0] - this.props.values[1], 0);
        return (
            <View key={i+100} style={{flex:0.75, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:Style.Font.large(), fontWeight:'bold', textAlign:'center'}}>{diff}</Text>
                {this.props.calculator 
                    ? <IconButton icons={Images} image={'calc'} scale={0.5} resizeMode='stretch' onPress={() => Actions.calcstd()}/> 
                    : null
                }
            </View>
        );
    }
});

const mapStateToProps = (state) => ({    
    values: state.spin.values,
    difference: state.spin.difference,
    calculator: state.spin.calculator
});

const mapDispatchToProps =  ({setValues});

module.exports = connect(
  mapStateToProps, 
  mapDispatchToProps
)(SpinnerView);
