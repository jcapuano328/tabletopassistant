import React from 'react';
import { Router } from 'react-native-router-flux';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './stores/store';

let Main = React.createClass({
    render () {
        return (
            <Provider store={store}>
                <Router style={{flex:1}} scenes={routes} />
            </Provider>
        );
    }
});

module.exports = Main;