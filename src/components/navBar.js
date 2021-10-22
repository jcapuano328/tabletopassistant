import React, {PropTypes} from 'react';
import { View, Text, Platform } from 'react-native';
import { H1, H2 } from 'native-base';
import IconButton from './iconButton';
import Style from '../services/style';

let height = {
    ...Platform.select({
      ios: {
        height: Style.Scaling.scale(64),
      },
      android: {
        height: Style.Scaling.scale(44),//scale(54),
      },
    })
};
let imageSize = 32;//height.height;

module.exports = (opts) => {

    let NavBar = React.createClass({
        contextTypes: {
            drawer: PropTypes.object,
        },
        styles: {
            header: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: '#EFEFF2',
                paddingTop: 0,
                top: 0,
                height: height.height,
                right: 0,
                left: 0,
                borderBottomWidth: 0.5,
                borderBottomColor: '#828287',
                position: 'absolute'
            },
            menuButton: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            },
            backButton: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            },
            title: {
                flex: 8,
                flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'flex-start'
            },
            rightButton: {
                flex: 2,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginVertical: 10
            }
        },
        render() {
            let state = this.props.navigationState;
            let selected = state.children[state.index];
            while (selected.hasOwnProperty('children')) {
              state = selected;
              selected = selected.children[selected.index];
            }
            const navProps = { ...this.props, ...selected };

            return (
                <View style={[
                    {...this.styles.header, ...opts.style},
                    this.props.navigationBarStyle,
                    state.navigationBarStyle,
                    selected.navigationBarStyle,
                ]}>
                    {this.renderMenuButton(navProps,state)}
                    {this.renderBackButton(navProps,this.props.navigationState)}
                    {this.renderTitle(navProps,state)}
                    {this.renderRightButton(navProps,state)}
                </View>
            )
        },
        renderMenuButton(props,state) {
            let drawer = this.context.drawer || {};
            return (
                <View style={this.styles.menuButton}>
                    <IconButton icons={props.icons || opts.icons} image={props.logo || props.menu || opts.menu || 'menu-light'} scale={0.5} resizeMode='stretch' onPress={drawer.toggle}/>
                </View>
            );
        },
        renderBackButton(props,state) {
            return ((state.index === 0 && (!state.parentIndex || state.parentIndex === 0)) || !opts.onBack)
                ? null
                : (
                    <View style={this.styles.backButton}>
                        <IconButton icons={props.icons || opts.icons} image={props.left || opts.left || 'chevron-left-light'} scale={0.5} resizeMode='stretch' onPress={opts.onBack} />
                    </View>
                );
        },
        renderTitle(props,state) {
            let getText = (text) => {
                if (typeof text == 'function') {
                    return text();
                }
                return text || '';
            }

            return (
                <View style={this.styles.title}>
                    <H1 style={{
                          color: opts.textcolor || 'black'
                      }}>
                      {getText(props.title)}
                    </H1>
                    {props.subtitle
                        ? <H2 style={{
                              color: opts.textcolor || 'black'
                          }}>
                            {getText(props.subtitle)}
                          </H2>
                        : null
                    }
                </View>
            );
        },
        renderRightButton(props,state) {
            return (
                <View style={this.styles.rightButton}>
                    {(opts.rightButtons || []).map((b,i) => {
                        return (
                            <IconButton key={i} icons={props.icons || opts.icons} image={b.image} height={b.height} width={b.width} onPress={() => b.onPress(this.props)} />
                        )
                    })}
                </View>
            );
        }
    });

    return NavBar;
};