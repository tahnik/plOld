import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Dimensions, ScrollView, Navigator, LayoutAnimation } from 'react-native';
import DrawerLayout from 'react-native-drawer-layout';

import TopNav from '../components/TopNav';

import CreateLeak from './CreateLeak';
import RecentLeaks from './RecentLeaks';

var width = Dimensions.get('window').width;


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoute: RecentLeaks,
            drawerOpen: false
        }
    }
    componentWillUpdate() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
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
        var HomeRouter = this.state.currentRoute;
        return (
            <View style={{ flex: 1 }}>
                <DrawerLayout
                    ref="drawer"
                    drawerWidth={width * 0.7}
                    drawerPosition={DrawerLayout.positions.Left}
                    renderNavigationView={() => navigationView}>
                    <View style={{ flex: 1 }}>
                        <TopNav onCreateTap={ () => this.onCreateTap() } onOpenDrawer={ () => this.onOpenDrawer() } />
                        <HomeRouter currentRoute={this.state.currentRoute} Token={this.props.Token} Username={this.props.Username} />
                    </View>
                </DrawerLayout>
            </View>
        )
    }
    goToLeak() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({
            currentRoute: CreateLeak
        })
        this.closeMyDrawer();
    }
    onCreateTap() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({
            currentRoute: CreateLeak
        })
    }
    onOpenDrawer(){
        this.refs.drawer.openDrawer();
    }
    goToHome() {
        this.setState({
            currentRoute: RecentLeaks
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

export default Home;
