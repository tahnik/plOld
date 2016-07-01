import React, { Component } from 'react';
import { AppRegistry, Navigator, View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Dimensions, ScrollView } from 'react-native';
import Authentication from '../authentication/authentication';
import Home from '../home/home';
import CreateLeak from '../home/leak';
import DrawerLayout from 'react-native-drawer-layout';
var width = Dimensions.get('window').width;

var HOME_ROUTES = {
    authentication: Authentication,
    home: Home,
    createLeak: CreateLeak
}

class Home_controller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoute: 'home',
            drawerOpen: false        }
    }
    render() {
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 20}}>
                <TouchableOpacity onPress={() => this.goToHome() } style={ styles.drawerButton }>
                    <Text style={{ fontSize: 15 }}>
                        Recent leaks
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.goToLeak() } style={ styles.drawerButton }>
                    <Text style={{ fontSize: 15 }}>
                        Create a leak
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.logOut() } style={ styles.drawerButton }>
                    <Text style={{ fontSize: 15 }}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        );
        return (
            <View style={{ flex: 1 }}>
                <DrawerLayout
                    ref="drawer"
                    drawerWidth={width * 0.7}
                    drawerPosition={DrawerLayout.positions.Left}
                    renderNavigationView={() => navigationView}>
                    <Navigator
                        initialRoute={{ name: this.state.currentRoute }}
                        renderScene={(route, navigator) => this.navigate(route,navigator)}
                        />
                </DrawerLayout>
            </View>
        )
    }
    goToLeak() {
        this.setState({
            currentRoute: 'createLeak'
        })
        this.closeMyDrawer();
    }
    goToHome() {
        this.setState({
            currentRoute: 'home'
        })
        this.closeMyDrawer()
    }
    logOut(){
        let tokenStorage = {
            token: '',
            username: ''
        };
        AsyncStorage.setItem('tokenStorage', JSON.stringify(tokenStorage));
        this.props.navigator.immediatelyResetRouteStack([
            {name: 'authentication'}
        ])
    }
    closeMyDrawer() {
        if( typeof this.refs.drawer !== 'undefined' ){
            this.refs.drawer.closeDrawer();
        }
        this.setState({
            drawerOpen: false
        })
    }
    navigate(route, navigator){
        var ComponentToNavigate = HOME_ROUTES[this.state.currentRoute];
        return <ComponentToNavigate title={route.name} navigator={navigator} Token={this.props.Token} Username={this.props.Username}/>
    }
}

var styles = StyleSheet.create({
    drawerButton: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        paddingLeft: 10,
        backgroundColor: '#E3E3E3',
        width: width * 0.7,
        marginTop: 10
    }
})

export default Home_controller;
