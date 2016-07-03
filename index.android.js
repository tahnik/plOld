import React, { Component } from 'react';
import { AppRegistry, Navigator, AsyncStorage, View, Text, Alert, StatusBar } from 'react-native';
import Authentication from './src/authentication/authentication';
import Home from './src/home/Home';

var TOKEN = '';
var USERNAME = '';

var ROUTES = {
    authentication: Authentication,
    home: Home
}

class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialRoute: null
        }
        this.checkToken();
    }
    render() {
        if(this.state.initialRoute === null){
            return(
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>
                        loading...
                    </Text>
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    hidden={ true }
                    />
                <Navigator
                    initialRoute={{ name: this.state.initialRoute }}
                    renderScene={(route, navigator) => this.navigate(route,navigator)}
                    />
            </View>
        )
    }
    navigate(route, navigator){
        var ComponentToNavigate = ROUTES[route.name];
        if(route.name == 'authentication'){
            return <ComponentToNavigate title={route.name} navigator={navigator} setToken={ (token, username) => this.setToken(token, username) } />
        }
        if(route.name == 'home') {
            return <ComponentToNavigate title={route.name} navigator={navigator} Token={ TOKEN } Username={ USERNAME }/>
        }
        return <ComponentToNavigate title={route.name} navigator={navigator} />
    }
    checkToken() {
        AsyncStorage.getItem('tokenStorage', (err, result) => {
            if(result !== null){
                storageData = JSON.parse(result);
                var formBody = 'username=' + storageData.username + '&' + 'token=' + storageData.token;
                fetch('https://piracyleak.com/user', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formBody
                })
                .then((response) => response.json())
                .then((responseText) => {
                    if(typeof responseText.name !== 'undefined'){
                        TOKEN = storageData.token;
                        USERNAME = storageData.username;
                        this.setState({
                            initialRoute: 'home'
                        })
                    }else{
                        this.setState({
                            initialRoute: 'authentication'
                        })
                    }
                })
                .catch((error) => {
                    console.log(error);
                    Alert.alert(
                        'No internet connection',
                        '',
                        [
                            {text: 'Try Again', onPress: () => this.checkToken()},
                            {text: 'Quit', onPress: () => this.goToRegister() }
                        ]
                    )
                });
            }else{
                this.setState({
                    initialRoute: 'authentication'
                })
            }
        });
    }
    setToken(token, username) {
        if(token){
             TOKEN = token;
             USERNAME = username;
        }
    }
}


AppRegistry.registerComponent('piracyleak', () => main);
