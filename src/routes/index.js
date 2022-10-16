import React from 'react';
import { View } from 'react-native';
import { Actions, Scene } from 'react-native-router-flux';
import NavBar from '../components/navBar';
import {MainView,CalculatorView,CalculatorStandardView,CalculatorProportionalView,ConfigurationView,AboutView} from '../views';
import Icons from '../res';

const rightButtons = [
    //{image:'calc', onPress: () => Actions.calcstd()},
    {image:'config', onPress: () => Actions.config()},
    {image:'info', onPress: () => Actions.about() }    
];

const navBarOpts = {
    icons: Icons,
    style: {
        backgroundColor: '#267F00'
    },    
    textcolor: 'white',
    menu: 'logo',
    rightButtons: rightButtons
};

const navBarOptsBack = {
    ...navBarOpts,
    left: 'back',
    onBack: Actions.pop,
    rightButtons: []
};

const NavBarMain = NavBar(navBarOpts);
const NavBarBack = NavBar(navBarOptsBack);

export default Actions.create(
    <Scene key="root" navBar={NavBarMain}>
        <Scene key="home" type="reset" component={MainView} title="Table Top Assistant" initial={true} />
        <Scene key="calcstd" navBar={NavBarBack} component={CalculatorStandardView} title="Calculator" />
        <Scene key="calcprp" navBar={NavBarBack} component={CalculatorProportionalView} title="Calculator" />
        <Scene key="config" navBar={NavBarBack} component={ConfigurationView} title="Configuration" />
        <Scene key="about" navBar={NavBarBack} component={AboutView} title="About" />
    </Scene>
);
