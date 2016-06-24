import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableHighlight, Navigator } from 'react-native';
import Signin from './signin';
import Signup from './signup';

var width = Dimensions.get('window').width;

var AUTH_ROUTES = {
    signin: Signin,
    signup: Signup
}

class Authentication extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image
                        style={styles.logoStyle}
                        source={require('../resources/logo.png')}
                    />
                </View>

                <Navigator
                    initialRoute={{ name: 'signin' }}
                    renderScene={(route, navigator) => this.navigate(route,navigator)}
                    style={{ flex: 7 }}
                    configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump }
                    />
            </View>
        )
    }
    navigate(route, navigator){
        var ComponentToNavigate = AUTH_ROUTES[route.name];
        return <ComponentToNavigate title={route.name} navigator={navigator}/>
    }
    goToRegister() {
        this.props.navigator.push( { name: 'signup' } )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D4145A'
    },
    logo: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle: {
        //responsive height width. First giving it a width. Then calculating the
        //height based on the ratio of the original resolution of the image
        height: (width * 0.5) * 0.54504504504,
        width: width * 0.5
    }
})

export default Authentication;
