import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import About from '../components/about';
import {logo} from '../res';

const AboutView = (props) => {
    return (
        <About logo={logo}
            title={'About Table Top Assistant'}
            version={props.version}
            releasedate={moment(props.releasedate).format("MMMM Do YYYY, h:mm:ss a")}
            description={'A simple dice roller and odds calculator'}
            dependencies={[
                {description: 'react-redux', url: 'https://github.com/reactjs/react-redux'},
                {description: 'react-native-router-flux', url: 'https://github.com/aksonov/react-native-router-flux'},
                {description: 'react-native-sound', url: ''},
                {description: 'redux-persist', url: ''}
            ]}
        />
    );
}

const mapStateToProps = (state) => ({
    version: state.info.version,
    releasedate: state.info.releasedate
});

module.exports = connect(
  mapStateToProps
)(AboutView);
