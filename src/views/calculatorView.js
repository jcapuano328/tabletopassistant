import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import CalculatorStandardView from './calculatorStandardView';
import CalculatorProportionalView from './calculatorProportionalView';


var CalculatorView = React.createClass({
    render() {
        if (this.props.mode == 'prop') {
            return (
                <CalculatorProportionalView />
            );
        } else {
            return (
                <CalculatorStandardView />                
            );
        }
    }
});


const mapStateToProps = (state) => ({
    mode: state.calculator.mode
});


module.exports = connect(
  mapStateToProps
)(CalculatorView);

