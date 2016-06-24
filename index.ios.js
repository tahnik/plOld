import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';
import Authentication from './src/authentication/authentication'

var ROUTES = {
    authentication: Authentication
}

class main extends Component {
    render() {
        return (
            <Navigator
                initialRoute={{ name: 'authentication' }}
                renderScene={(route, navigator) => this.navigate(route,navigator)}
                />
        )
    }
    navigate(route, navigator){
        var ComponentToNavigate = ROUTES[route.name];
        return <ComponentToNavigate title={route.name} navigator={navigator} />
    }
}


AppRegistry.registerComponent('piracyleak', () => main);
